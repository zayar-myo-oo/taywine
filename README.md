# MCM Chords

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
