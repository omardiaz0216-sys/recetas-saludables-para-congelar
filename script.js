document.querySelectorAll('.accordion details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;

    document.querySelectorAll('.accordion details[open]').forEach((openItem) => {
      if (openItem !== item) openItem.open = false;
    });
  });
});

(() => {
  const storageKey = 'codigoFreezerAttribution';
  const allowedParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  const params = new URLSearchParams(window.location.search);
  const saved = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
  const next = { ...saved };

  allowedParams.forEach((key) => {
    const value = params.get(key);
    if (value) next[key] = value;
  });

  const fbp = readCookie('_fbp');
  const fbc = readCookie('_fbc');
  if (fbp) next._fbp = fbp;
  if (fbc) next._fbc = fbc;
  if (!next._fbc && next.fbclid) next._fbc = `fb.1.${Date.now()}.${next.fbclid}`;

  sessionStorage.setItem(storageKey, JSON.stringify(next));

  document.querySelectorAll('[data-checkout-link]').forEach((link) => {
    const url = new URL(link.href);
    Object.entries(next).forEach(([key, value]) => {
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    });
    link.href = url.toString();
  });

  function readCookie(name) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')
      .slice(1)
      .join('=');
  }
})();
