import {baseCatalog,db,json,error,type Row} from '../../../lib/cms/server';
import {mergeCatalog} from '../../../lib/cms/model.mjs';
export const dynamic='force-dynamic';
export async function GET(){try{const rows=await db().prepare('SELECT id, published, visibility, deleted_at FROM cms_songs').all<Row>();return json(mergeCatalog(baseCatalog,rows.results))}catch(e){return error(e)}}
