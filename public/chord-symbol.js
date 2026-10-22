/* Only musical chord symbols are transposed; stage directions stay as text. */
(() => {
 const pattern=/^[A-G](?:#|b)?(?:(?:maj|min|dim|aug|sus|add|omit|dom|m|M|ø|°)|\d+|[#b+-]|\([A-Ga-z0-9#b,+-]+\))*(?:\/[A-G](?:#|b)?)?$/;
 window.TayWineChords={isChordSymbol:value=>typeof value==='string'&&pattern.test(value.trim())};
})();
