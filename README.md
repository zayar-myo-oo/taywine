# တေးဝိုင်း — TayWine

A responsive Myanmar songbook containing 3,806 locally collected song entries. Each source arrangement remains a separate entry.

## Open locally

Run `node server.cjs` in this folder, then open http://127.0.0.1:4179.

## Features

- Myanmar and English title/artist search, chord/lyrics filters, sorting and artist browsing.
- ChordPro reader, root and slash-bass transposition, text size, lyrics-only view, adjustable auto-scroll, print and song links.
- Browser-local favorites and dark mode. Favorites remain on the browser/device where saved; there is no account or server synchronization.
- Small catalog loaded initially; full song text loaded on demand from `dist/songs/`.

## Refresh data

`node prepare-data.cjs` rebuilds the static catalog from the existing `chord-scraper/data` files. This does not scrape either website. Keep the source arrays in stable order to preserve song URLs and existing favorites.

The deployable site is the `dist` folder. No installation or build step is required. Typography uses Google Fonts with local system fallbacks. Source data can contain incomplete credits or malformed chords, which are preserved as supplied.

## Artwork and listening

18 source entries include original cover images and 17 have YouTube links. The listening room accepts validated YouTube video links, supports minimize/close, and offers a YouTube search when a match is unknown. Custom images and links are browser-local and do not change the shared catalog. Images are resized to 600 px before local storage. Closing the player unloads the video. Chord transposition does not change audio pitch.

## Reader controls

The video companion is 300 px wide on desktop and 216 px on phones, with link tools behind the edit button. The iframe remains at least 200 px high so its playback controls remain usable. Mobile navigation and action icons use inline SVG and need no icon font.

Auto-scroll has a numeric 0.1–10× speed input, matching slider, 0.1× adjustment buttons and a reset to 1×. The chosen speed persists in the same browser and adjusts immediately during playback. 1× scrolls at 35 px/s. Pause, manual wheel/touch scrolling, navigating away, or hiding the page stops scrolling.

## Discovery and artwork

The library uses original song covers when available and bundled generic music photos otherwise. The source metadata enrichment reads artwork, video links, cumulative views and original publication dates from the existing MusiBurma song pages. Popularity is explicitly based on MusiBurma cumulative views, not TayWine visits. Trending picks select songs published in the past 90 days and sort by those cumulative views; this is not a live viral or growth-rate chart.

The home page also includes source-date ordering, conservative beginner-friendly open-chord selections, and a browser-local reading history with resume positions. `node finalize-discovery.cjs` recomputes beginner flags after rebuilding the catalog. See ARTWORK.md for fallback photo sources.

## Practice mode

Focus mode hides navigation and decorative media while preserving the reader controls. The chords-used panel follows transposition and opens a small accessible guitar-voicing diagram. Common open shapes plus movable major, minor, seventh, suspended, diminished-seventh, add9, power and sixth voicings are supported; unsupported chords explicitly show no diagram. Automated checks validate all generated voicings against their defining pitch classes. Some standard seventh voicings omit the optional fifth.

## Myanmar / English localization

The header includes an EN / မြန်မာ switch. The preference is saved as `taywine-language` in the current browser; the default is Myanmar. Switching translates UI copy and accessible labels in place without reloading the song, clearing the query or restarting the video. New menus, dialogs, counts, statuses and toasts are translated as they appear. The document language and description follow the chosen interface language, while the lyric sheet retains its own content language.

`dist/localization.js` owns the translation pairs, dynamic count/status templates and the small UI-only translation observer. Song titles, credits, lyric sheets and chord symbols are explicitly excluded. Add new copy pairs there when introducing interface text. Language-specific spacing is in `dist/localization.css`.
