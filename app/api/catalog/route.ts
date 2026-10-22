import {baseCatalog,db,json,error,aliasRows,type Row} from '../../../lib/cms/server';
import {mergeCatalog} from '../../../lib/cms/model.mjs';
import {enrichCatalog} from '../../../lib/cms/artists.mjs';
export const dynamic='force-dynamic';
export async function GET(){try{const [rows,aliases]=await Promise.all([db().prepare('SELECT id, published, visibility, deleted_at FROM cms_songs').all<Row>(),aliasRows()]);return json(enrichCatalog(mergeCatalog(baseCatalog,rows.results),aliases))}catch(e){return error(e)}}
