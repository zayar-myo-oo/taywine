/// <reference types="vite/client" />
declare module 'qrcode' { const QRCode:{toString(value:string,options:Record<string,unknown>):Promise<string>}; export default QRCode; }
