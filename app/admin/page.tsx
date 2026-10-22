import {admin} from '../../lib/cms/server';
import {chatGPTSignInPath,chatGPTSignOutPath} from '../chatgpt-auth';
import Studio from './studio';
import LoginForm from './login-form';
export const dynamic='force-dynamic';
export default async function AdminPage(){try{const user=await admin();return <Studio name={user.displayName} signout={user.authMethod==='password'?'/api/admin/logout':chatGPTSignOutPath('/admin')}/> }catch(error:any){return <main className="auth-page"><a className="studio-brand" href="/">tay<span>wine</span><small>STUDIO</small></a><div className="auth-card"><span className="overline">YOUR SONGBOOK, BEHIND THE SCENES</span><h1>Admin ဝင်ရောက်ရန်</h1><p>သီချင်း၊ စာသား၊ chords နှင့် analytics များကို စီမံပါ။</p><LoginForm/><details className="alternative-login"><summary>အခြားဝင်ရောက်နည်း</summary><a className="secondary" href={chatGPTSignInPath('/admin')} target="_top">Sign in with ChatGPT ↗</a>{error.status===403&&<p>လက်ရှိ ChatGPT အကောင့်တွင် admin ခွင့်မရှိပါ။</p>}</details><a className="back-link" href="/">← Public songbook သို့ ပြန်သွားမယ်</a></div><p className="auth-note">TAYWINE · EDITORIAL STUDIO</p></main>}}
