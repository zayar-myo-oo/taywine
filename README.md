# တေးဝိုင်း — TayWine

မြန်မာသီချင်း၊ စာသားနှင့် guitar chords များ ဖတ်ရှုလေ့ကျင့်ရန် songbook ဖြစ်သည်။ မူရင်းသီချင်း 3,806 ပုဒ်နှင့် admin CMS မှ ထည့်သွင်းသော သီချင်းများကို ပြသသည်။ မူရင်း arrangement တစ်ခုချင်းစီတွင် ကိုယ်ပိုင် song URL ရှိသည်။

## Technology

- **Public songbook:** HTML5, CSS, vanilla JavaScript in `public/`. No React is needed in the song reader.
- **CMS:** React, TypeScript and Vinext (Vite), served by a Cloudflare Worker.
- **Database:** Cloudflare D1 (SQLite), with Drizzle schema and versioned SQL migrations.
- **Admin identity:** username/password login with a server-stored PBKDF2 hash, signed HttpOnly sessions and server-side session revocation. Authorized Sign in with ChatGPT remains an alternative.
- **Hosting:** the existing Sites project in `.openai/hosting.json`. The site remains public; admin writes require authorization.
- Browser localStorage stores reader preferences, favorites and history. CMS records are shared database records and persist across devices.

## Development

Requires Node.js 22.13+ and npm.

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_square_prism.sql
npm run dev -- --hostname 127.0.0.1 --port 5173
```

Open `http://127.0.0.1:5173/` for the songbook and `/admin` for the CMS. Apply each local migration only once, in order, including the later login/analytics migration `drizzle/0001_faithful_jack_murdock.sql`. The development and hosted databases are separate.

On loopback development only, Sign in with ChatGPT uses the starter's `local_seedy` test identity. This account is allowed only in development builds; production requires a real authenticated user listed in `ADMIN_EMAILS`. Local test identity simulation is excluded from production.

`node server.cjs` remains an optional read-only static songbook preview at `http://127.0.0.1:4179/`. It serves the bundled original songs and does not provide the CMS or D1 changes.

## Admin CMS / အသုံးပြုနည်း

1. Website ရဲ့ **Studio** link သို့မဟုတ် `/admin` ကို ဖွင့်ပါ။
2. သတ်မှတ်ထားသော username/password ဖြင့် Admin ဝင်ပါ။ ခွင့်ရှိသော ChatGPT အကောင့်ဖြင့် ဝင်ခြင်းကိုလည်း အခြားဝင်ရောက်နည်းမှ အသုံးပြုနိုင်သည်။
3. သီချင်း/အဆိုတော် နာမည်ဖြင့် ရှာဖွေ၍ ရှိပြီးသား သီချင်းကို ရွေးပါ။ သို့မဟုတ် **သီချင်းအသစ်** ကို နှိပ်ပါ။
4. သီချင်းနာမည်၊ အဆိုတော်၊ key၊ album နှင့် လိုအပ်သော source/media links ဖြည့်ပါ။
5. ChordPro editor တွင် `[C]စာသား [G]စာသား` ပုံစံဖြင့် chord ထည့်ပြီး `{Verse 1}` ကဲ့သို့ အပိုဒ်ခေါင်းစဉ် ရေးပါ။ Live Preview ဖြင့် စစ်ပါ။ ဖုန်းတွင် Editor / Preview ကို ပြောင်းကြည့်နိုင်သည်။
6. **Draft သိမ်းမယ်** သည် လက်ရှိ public arrangement ကို မပြောင်းပါ။ **Publish** နှိပ်မှ reader နှင့် public catalog တွင် ပြင်ဆင်ချက်များ ပေါ်မည်။ Public page ဖွင့်ထားပြီးသားဆိုလျှင် refresh လုပ်ပါ။
7. **Unpublish** ဖြင့် public catalog နှင့် reader မှ ဖျောက်နိုင်သည်။ **Trash သို့ ရွှေ့မယ်** ဖြင့် ဖယ်ပြီး Trash filter မှ **ပြန်ယူမယ်** နှိပ်၍ ပြန်ယူနိုင်သည်။ Permanent delete မပါပါ။ Restore သည် trash သို့မရွှေ့မီ visibility ကို ပြန်သုံးသည်။

Drafts and published snapshots are stored separately. Existing bundled songs remain the public version until explicitly published, unpublished or trashed through the CMS. New songs receive stable `cms-<uuid>` IDs. Original IDs and existing favorites remain unchanged.

The editor warns about unsaved changes and supports Cmd/Ctrl+S. Revision checks reject conflicting saves from another tab/device. Changes are never silently overwritten. After a conflict, retain any needed text and reopen the song before saving again.

Artist names are edited with each song; public artist browsing reflects published song metadata. This release does not introduce separate artist biography records, file uploads or an admin-role management screen. Cover and YouTube fields accept HTTPS links.

## Admin access configuration

Configure the password-login runtime values through Sites environment settings:

- `ADMIN_LOGIN_USERNAME`: the configured username.
- `ADMIN_LOGIN_PASSWORD_HASH`: secret `pbkdf2-sha256$100000$<16-byte hex salt>$<32-byte hex digest>`. Never store the plaintext password.
- `ADMIN_SESSION_SECRET`: a separate strong random secret used to sign sessions and HMAC login-throttling keys.
- `ADMIN_EMAILS`: the existing secret allowlist for optional Sign in with ChatGPT.

Sessions expire after eight hours. Production cookies use the `__Host-` prefix, `Secure`, `HttpOnly` and `SameSite=Strict`. Logout revokes the database session immediately; clearing a browser cookie is not the only protection. Ten login attempts are allowed per 15-minute client window. Login throttling stores only a keyed HMAC of the client address/window, not a raw IP. A correct password never grants public visitors access to any other user's account; this is the configured shared admin identity.

Configure `ADMIN_EMAILS` as a secret runtime variable through Sites environment settings for the alternative sign-in method. Its value is a comma-separated list of authorized ChatGPT sign-in email addresses. The initial deployment is configured for the current Site owner. Do not put actual allowlist values, auth tokens or passwords into Git, public JavaScript or the hosting manifest.

Deploy a saved version after changing runtime environment settings. Authentication is checked server-side for every admin read/write. Writes additionally require same-origin JSON, validate allowed fields and payload size, and use parameterized SQL. Missing or expired admin sessions are rejected with 401; authenticated non-admin ChatGPT users receive 403. ChatGPT sign-in/out stays owned by Sites; the username/password routes are application-owned.

## Reader and chord reference

- Myanmar / English title and artist search, chord/lyrics filters, sorting, artist browsing, discovery and browser-local favorites/history.
- ChordPro reader with root/slash-bass transposition, text size, lyrics-only mode, focus mode, print, sharing and adjustable auto-scroll.
- Chords appear in compact labels directly above their lyrics, without underlines. Hover on desktop or tap/click a chord to show its compact guitar reference card. Keyboard users can Tab to a chord and press Enter/Space.
- The card shows finger numbers, open/muted strings, fret position, variation count, previous/next arrows and **Play**. Close with ×, Escape or an outside click.
- Play synthesizes a short strum of the selected shape using Web Audio; it is a pitch reference rather than a recorded guitar. Audio does not change the song/video pitch.
- Standard tuning: E A D G B e. × = muted string, ○ = open string, 1–4 = index through little finger. Repeated finger numbers indicate a possible barre. Common open chords use curated fingerings; movable shapes use barre suggestions.
- Major, minor, seventh, 7sus4, maj7, suspended, dim7, add9, power and sixth shapes are available up to fret 15. Only selected slash chords are supported. Unsupported symbols show an explicit fallback. Counts describe available reference shapes, not all theoretically possible voicings.

Auto-scroll supports 0.1–10× speed; 1× is 35 px/s. Manual mouse/touch/keyboard scrolling, reader controls, speed adjustments and temporary page visibility changes preserve the playing state. It remains enabled at the bottom, so manually scrolling upward resumes movement. Explicit Pause or navigating away/changing songs stops it. Background animation is browser-throttled and resumes without a large jump. The reader no longer displays the original-key/source disclaimer below the sheet; original metadata remains in the data/CMS. Favorites and reader preferences remain local to the current browser; CMS changes are shared.

## Website Analytics and Content Analysis

Open **Analytics** in the CMS, or visit `/admin/analytics`. Both the report page and its API require an authorized admin session. The public songbook remains available without signing in.

- **Website Analytics:** page views, daily unique browser visits, song opens, today's browsers, daily traffic chart, most-opened songs and device breakdown. Select 7, 30 or 90 days. Dates use Asia/Bangkok. Device categories use viewport width, not hardware identification.
- **Content Analysis:** current published songs, distinct artist-credit fields, songs with chords/lyrics only, beginner-friendly songs, missing keys, draft/unpublished/trash counts, top keys, most-used chord symbols, top artists and content sources. This is the current catalog snapshot; the website date filter does not turn it into historical catalog data.
- Chord rankings count a chord at most once per arrangement. Published database edits override the original chord index. Draft changes do not affect published analysis.

Usage tracking starts when the tracker is deployed. There is no imported or invented historical TayWine traffic. Original MusiBurma view counts remain separate source metadata.

The first-party tracker sends only a random event ID, a daily random browser ID, event type, optional song ID and coarse device category. It does not send/store names, email addresses, raw IPs, referrers, full URLs or search terms. The browser ID rotates by Bangkok calendar day; daily unique counts summed across multiple days represent browser-days, not deduplicated people. Multiple devices/browsers can count separately. Do Not Track and Global Privacy Control disable client tracking and are also respected server-side.

Events are deduplicated by event ID, validated against known public songs, restricted to same-origin JSON and capped at 300 events per browser/day. Recognized bots are ignored. These are approximate product-usage counts, not fraud-resistant billing metrics. Reports cover at most 90 days. Older event rows are cleaned in bounded batches on subsequent event requests; cleanup is opportunistic rather than a scheduled deletion guarantee for an inactive site.

For local password integration checks only, `.dev.vars` may contain separate test credentials matching `verify-analytics.mjs` (`admin` / `local-admin-test-only`) and a test-only signing key. Never use production credentials in test fixtures. These checks verify real session issuance/revocation, event deduplication, day totals, public-song validation, CSRF/DNT rejection and login throttling. The lockout test leaves the local test throttle active; clear the local test table or wait for its 15-minute window before another password-login test.

## Source and data

- `public/`: public reader, original catalog, 3,806 original song JSON files and artwork.
- `app/admin/`: authenticated CMS interface.
- `app/api/admin/`: protected CMS API.
- `app/api/catalog/` and `app/api/songs/`: merge original content with published database changes.
- `lib/cms/`: authorization, validation, session security and analytics calculations.
- `data/song-chords.json`: derived per-song chord index for published content analysis; `npm run build` refreshes it from the original song files.
- `db/schema.ts` and `drizzle/`: database schema and migrations.
- `worker/` and `scripts/`: supported Sites Worker/runtime integration.
- `dist/`: generated deployment output; do not edit it.

`prepare-data.cjs` rebuilds the original static catalog from an external `chord-scraper/data` directory. Those source files are not bundled. Pass the directory as the first argument, or set `TAYWINE_SOURCE_DATA`. Preserve the original source order to retain song IDs. Data enrichment scripts are maintenance utilities, not live CMS commands. CMS content lives in D1 and is not rewritten by rebuilding bundled originals.

Original source arrangements can contain missing credits or malformed chord text. Source text is preserved in the original files. MusiBurma cumulative views are source popularity, not TayWine traffic; trending uses publication dates from the past 90 days. See [ARTWORK.md](ARTWORK.md) for fallback photo attribution. Custom reader artwork/media overrides remain browser-local.

## Verification

```sh
node verify.cjs
node verify-practice.cjs
node verify-localization.cjs
node verify-discovery.cjs
node verify-media.cjs
node verify-cms.mjs
node verify-analytics.mjs
npx tsc --noEmit
npm run build
```

For local database lifecycle checks, run the preview and then:

```sh
CMS_TEST_ORIGIN=http://127.0.0.1:5173 node verify-cms.mjs
CMS_TEST_ORIGIN=http://127.0.0.1:5173 node verify-analytics.mjs
```

The integration check refuses non-loopback URLs. It creates disposable local test content and leaves it in local Trash. It verifies unauthorized/spoofed-header rejection, create, publish, isolated draft changes, revision conflicts, cross-origin rejection, unpublish, trash, restore and original-song loading.

## Deployment

Push source to GitHub, then use the Sites workflow with the **existing project ID** in `.openai/hosting.json`. Build the Worker and save/deploy its archive. A GitHub push by itself does not publish this Sites website. Hosted D1 migrations apply during deployment; keep applied migrations immutable and append new migrations for future changes.

The legacy `site.tar.gz` is historical, not the current deployable artifact. The project is now server-backed; uploading only the original static files does not provide CMS functionality. CMS content updates use the database and **Publish** button and need no code deployment.
