import {redirect} from 'next/navigation';
import {admin} from '../../../lib/cms/server';
import Inbox from './inbox';
export const dynamic='force-dynamic';
export default async function Page(){try{await admin()}catch{redirect('/admin')}return <Inbox/>}
