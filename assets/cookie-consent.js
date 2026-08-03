/* FIFO Route — Cookie Consent (Google Consent Mode v2)
   Fails: assets/cookie-consent.js
   Pieslēgšana: skat. instrukciju — <script> rinda katras lapas <head> PIRMS GA4 skripta. */
(function () {
  var KEY = 'fr_cookie_consent'; // 'granted' | 'denied'

  /* 1. Consent Mode v2 — noklusējums: viss liegts (jādarbojas PIRMS gtag config) */
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  if (saved === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    return; // baneris nav jārāda
  }
  if (saved === 'denied') return; // izvēle jau izdarīta

  /* 2. Banera izveide pēc DOM ielādes */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var css = ''
      + '.fr-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;'
      + 'max-width:520px;margin:0 auto;background:linear-gradient(160deg,#16283c,#101e2e);'
      + 'border:1px solid rgba(255,255,255,0.14);border-radius:16px;padding:20px 22px;'
      + 'box-shadow:0 12px 40px rgba(0,0,0,0.45);color:#eef3f8;'
      + "font-family:'Manrope',sans-serif;font-size:14px;line-height:1.55;}"
      + '.fr-cc p{margin:0 0 14px;color:#9fb0c2;}'
      + '.fr-cc a{color:#ff7a2e;text-decoration:underline;}'
      + '.fr-cc-btns{display:flex;gap:10px;flex-wrap:wrap;}'
      + '.fr-cc-btn{flex:1;min-width:140px;cursor:pointer;border-radius:10px;padding:11px 16px;'
      + "font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:0.05em;"
      + 'font-size:13px;font-weight:600;border:none;transition:opacity .15s;}'
      + '.fr-cc-btn:hover{opacity:.88;}'
      + '.fr-cc-accept{background:linear-gradient(135deg,#ff7a2e,#e2611a);color:#10131a;}'
      + '.fr-cc-decline{background:transparent;color:#eef3f8;border:1px solid rgba(255,255,255,0.14);}'
      + '@media(max-width:480px){.fr-cc{left:10px;right:10px;bottom:10px;padding:16px;}}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var box = document.createElement('div');
    box.className = 'fr-cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Согласие на использование cookie');
    box.innerHTML =
      '<p>Мы используем cookie для анализа посещаемости сайта (Google Analytics). ' +
      'Это помогает нам делать сайт полезнее. Подробнее — в ' +
      '<a href="/privacy-policy.html" target="_blank" rel="noopener">Политике конфиденциальности</a>.</p>' +
      '<div class="fr-cc-btns">' +
      '<button type="button" class="fr-cc-btn fr-cc-accept">Принять</button>' +
      '<button type="button" class="fr-cc-btn fr-cc-decline">Только необходимые</button>' +
      '</div>';

    box.querySelector('.fr-cc-accept').addEventListener('click', function () {
      try { localStorage.setItem(KEY, 'granted'); } catch (e) {}
      gtag('consent', 'update', { analytics_storage: 'granted' });
      box.remove();
    });
    box.querySelector('.fr-cc-decline').addEventListener('click', function () {
      try { localStorage.setItem(KEY, 'denied'); } catch (e) {}
      box.remove();
    });

    document.body.appendChild(box);
  });
})();
