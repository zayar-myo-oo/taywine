import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../app/chatgpt-auth';
import baseCatalog from '../../public/catalog.json';
import { CmsError, isAdmin, validId } from './model.mjs';
export { baseCatalog };
export type Row={id:string;draft:string;published:string|null;visibility:string;deleted_at:string|null;revision:number;updated_at:string;updated_by:string};
export const noStore={'Cache-Control':'private, no-store'};
export function json(data:unknown,status=200){return Response.json(data,{status,headers:noStore})}
export async function admin(){const user=await getChatGPTUser();if(!user)throw new CmsError('Please sign in with ChatGPT.',401);const local=import.meta.env.DEV&&user.userId==='local_seedy'&&user.email==='seedy@sites.test';if(!local&&!isAdmin(user,env.ADMIN_EMAILS))throw new CmsError('This account does not have admin access.',403);return user}
export function db(){if(!env.DB)throw new CmsError('CMS database is unavailable.',503);return env.DB}
export function knownId(id:string){return validId(id)&&baseCatalog.some(s=>s.id===id)}
export async function row(id:string){if(!validId(id))throw new CmsError('Invalid song ID.',400);return db().prepare('SELECT * FROM cms_songs WHERE id = ?').bind(id).first<Row>()}
export function error(error:unknown){if(error instanceof CmsError)return json({error:error.message},error.status);console.error('CMS request failed',error);return json({error:'Unable to complete this request. Please try again.'},500)}
