import {redirect} from 'next/navigation';
import {admin} from '../../../lib/cms/server';
import Artists from './artists';
export const dynamic='force-dynamic';
export default async function Page(){try{await admin()}catch{redirect('/admin')}return <Artists/>}
