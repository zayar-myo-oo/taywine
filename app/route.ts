// The existing songbook stays a small independent HTML/JavaScript application.
import songbook from '../public/index.html?raw';
export function GET(){return new Response(songbook,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}})}
