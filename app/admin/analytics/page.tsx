import {redirect} from 'next/navigation';
import {admin} from '../../../lib/cms/server';
import {chatGPTSignOutPath} from '../../chatgpt-auth';
import Analytics from './report';
export const dynamic='force-dynamic';
export default async function AnalyticsPage(){let user;try{user=await admin()}catch{redirect('/admin')}return <Analytics name={user.displayName} signout={user.authMethod==='password'?'/api/admin/logout':chatGPTSignOutPath('/admin')}/>}
