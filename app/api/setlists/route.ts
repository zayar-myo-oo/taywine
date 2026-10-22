import {db,json,error} from '../../../lib/cms/server';
import {checkWrite,readBody,CmsError} from '../../../lib/cms/model.mjs';
import {setlist} from '../../../lib/cms/community.mjs';
import {publicSong,throttle} from '../../../lib/cms/public-server';
export async function POST(request:Request){try{checkWrite(request);const input=setlist(await readBody(request));for(const item of input.items)if(!await publicSong(item.id))throw new CmsError('A song in this setlist is no longer public.',404);await throttle(request,'setlist',30);const id=crypto.randomUUID();await db().prepare('INSERT INTO shared_setlists (id,payload,created_at) VALUES (?,?,?)').bind(id,JSON.stringify(input),new Date().toISOString()).run();return json({id,url:new URL('/?setlist='+id,request.url).href},201)}catch(e){return error(e)}}
