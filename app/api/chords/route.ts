import original from '../../../data/song-chords.json';
import {publicCatalog} from '../../../lib/cms/public-server';
import {chordNames} from '../../../lib/cms/model.mjs';
import {json,error} from '../../../lib/cms/server';
export async function GET(){try{const {catalog,rows}=await publicCatalog();const overrides=new Map(rows.map(r=>[r.id,r]));return json(Object.fromEntries(catalog.map((song:any)=>{const row=overrides.get(song.id);return [song.id,row?.visibility==='published'&&row.published?chordNames(JSON.parse(row.published).chordpro):(original as any)[song.id]||[]]})))}catch(e){return error(e)}}
