import { headers } from 'next/headers';
import {cookieName,readCookie,verifySession} from './auth.mjs';
import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../app/chatgpt-auth';
import baseCatalog from '../../public/catalog.json';
import { CmsError, isAdmin, validId } from './model.mjs';
export { baseCatalog };
export type Row={id:string;draft:string;published:string|null;visibility:string;deleted_at:string|null;revision:number;updated_at:string;updated_by:string};
export const noStore={'Cache-Control':'private, no-store'};
export function json(data:unknown,status=200){return Response.json(data,{status,headers:noStore})}
export async function passwordSession(){const requestHeaders=await headers();const token=readCookie(requestHeaders.get('cookie'),cookieName(import.meta.env.DEV));const payload=await verifySession(token,env.ADMIN_SESSION_SECRET,env.ADMIN_LOGIN_USERNAME);if(!payload)return null;const session=await db().prepare('SELECT id FROM cms_admin_sessions WHERE id=? AND expires_at>?').bind(payload.sid,Math.floor(Date.now()/1000)).first();return session?payload:null}
export async function admin(){const session=await passwordSession();if(session)return {userId:'password-admin',email:'',displayName:session.username,authMethod:'password'};const user=await getChatGPTUser();if(!user)throw new CmsError('Please sign in to the admin CMS.',401);const local=import.meta.env.DEV&&user.userId==='local_seedy'&&user.email==='seedy@sites.test';if(!local&&!isAdmin(user,env.ADMIN_EMAILS))throw new CmsError('This account does not have admin access.',403);return {...user,authMethod:'chatgpt'}}

export function db(){if(!env.DB)throw new CmsError('CMS database is unavailable.',503);return env.DB}
export function knownId(id:string){return validId(id)&&baseCatalog.some(s=>s.id===id)}
export async function row(id:string){if(!validId(id))throw new CmsError('Invalid song ID.',400);return db().prepare('SELECT * FROM cms_songs WHERE id = ?').bind(id).first<Row>()}
export function error(error:unknown){if(error instanceof CmsError)return json({error:error.message},error.status);console.error('CMS request failed',error);return json({error:'Unable to complete this request. Please try again.'},500)}
