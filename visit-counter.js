/* Visit counter: one visit per device per day (India time), stored in Supabase.
 * - The device is a random ID kept in this browser's localStorage (no cookies, no fingerprinting).
 * - Clearing site data or a private window = a new device. A new day = a new visit.
 * - Skips local testing and bots. If anything fails, the counter simply stays hidden.
 * The key below is Supabase's *publishable* key, meant to be public. Never put a secret key here.
 */
(() => {
  'use strict';

  const API = 'https://wxlpbefrbxxbosjfeudk.supabase.co/rest/v1/rpc/';
  const KEY = 'sb_publishable_N9SO6zdvGjgfggBDqfzjtA_es8fc9eU';
  const ID_KEY = 'pm_visitor';
  const DAY_KEY = 'pm_visit_day';

  const outputs = document.querySelectorAll('[data-visit-count]');

  let storage = null;
  try {
    localStorage.setItem('pm_test', '1');
    localStorage.removeItem('pm_test');
    storage = localStorage;
  } catch { /* Storage blocked: show the count, but don't record (we couldn't tell repeat visits apart). */ }

  const isLocal = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname);
  const isBot = navigator.webdriver || /bot|crawl|spider|slurp|preview|lighthouse|headless/i.test(navigator.userAgent);
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date()); // YYYY-MM-DD

  const newId = () => {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  };

  let deviceId = storage?.getItem(ID_KEY);
  if (storage && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(deviceId || '')) {
    deviceId = newId();
    storage.setItem(ID_KEY, deviceId);
  }

  const shouldRecord = Boolean(storage) && !isLocal && !isBot && storage.getItem(DAY_KEY) !== today;

  const call = (fn, body) => fetch(API + fn, {
    method: 'POST',
    headers: { apikey: KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))));

  const request = shouldRecord
    ? call('record_visit', { p_device_id: deviceId, p_path: location.pathname })
    : call('get_visit_count', {});

  request.then((total) => {
    if (shouldRecord) storage.setItem(DAY_KEY, today);
    const count = Number(total);
    if (!Number.isFinite(count) || count < 1) return;
    const text = new Intl.NumberFormat('en-IN').format(count);
    outputs.forEach((output) => {
      const number = output.querySelector('[data-visit-number]');
      if (number) number.textContent = text;
      const label = output.querySelector('[data-visit-label]');
      if (label) label.textContent = count === 1 ? 'visit' : 'visits';
      output.hidden = false;
    });
  }).catch(() => { /* Supabase unreachable or paused: keep the counter hidden. */ });
})();
