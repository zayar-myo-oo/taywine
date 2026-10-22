// Credentials and signing keys are runtime secrets. No password or signing key is bundled.
const encoder=new TextEncoder();
const hex=bytes=>Array.from(new Uint8Array(bytes),v=>v.toString(16).padStart(2,'0')).join('');
const unhex=value=>Uint8Array.from(value.match(/.{2}/g)||[],v=>parseInt(v,16));
const encode=value=>btoa(String.fromCharCode(...encoder.encode(JSON.stringify(value)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const decode=value=>JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(value.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0))));
export const SESSION_SECONDS=8*60*60;
export const cookieName=dev=>dev?'taywine-admin-dev':'__Host-taywine-admin';
export function readCookie(header,name){return (header||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='))?.slice(name.length+1)||''}
export async function verifyPassword(password,stored){if(typeof password!=='string'||password.length>256||typeof stored!=='string')return false;const [algorithm,rounds,salt,expected]=stored.split('$');if(algorithm!=='pbkdf2-sha256'||rounds!=='100000'||!/^[a-f0-9]{32}$/.test(salt||'')||!/^[a-f0-9]{64}$/.test(expected||''))return false;const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);const derived=hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:unhex(salt),iterations:100000,hash:'SHA-256'},key,256));let mismatch=0;for(let i=0;i<64;i++)mismatch|=derived.charCodeAt(i)^expected.charCodeAt(i);return mismatch===0}
async function hmacKey(secret){return crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify'])}
export async function digest(secret,value){return hex(await crypto.subtle.sign('HMAC',await hmacKey(secret),encoder.encode(value)))}
export async function signSession(payload,secret){const body=encode(payload);return body+'.'+await digest(secret,body)}
export async function verifySession(token,secret,username,now=Date.now()){try{if(!secret||typeof token!=='string'||token.length>1000)return null;const [body,signature,...rest]=token.split('.');if(rest.length||!/^[a-f0-9]{64}$/.test(signature||''))return null;const valid=await crypto.subtle.verify('HMAC',await hmacKey(secret),unhex(signature),encoder.encode(body));if(!valid)return null;const payload=decode(body);if(payload.username!==username||!Number.isInteger(payload.exp)||payload.exp<=Math.floor(now/1000)||payload.exp>Math.floor(now/1000)+SESSION_SECONDS+60||!/^[a-f0-9-]{36}$/.test(payload.sid||''))return null;return payload}catch{return null}}
export function sessionCookie(token,dev=false,clear=false){return `${cookieName(dev)}=${clear?'':token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${clear?0:SESSION_SECONDS}${dev?'':'; Secure'}`}
