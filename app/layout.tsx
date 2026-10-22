import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'TayWine Studio — Admin',description:'Manage TayWine songs and chord arrangements.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="my"><body>{children}</body></html>}
