import {db,json,error,passwordSession,noStore} from '../../../../lib/cms/server';
import {checkWrite} from '../../../../lib/cms/model.mjs';
import {sessionCookie} from '../../../../lib/cms/auth.mjs';
export const dynamic='force-dynamic';
export async function POST(request:Request){try{checkWrite(request);const session=await passwordSession();if(session)await db().prepare('DELETE FROM cms_admin_sessions WHERE id=?').bind(session.sid).run();return Response.json({ok:true},{headers:{...noStore,'Set-Cookie':sessionCookie('',import.meta.env.DEV,true)}})}catch(e){return error(e)}}
