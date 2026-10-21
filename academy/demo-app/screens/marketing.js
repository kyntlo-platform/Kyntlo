// Marketing — Social Planner, Emails (campaigns, builder, send/schedule, statistics),
// Templates (email, SMS and WhatsApp), Trigger Links and Ad Manager.
// Mirrors HighLevel's Marketing module. Nothing is sent: the backend is faked.
(() => {
  const { esc, icon, $, $$, avatar } = KY;
  const data = KY.data;
  const num = (n) => Number(n).toLocaleString('en-GB');

  Object.assign(window.KY_ICONS, {
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.6 2.2 4.2 5 4.5"/>',
    xlogo: '<path d="M4 4h4l12 16h-4z"/><path d="M20 4l-6.6 7.4M4 20l6.6-7.4"/>',
    type: '<path d="M4 7V5h16v2M9 19h6M12 5v14"/>',
    divider: '<path d="M3 12h18"/><path d="M8 6h8M8 18h8" opacity=".35"/>',
    btnblock: '<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M9 12h6"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
    code: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
    spacer: '<path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4"/>',
    monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>',
    alignL: '<path d="M3 6h18M3 12h12M3 18h16"/>', alignC: '<path d="M3 6h18M6 12h12M4 18h16"/>', alignR: '<path d="M3 6h18M9 12h12M5 18h16"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  });

  // ---------------------------------------------------------------- styles
  if (!document.getElementById('css-marketing')) {
    const st = document.createElement('style');
    st.id = 'css-marketing';
    st.textContent = `
#app.mk-full #sidebar, #app.mk-full #topbar { display: none; }
.mk-seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #fff; }
.mk-seg button { border: 0; background: #fff; height: 38px; padding: 0 14px; font-weight: 600; font-size: 14.5px; color: var(--ink-2); display: inline-flex; align-items: center; gap: 6px; }
.mk-seg button + button { border-left: 1px solid var(--line); }
.field .mk-seg { align-self: flex-start; }
.mk-seg button.on { background: var(--blue-soft); color: #004eeb; }
.mk-sub { display: flex; gap: 4px; border-bottom: 1px solid var(--line-soft); margin: -6px 0 18px; }
.mk-sub a { padding: 10px 14px; font-weight: 600; color: var(--muted); border-bottom: 2px solid transparent; cursor: pointer; }
.mk-sub a.on { color: var(--blue); border-bottom-color: var(--blue); }
.net { width: 26px; height: 26px; border-radius: 50%; display: inline-grid; place-items: center; color: #fff; flex: none; }
.net svg.i { stroke-width: 2.2; }
.net.sm { width: 20px; height: 20px; } .net.lg { width: 40px; height: 40px; }
.netstack { display: inline-flex; } .netstack .net { border: 2px solid #fff; margin-left: -6px; } .netstack .net:first-child { margin-left: 0; }
.acc { position: relative; display: inline-block; }
.acc .net { position: absolute; right: -4px; bottom: -4px; border: 2px solid #fff; }
/* Social calendar */
.sp-cal { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); }
.sp-cal .cell, .sp-week .slot { min-width: 0; }
.sp-cal .dow { padding: 10px 12px; font-size: 13px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .03em; background: #f9fafb; border-bottom: 1px solid var(--line-soft); }
.sp-cal .cell { min-height: 148px; border-right: 1px solid var(--line-soft); border-bottom: 1px solid var(--line-soft); padding: 8px; display: flex; flex-direction: column; gap: 5px; cursor: pointer; }
.sp-cal .cell:nth-child(7n) { border-right: 0; }
.sp-cal .cell:hover { background: #fcfcfd; }
.sp-cal .cell.out { background: #fafafa; } .sp-cal .cell.out .dn { color: var(--faint); }
.sp-cal .dn { font-size: 14px; font-weight: 600; color: var(--ink-2); }
.sp-cal .cell.today .dn { background: var(--blue); color: #fff; border-radius: 999px; width: 28px; height: 28px; display: grid; place-items: center; margin: -3px 0 0 -3px; }
.sp-post { display: flex; align-items: center; gap: 6px; font-size: 13px; padding: 4px 7px; border-radius: 6px; background: var(--blue-soft); border-left: 3px solid var(--blue); cursor: pointer; overflow: hidden; }
.sp-post.published { background: var(--green-soft); border-left-color: var(--green); }
.sp-post.draft { background: #f2f4f7; border-left-color: var(--faint); }
.sp-post b { font-weight: 600; flex: none; }
.sp-post .txt { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink-2); }
.sp-post .netstack .net { width: 18px; height: 18px; margin-left: -5px; border-width: 1.5px; }
.sp-post .netstack .net:first-child { margin-left: 0; }
.sp-week { display: grid; grid-template-columns: 70px repeat(7, minmax(0, 1fr)); }
.sp-week .hd { padding: 10px; text-align: center; font-weight: 600; font-size: 14px; background: #f9fafb; border-bottom: 1px solid var(--line-soft); border-left: 1px solid var(--line-soft); }
.sp-week .hd.today { color: var(--blue); }
.sp-week .hr { height: 58px; font-size: 12.5px; color: var(--faint); text-align: right; padding: 2px 8px 0 0; border-bottom: 1px solid var(--line-soft); }
.sp-week .slot { height: 58px; border-left: 1px solid var(--line-soft); border-bottom: 1px solid var(--line-soft); padding: 3px; position: relative; }
.sp-week .sp-post { position: absolute; left: 4px; right: 4px; top: 3px; flex-direction: column; align-items: flex-start; gap: 2px; height: 50px; }
.sp-week .sp-post .txt { width: 100%; font-size: 12.5px; }
/* Composer */
.sp-comp { display: grid; grid-template-columns: 1fr 470px; gap: 0; margin: -20px -22px; }
.sp-comp .l { padding: 18px 22px; border-right: 1px solid var(--line-soft); min-width: 0; }
.sp-comp .r { padding: 18px 22px; background: #f9fafb; }
.sp-pick { display: flex; flex-wrap: wrap; gap: 8px; }
.sp-pick button { display: flex; align-items: center; gap: 10px; border: 1px solid var(--line); background: #fff; border-radius: 999px; padding: 4px 12px 4px 4px; font-size: 14px; font-weight: 600; color: var(--ink-2); }
.sp-pick button.on { border-color: var(--blue); background: var(--blue-soft); color: #004eeb; box-shadow: 0 0 0 1px var(--blue); }
.sp-pick button[disabled] { opacity: .45; cursor: not-allowed; }
.sp-editor { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.sp-editor textarea { border: 0; width: 100%; min-height: 150px; padding: 12px 14px; resize: none; outline: none; font-size: 15.5px; line-height: 1.5; display: block; }
.sp-editor .bar { display: flex; align-items: center; gap: 4px; padding: 6px 8px; border-top: 1px solid var(--line-soft); background: #fcfcfd; }
.sp-editor .bar .btn { height: 34px; }
.sp-ai { border: 1px solid #d9d6fe; background: #f8f7ff; border-radius: 10px; padding: 12px 14px; margin-top: 10px; }
.sp-media { display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
.sp-thumb { width: 96px; height: 96px; border-radius: 8px; position: relative; overflow: hidden; cursor: pointer; border: 2px solid transparent; }
.sp-thumb.on { border-color: var(--blue); }
.mk-img { background: linear-gradient(135deg, #0e7c7b, #5ec2b7 55%, #f4d6c9); display: grid; place-items: center; color: #fff; font-weight: 700; text-align: center; }
.mk-img.b { background: linear-gradient(135deg, #f79009, #fdb022 50%, #fff3d6); }
.mk-img.c { background: linear-gradient(135deg, #6172f3, #a4bcfd 60%, #eef4ff); }
.mk-img.d { background: linear-gradient(135deg, #1f2937, #475467 60%, #98a2b3); }
.sp-prev { background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.sp-prev .ph { display: flex; align-items: center; gap: 10px; padding: 12px 14px; }
.sp-prev .pt { padding: 0 14px 12px; font-size: 14.5px; white-space: pre-wrap; word-break: break-word; }
.sp-prev .pimg { height: 240px; font-size: 22px; }
.sp-prev .pf { display: flex; justify-content: space-around; padding: 10px; border-top: 1px solid var(--line-soft); color: var(--muted); font-size: 14px; font-weight: 600; }
.sp-ptabs { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
.sp-ptabs button { border: 1px solid var(--line); background: #fff; border-radius: 8px; height: 36px; padding: 0 10px; display: flex; gap: 6px; align-items: center; font-size: 13.5px; font-weight: 600; color: var(--ink-2); }
.sp-ptabs button.on { border-color: var(--blue); color: #004eeb; background: var(--blue-soft); }
/* Email builder */
.eb { display: grid; grid-template-rows: 64px 1fr; height: 100vh; background: #fff; }
.eb-top { display: flex; align-items: center; gap: 10px; padding: 0 18px; border-bottom: 1px solid var(--line-soft); }
.eb-top .name { font-size: 17px; font-weight: 600; border: 1px solid transparent; border-radius: 6px; padding: 6px 8px; width: 380px; outline: none; }
.eb-top .name:hover, .eb-top .name:focus { border-color: var(--line); }
.eb-body { display: grid; grid-template-columns: 330px 1fr 360px; min-height: 0; }
.eb-left, .eb-right { overflow: auto; border-right: 1px solid var(--line-soft); }
.eb-right { border-right: 0; border-left: 1px solid var(--line-soft); padding: 16px 18px; }
.eb-ltabs { display: flex; border-bottom: 1px solid var(--line-soft); }
.eb-ltabs a { flex: 1; text-align: center; padding: 13px 0; font-weight: 600; color: var(--muted); border-bottom: 2px solid transparent; cursor: pointer; }
.eb-ltabs a.on { color: var(--blue); border-bottom-color: var(--blue); }
.eb-tools { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 16px; }
.eb-tool { border: 1px solid var(--line); border-radius: 10px; padding: 14px 6px 10px; text-align: center; font-size: 14px; font-weight: 600; color: var(--ink-2); cursor: grab; user-select: none; background: #fff; }
.eb-tool svg { width: 26px !important; height: 26px !important; color: var(--blue); display: block; margin: 0 auto 6px; }
.eb-tool:hover { border-color: #84adff; background: var(--blue-soft); }
.eb-canvaswrap { background: #eef1f5; overflow: auto; padding: 28px 20px 60px; position: relative; }
.eb-canvas { width: 600px; margin: 0 auto; background: #fff; box-shadow: 0 2px 10px rgba(16,24,40,.08); transition: width .3s; font-family: Arial, Helvetica, sans-serif; color: #1d2939; }
.eb-canvaswrap.mobile .eb-canvas { width: 375px; border: 10px solid #1d2939; border-radius: 30px; overflow: hidden; }
.eb-blk { position: relative; outline: 2px solid transparent; outline-offset: -2px; cursor: pointer; }
.eb-blk:hover { outline-color: #b2ccff; }
.eb-blk.sel { outline-color: var(--blue); }
.eb-blk .lbl { display: none; position: absolute; left: 0; top: 0; background: var(--blue); color: #fff; font: 600 12px Inter, system-ui; padding: 3px 8px; border-radius: 0 0 5px 0; z-index: 2; }
.eb-blk .ops { display: none; position: absolute; right: 4px; top: 4px; gap: 3px; z-index: 2; }
.eb-blk.sel .lbl { display: block; } .eb-blk.sel .ops { display: flex; }
.eb-blk .ops button { width: 30px; height: 28px; border: 0; border-radius: 5px; background: var(--blue); color: #fff; display: grid; place-items: center; }
.eb-blk .ops svg { width: 16px !important; height: 16px !important; }
.eb-drop { height: 4px; background: var(--blue); border-radius: 2px; margin: -2px 0; position: relative; z-index: 3; box-shadow: 0 0 0 3px #d1e0ff; }
.eb-empty { margin: 30px; border: 2px dashed #b2ccff; border-radius: 10px; padding: 50px 20px; text-align: center; color: var(--muted); }
.e-header { padding: 22px 30px; display: flex; align-items: center; gap: 10px; color: #0e7c7b; font-size: 22px; letter-spacing: -.01em; }
.e-header b { font-weight: 800; }
.e-hero { height: 230px; font-size: 32px; line-height: 1.15; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.e-hero small { display: block; font-size: 16px; font-weight: 600; opacity: .95; margin-top: 8px; }
.e-text { padding: 12px 30px; font-size: 16px; line-height: 1.6; white-space: pre-wrap; }
.e-text.h { font-size: 26px; font-weight: 700; line-height: 1.25; padding-top: 24px; color: #101828; }
.mf { background: #fef0c7; color: #93370d; border-radius: 4px; padding: 0 4px; font-family: ui-monospace, Menlo, monospace; font-size: .82em; font-weight: 600; white-space: nowrap; }
.e-btnwrap { padding: 14px 30px 20px; }
.e-btn { display: inline-block; color: #fff; font-weight: 700; padding: 14px 28px; font-size: 16px; }
.e-div { padding: 12px 30px; } .e-div hr { border: 0; border-top: 1px solid #d0d5dd; margin: 0; }
.e-social { padding: 14px 30px; display: flex; gap: 12px; justify-content: center; }
.e-social .net { width: 34px; height: 34px; }
.e-video { margin: 12px 30px; height: 220px; border-radius: 6px; position: relative; font-size: 17px; display: flex !important; align-items: flex-end; justify-content: flex-start; padding: 14px 16px; }
.e-video .play { position: absolute; inset: 0; margin: auto; width: 68px; height: 68px; border-radius: 50%; background: rgba(0,0,0,.55); display: grid; place-items: center; }
.e-html { margin: 12px 30px; padding: 16px; border: 1px dashed #98a2b3; color: #667085; font-family: ui-monospace, Menlo, monospace; font-size: 14px; text-align: center; }
.e-foot { padding: 22px 30px 26px; background: #f4f7f7; text-align: center; color: #667085; font-size: 13px; line-height: 1.6; }
.e-foot a { color: #0e7c7b; text-decoration: underline; }
.eb-right h4 { margin: 0 0 14px; font-size: 16px; display: flex; align-items: center; gap: 8px; }
.eb-right .sw { display: flex; gap: 8px; flex-wrap: wrap; }
.eb-right .sw button { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 1px var(--line); }
.eb-right .sw button.on { box-shadow: 0 0 0 2px var(--blue); }
.eb-right .grp { border-top: 1px solid var(--line-soft); padding-top: 14px; margin-top: 4px; }
/* Send page & stats */
.mk-two { display: grid; grid-template-columns: 1fr 400px; gap: 20px; align-items: start; }
.mk-sec { padding: 18px 20px; border-bottom: 1px solid var(--line-soft); }
.mk-sec:last-child { border-bottom: 0; }
.mk-sec h3 { margin: 0 0 14px; font-size: 17px; display: flex; align-items: center; gap: 8px; }
.mk-sec h3 .n { width: 26px; height: 26px; border-radius: 50%; background: var(--blue-soft); color: var(--blue); display: grid; place-items: center; font-size: 14px; }
.mk-pick { display: flex; flex-wrap: wrap; gap: 8px; }
.mk-pick button { border: 1px solid var(--line); background: #fff; border-radius: 999px; padding: 5px 12px; font-size: 14px; font-weight: 600; color: var(--ink-2); }
.mk-pick button.on { background: var(--blue); border-color: var(--blue); color: #fff; }
.mk-stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 20px; }
.mk-stats .stat .v { font-size: 28px; }
.mk-stats .stat .p { font-size: 14px; font-weight: 600; color: var(--muted); }
.mk-bar { height: 8px; background: #f2f4f7; border-radius: 9px; overflow: hidden; } .mk-bar i { display: block; height: 100%; background: #53b1fd; border-radius: 9px; }
.mk-tplgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.mk-tpl { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; cursor: pointer; background: #fff; }
.mk-tpl:hover { border-color: var(--blue); box-shadow: 0 0 0 1px var(--blue); }
.mk-tpl .th { height: 168px; background: #eef1f5; padding: 14px 30px 0; overflow: hidden; }
.mk-tpl .th .pg { background: #fff; height: 100%; border-radius: 4px 4px 0 0; box-shadow: 0 1px 4px rgba(16,24,40,.1); padding: 8px; display: flex; flex-direction: column; gap: 5px; }
.mk-tpl .th .pg .ln { height: 6px; border-radius: 3px; background: #e4e7ec; }
.mk-tpl .th .pg .hi { height: 56px; border-radius: 3px; }
.mk-tpl .th .pg .bt { height: 12px; width: 40%; border-radius: 3px; margin: 2px auto; }
.mk-tpl .nm { padding: 12px 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.sms-phone { width: 300px; margin: 0 auto; border: 10px solid #1d2939; border-radius: 34px; background: #f2f4f7; padding: 18px 12px; min-height: 380px; }
.sms-bub { background: #e4e7ec; border-radius: 16px 16px 16px 4px; padding: 10px 12px; font-size: 14px; white-space: pre-wrap; word-break: break-word; }
.wa-bub { background: #fff; border-radius: 4px 12px 12px 12px; padding: 10px 12px; font-size: 14px; white-space: pre-wrap; box-shadow: 0 1px 1px rgba(0,0,0,.1); }
.wa-bg { background: #efeae2; }
.tl-key { font-family: ui-monospace, Menlo, monospace; font-size: 13.5px; background: #f2f4f7; padding: 4px 8px; border-radius: 6px; }
`;
    document.head.appendChild(st);
  }

  // Leave the full-screen email builder when navigating away (runs before the shell re-renders).
  addEventListener('hashchange', () => { if (!/#\/marketing\/emails\/builder\//.test(location.hash)) $('#app')?.classList.remove('mk-full'); });

  // ---------------------------------------------------------------- shared bits
  const NET = {
    facebook: { label: 'Facebook', color: '#1877f2', icon: 'facebook', account: 'Bloom Dental Studio', kind: 'Page' },
    instagram: { label: 'Instagram', color: '#e1306c', icon: 'instagram', account: '@bloomdentalstudio', kind: 'Business account' },
    google: { label: 'Google Business Profile', short: 'Google', color: '#34a853', icon: 'google', account: 'Bloom Dental Studio — Marylebone', kind: 'Location' },
    linkedin: { label: 'LinkedIn', color: '#0a66c2', icon: 'linkedin', account: 'Bloom Dental Studio', kind: 'Company page' },
    tiktok: { label: 'TikTok', color: '#111111', icon: 'tiktok', account: '@bloomdentalstudio', kind: 'Business account' },
    x: { label: 'X (Twitter)', short: 'X', color: '#111111', icon: 'xlogo', account: '@BloomDentalLDN', kind: 'Profile' },
  };
  const connected = new Set(['facebook', 'instagram', 'google', 'linkedin']);
  const net = (n, cls = '') => `<span class="net ${cls}" style="background:${NET[n].color}" title="${esc(NET[n].label)}">${icon(NET[n].icon, cls === 'sm' ? 12 : cls === 'lg' ? 20 : 14)}</span>`;
  const netstack = (ns) => `<span class="netstack">${ns.map((n) => net(n, 'sm')).join('')}</span>`;
  const merge = (s) => esc(s).replace(/\{\{\s*([\w.]+)\s*\}\}/g, '<span class="mf">{{$1}}</span>');
  const mergeFields = [
    ['First name', '{{contact.first_name}}'], ['Last name', '{{contact.last_name}}'], ['Full name', '{{contact.name}}'],
    ['Email', '{{contact.email}}'], ['Phone', '{{contact.phone}}'], ['Business name', '{{location.name}}'],
    ['Appointment date & time', '{{appointment.start_time}}'],
  ];
  const sub = (items, cur, prefix) => `<div class="mk-sub">${items.map(([id, label]) => `<a id="${prefix}_${id}" class="${id === cur ? 'on' : ''}" data-sub="${id}">${esc(label)}</a>`).join('')}</div>`;

  // ================================================================ SOCIAL PLANNER
  const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const TODAY = new Date(2026, 9, 21);
  const parseWhen = (s) => { const m = /(\d{1,2}) (\w{3}),? (\d{1,2}:\d{2})/.exec(s); return m ? { d: new Date(2026, MON[m[2]], +m[1]), time: m[3] } : { d: null, time: '' }; };
  const fmtDay = (d) => `${DOW[(d.getDay() + 6) % 7]} ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
  const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const media = { beforeafter: ['', 'Before → After'], tip: ['b', '🪥 Smile tip'], team: ['c', 'Meet the team'], offer: ['', '£199 Whitening'], halloween: ['b', '🎃 Happy Halloween'], evening: ['c', 'Invisalign Open Evening'] };

  const posts = [
    ...data.social.map((p) => ({ ...p, ...parseWhen(p.date), media: { s1: 'beforeafter', s2: 'tip', s3: 'team' }[p.id] })),
    { id: 'x1', text: "We're now open on Saturdays! Book your check-up at a time that suits you 🗓️", networks: ['facebook', 'google'], d: new Date(2026, 9, 5), time: '09:00', status: 'published', media: null },
    { id: 'x2', text: 'Smile Tip Tuesday: floss before you brush, so the fluoride can reach between your teeth 🪥', networks: ['facebook', 'instagram'], d: new Date(2026, 9, 6), time: '08:00', status: 'published', media: 'tip', recurring: 'Weekly on Tuesday' },
    { id: 'x3', text: 'Smile Tip Tuesday: swap sugary snacks for cheese or nuts between meals 🧀', networks: ['facebook', 'instagram'], d: new Date(2026, 9, 13), time: '08:00', status: 'published', media: 'tip', recurring: 'Weekly on Tuesday' },
    { id: 'x4', text: 'Invisalign open evening on 12 November — free scans, prosecco and Q&A with Dr Mitchell ✨', networks: ['facebook', 'instagram', 'linkedin'], d: new Date(2026, 9, 14), time: '18:00', status: 'published', media: 'evening' },
    { id: 'x5', text: 'Smile Tip Tuesday: replace your brush head every three months 🪥', networks: ['facebook', 'instagram'], d: new Date(2026, 9, 20), time: '08:00', status: 'published', media: 'tip', recurring: 'Weekly on Tuesday' },
    { id: 'x6', text: 'Professional whitening is just £199 this month. Brighter smile, gentle on sensitive teeth 😁', networks: ['facebook', 'instagram', 'google'], d: new Date(2026, 9, 28), time: '12:00', status: 'scheduled', media: 'offer' },
    { id: 'x7', text: 'Smile Tip Tuesday: drink water after coffee to help prevent staining ☕', networks: ['facebook', 'instagram'], d: new Date(2026, 9, 27), time: '08:00', status: 'scheduled', media: 'tip', recurring: 'Weekly on Tuesday' },
    { id: 'x8', text: 'Happy Halloween from the Bloom team 🎃 Go easy on the sweets!', networks: ['facebook', 'instagram'], d: new Date(2026, 9, 31), time: '10:00', status: 'scheduled', media: 'halloween' },
    { id: 'x9', text: 'Meet James, our hygienist — ask him anything about gum health!', networks: ['facebook'], d: null, time: '', status: 'draft', media: null },
  ];
  const sp = { view: 'calendar', mode: 'month', month: new Date(2026, 9, 1), weekStart: new Date(2026, 9, 26), filter: 'all' };

  function postChip(p, week = false) {
    const head = `<b>${esc(p.time)}</b>${netstack(p.networks)}`;
    return `<div class="sp-post ${p.status}" data-post="${p.id}" id="sp_post_${p.id}">
      ${week ? `<span class="row" style="gap:6px">${head}</span>` : head}<span class="txt">${p.recurring ? icon('repeat', 12) + ' ' : ''}${esc(p.text)}</span></div>`;
  }

  function monthGrid() {
    const first = sp.month;
    const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
    const cells = [];
    for (let i = 0; i < 35 || cells.length % 7; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      if (i >= 35 && d.getMonth() !== first.getMonth()) break;
      cells.push(d);
    }
    return `<div class="sp-cal" id="sp_calendar">${DOW.map((d) => `<div class="dow">${d}</div>`).join('')}
      ${cells.map((d) => {
        const ps = posts.filter((p) => sameDay(p.d, d)).sort((a, b) => a.time.localeCompare(b.time));
        return `<div class="cell ${d.getMonth() !== first.getMonth() ? 'out' : ''} ${sameDay(d, TODAY) ? 'today' : ''}" data-day="${d.getMonth()}-${d.getDate()}" id="sp_day_${d.getMonth() + 1}_${d.getDate()}">
          <span class="dn">${d.getDate()}</span>${ps.slice(0, 3).map((p) => postChip(p)).join('')}${ps.length > 3 ? `<span class="muted" style="font-size:12.5px">+${ps.length - 3} more</span>` : ''}</div>`;
      }).join('')}</div>`;
  }

  function weekGrid() {
    const days = [...Array(7)].map((_, i) => { const d = new Date(sp.weekStart); d.setDate(d.getDate() + i); return d; });
    const hours = [...Array(12)].map((_, i) => 8 + i);
    return `<div class="sp-week" id="sp_calendar"><div class="hd" style="border-left:0"></div>
      ${days.map((d) => `<div class="hd ${sameDay(d, TODAY) ? 'today' : ''}">${fmtDay(d)}</div>`).join('')}
      ${hours.map((h) => `<div class="hr">${String(h).padStart(2, '0')}:00</div>${days.map((d) => {
        const ps = posts.filter((p) => sameDay(p.d, d) && parseInt(p.time, 10) === h);
        return `<div class="slot" data-day="${d.getMonth()}-${d.getDate()}" data-hour="${h}">${ps.slice(0, 1).map((p) => postChip(p, true)).join('')}</div>`;
      }).join('')}`).join('')}</div>`;
  }

  function listTable() {
    const rows = posts.filter((p) => sp.filter === 'all' || p.status === sp.filter)
      .sort((a, b) => (a.d && b.d ? b.d - a.d : a.d ? 1 : -1));
    return `<table class="t" id="sp_list"><thead><tr><th>Post</th><th>Accounts</th><th>Status</th><th>Scheduled for</th><th>Created by</th></tr></thead><tbody>
      ${rows.map((p) => `<tr class="click" data-post="${p.id}" id="sp_row_${p.id}">
        <td><div class="row">${p.media ? `<div class="mk-img ${media[p.media][0]}" style="width:44px;height:44px;border-radius:6px;font-size:10px;flex:none"></div>` : `<div style="width:44px;height:44px;border-radius:6px;background:#f2f4f7;display:grid;place-items:center;flex:none" class="faint">${icon('note', 18)}</div>`}
          <span style="max-width:620px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.text)}</span>${p.recurring ? `<span class="chip">${icon('repeat', 13)} Recurring</span>` : ''}</div></td>
        <td>${netstack(p.networks)}</td>
        <td><span class="chip ${p.status === 'published' ? 'green' : p.status === 'scheduled' ? 'blue' : ''}">${p.status[0].toUpperCase() + p.status.slice(1)}</span></td>
        <td class="muted">${p.d ? `${fmtDay(p.d)}, ${p.time}` : '—'}</td><td class="muted">${p.id === 'x9' ? 'Priya Shah' : 'Sarah Mitchell'}</td></tr>`).join('')}
    </tbody></table>`;
  }

  function socialPlanner(view) {
    const cal = sp.view === 'calendar';
    const label = cal ? (sp.mode === 'month' ? `${MONTHS[sp.month.getMonth()]} ${sp.month.getFullYear()}`
      : (() => { const e = new Date(sp.weekStart); e.setDate(e.getDate() + 6); return `${sp.weekStart.getDate()} ${MONTHS[sp.weekStart.getMonth()].slice(0, 3)} – ${e.getDate()} ${MONTHS[e.getMonth()].slice(0, 3)} ${e.getFullYear()}`; })()) : '';
    view.innerHTML = `
      <div class="page-head"><h1>Social Planner</h1>
        <div class="row" id="sp_connected" style="margin-left:10px;gap:6px">${[...connected].map((n) => net(n)).join('')}</div>
        <div class="actions">
          <button class="btn" id="sp_accounts">${icon('settings', 18)} Connect accounts</button>
          <button class="btn primary" id="sp_new">${icon('plus', 18)} New Post</button>
        </div></div>
      <div class="card">
        <div class="row" style="padding:12px 16px;border-bottom:1px solid var(--line-soft);gap:12px">
          <div class="mk-seg"><button id="sp_view_cal" class="${cal ? 'on' : ''}">${icon('calendar', 16)} Calendar</button><button id="sp_view_list" class="${cal ? '' : 'on'}">${icon('list', 16)} List</button></div>
          ${cal ? `<div class="mk-seg"><button id="sp_mode_month" class="${sp.mode === 'month' ? 'on' : ''}">Month</button><button id="sp_mode_week" class="${sp.mode === 'week' ? 'on' : ''}">Week</button></div>
            <button class="btn sm" id="sp_today">Today</button>
            <button class="btn sm icon" id="sp_prev" style="width:34px">${icon('left', 16)}</button><button class="btn sm icon" id="sp_next" style="width:34px">${icon('right', 16)}</button>
            <b style="font-size:17px" id="sp_label">${label}</b>`
          : `<div class="row" style="gap:6px" id="sp_filters">${[['all', 'All'], ['scheduled', 'Scheduled'], ['published', 'Published'], ['draft', 'Drafts'], ['failed', 'Failed']].map(([k, l]) =>
              `<button class="btn sm ${sp.filter === k ? 'primary' : ''}" data-f="${k}" id="sp_f_${k}">${l}</button>`).join('')}</div>`}
          <span class="spacer"></span>
          <span class="row muted" style="font-size:13.5px;gap:14px"><span class="row" style="gap:6px"><i style="width:10px;height:10px;border-radius:3px;background:var(--blue)"></i>Scheduled</span><span class="row" style="gap:6px"><i style="width:10px;height:10px;border-radius:3px;background:var(--green)"></i>Published</span></span>
        </div>
        ${cal ? (sp.mode === 'month' ? monthGrid() : weekGrid()) : listTable()}
      </div>`;
    $('#sp_view_cal').onclick = () => { sp.view = 'calendar'; socialPlanner(view); };
    $('#sp_view_list').onclick = () => { sp.view = 'list'; socialPlanner(view); };
    $('#sp_new').onclick = () => composer(view);
    $('#sp_accounts').onclick = () => accountsModal(view);
    if (cal) {
      $('#sp_mode_month').onclick = () => { sp.mode = 'month'; socialPlanner(view); };
      $('#sp_mode_week').onclick = () => { sp.mode = 'week'; socialPlanner(view); };
      $('#sp_today').onclick = () => { sp.month = new Date(2026, 9, 1); sp.weekStart = new Date(2026, 9, 19); socialPlanner(view); };
      const shift = (k) => {
        if (sp.mode === 'month') sp.month = new Date(sp.month.getFullYear(), sp.month.getMonth() + k, 1);
        else { const d = new Date(sp.weekStart); d.setDate(d.getDate() + 7 * k); sp.weekStart = d; }
        socialPlanner(view);
      };
      $('#sp_prev').onclick = () => shift(-1);
      $('#sp_next').onclick = () => shift(1);
      $$('[data-day]', view).forEach((c) => (c.onclick = (e) => {
        if (e.target.closest('[data-post]')) return;
        const [m, d] = c.dataset.day.split('-').map(Number);
        composer(view, null, new Date(2026, m, d), c.dataset.hour ? `${String(c.dataset.hour).padStart(2, '0')}:00` : null);
      }));
    } else $$('[data-f]', view).forEach((b) => (b.onclick = () => { sp.filter = b.dataset.f; socialPlanner(view); }));
    $$('[data-post]', view).forEach((el) => (el.onclick = (e) => { e.stopPropagation(); composer(view, posts.find((p) => p.id === el.dataset.post)); }));
  }

  function accountsModal(view) {
    const box = KY.modal({
      title: 'Connect accounts', wide: true,
      body: `<p class="muted" style="margin:0 0 16px">Connect the social accounts you want to post to. You'll log in to each network once to give Kyntlo permission to publish.</p>
        <div id="sp_acc_list">${Object.keys(NET).map((n) => `
          <div class="row" style="padding:12px 0;border-bottom:1px solid var(--line-soft)">${net(n, 'lg')}
            <div style="flex:1"><div class="bold">${esc(NET[n].label)}</div><div class="muted" style="font-size:14px">${connected.has(n) ? `${esc(NET[n].account)} · ${NET[n].kind}` : `Connect a ${NET[n].kind.toLowerCase()}`}</div></div>
            ${connected.has(n) ? `<span class="chip green">${icon('check', 14)} Connected</span><button class="btn sm ghost" style="color:var(--muted)">Disconnect</button>`
              : `<button class="btn sm primary" id="sp_connect_${n}" data-n="${n}">${icon('plus', 16)} Connect</button>`}
          </div>`).join('')}</div>`,
      actions: [{ label: 'Done', primary: true, id: 'sp_acc_done', onClick: (close) => { close(); socialPlanner(view); } }],
    });
    $$('[data-n]', box).forEach((b) => (b.onclick = () => {
      b.textContent = 'Connecting…';
      setTimeout(() => {
        connected.add(b.dataset.n);
        b.outerHTML = `<span class="chip green">${icon('check', 14)} Connected</span><button class="btn sm ghost" style="color:var(--muted)">Disconnect</button>`;
        KY.toast(`${NET[b.dataset.n].label} connected`);
      }, 700);
    }));
  }

  const AI_TEXT = "Thinking about Invisalign? 😁 Join us on Thursday 12 November for our Invisalign Open Evening at Bloom Dental Studio. Get a free 3D scan, see your future smile, and ask Dr Mitchell anything. Spaces are limited, so book yours today! 👉 bloomdental.co.uk/open-evening #Invisalign #MaryleboneDentist";

  function composer(view, post = null, day = null, hour = null) {
    const isNew = !post;
    const p = post || { id: null, text: '', networks: ['facebook', 'instagram'], d: day || new Date(2026, 9, 30), time: hour || '09:30', status: 'draft', media: null };
    let sel = [...p.networks];
    let pick = p.media;
    let prevNet = sel[0] || 'facebook';
    const box = KY.modal({
      title: isNew ? 'Create post' : 'Edit post', wide: true,
      body: `<div class="sp-comp">
        <div class="l">
          <div class="field"><label>Post to</label><div class="sp-pick" id="sp_pick">${Object.keys(NET).map((n) =>
            `<button id="sp_acc_${n}" data-n="${n}" class="${sel.includes(n) ? 'on' : ''}" ${connected.has(n) ? '' : 'disabled title="Not connected"'}>${net(n)}${esc(NET[n].short || NET[n].label)}</button>`).join('')}</div></div>
          <div class="field"><label>Post details</label>
            <div class="sp-editor"><textarea id="sp_text" placeholder="Write something, or ask Content AI to help…">${esc(p.text)}</textarea>
              <div class="bar">
                <button class="btn ghost sm" id="sp_media">${icon('image', 18)} Add media</button>
                <button class="btn ghost sm icon" id="sp_emoji" title="Emoji" style="width:34px">${icon('smile', 18)}</button>
                <button class="btn ghost sm icon" id="sp_hash" title="Hashtags" style="width:34px">${icon('hash', 18)}</button>
                <button class="btn sm" id="sp_ai" style="color:#5925dc;border-color:#d9d6fe;background:#f8f7ff">${icon('sparkle', 16)} Content AI</button>
                <span class="spacer"></span><span class="muted" style="font-size:13px" id="sp_count">${p.text.length} / 2,200</span>
              </div></div>
            <div id="sp_ai_box"></div>
            <div class="sp-media" id="sp_media_area"></div>
          </div>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
            <div class="field"><label>Date</label><input class="input" id="sp_date" value="${p.d ? `${fmtDay(p.d)} 2026` : 'Fri 30 Oct 2026'}"></div>
            <div class="field"><label>Time (Europe/London)</label><input class="input" id="sp_time" value="${esc(p.time || '09:30')}"></div>
          </div>
          <div class="row" style="margin-bottom:8px"><button class="toggle ${p.recurring ? 'on' : ''}" id="sp_recurring"></button><span class="bold">Recurring post</span><span class="muted" style="font-size:14px">Repeat this post on a schedule</span></div>
          <div id="sp_rec_opts" style="display:${p.recurring ? 'grid' : 'none'};grid-template-columns:1fr 1fr;gap:0 14px;margin-top:10px">
            <div class="field"><label>Repeats</label><select class="select" id="sp_repeat"><option>Daily</option><option selected>Weekly</option><option>Monthly</option></select></div>
            <div class="field"><label>Ends</label><select class="select" id="sp_ends"><option>Never</option><option>After 10 posts</option><option>On a date</option></select></div>
          </div>
        </div>
        <div class="r">
          <div class="bold" style="margin-bottom:10px">Preview</div>
          <div class="sp-ptabs" id="sp_ptabs"></div>
          <div id="sp_preview"></div>
          <p class="muted" style="font-size:13px;margin:10px 0 0">Previews are approximate. Each network may crop images and shorten long text.</p>
        </div></div>`,
      actions: [
        { label: 'Save as draft', id: 'sp_draft', onClick: (close) => save('draft', close) },
        { label: 'Post now', id: 'sp_postnow', onClick: (close) => save('published', close) },
        { label: 'Schedule', primary: true, id: 'sp_schedule', onClick: (close) => save('scheduled', close) },
      ],
    });
    box.style.width = '1300px';
    box.style.maxWidth = 'calc(100vw - 60px)';
    const ta = $('#sp_text', box);

    const drawMedia = () => {
      $('#sp_media_area', box).innerHTML = pick ? `<div class="sp-thumb mk-img ${media[pick][0]}" style="font-size:12px">${esc(media[pick][1])}
        <button class="btn sm icon" id="sp_media_remove" style="position:absolute;top:4px;right:4px;width:26px;height:26px;padding:0">${icon('x', 14)}</button></div>` : '';
      const rm = $('#sp_media_remove', box);
      if (rm) rm.onclick = () => { pick = null; drawMedia(); drawPreview(); };
    };
    const drawPreview = () => {
      if (!sel.includes(prevNet)) prevNet = sel[0];
      $('#sp_ptabs', box).innerHTML = sel.map((n) => `<button id="sp_prev_${n}" data-p="${n}" class="${n === prevNet ? 'on' : ''}">${net(n, 'sm')}${esc(NET[n].short || NET[n].label)}</button>`).join('');
      $$('[data-p]', box).forEach((b) => (b.onclick = () => { prevNet = b.dataset.p; drawPreview(); }));
      const text = ta.value || 'Your post text will appear here.';
      const img = pick ? `<div class="pimg mk-img ${media[pick][0]}">${esc(media[pick][1])}</div>` : '';
      const n = prevNet;
      $('#sp_preview', box).innerHTML = !n ? '<div class="empty" style="padding:40px 10px">Select an account to see a preview.</div>'
        : n === 'instagram' ? `<div class="sp-prev"><div class="ph">${avatar('Bloom Dental', 32)}<b style="font-size:14px">bloomdentalstudio</b><span class="spacer"></span>${icon('dots', 18)}</div>
            ${img || '<div class="pimg" style="background:#f2f4f7;display:grid;place-items:center;color:var(--faint);font-size:14px">Instagram posts need an image or video</div>'}
            <div class="row" style="padding:10px 14px;gap:14px">${icon('heart', 22)}${icon('chat', 22)}${icon('send', 22)}</div>
            <div class="pt"><b>bloomdentalstudio</b> ${esc(text)}</div></div>`
        : n === 'google' ? `<div class="sp-prev"><div class="ph">${net('google')}<div><b style="font-size:14px">Bloom Dental Studio</b><div class="muted" style="font-size:12.5px">Just now</div></div></div>
            ${img}<div class="pt" style="padding-top:12px">${esc(text.length > 300 ? text.slice(0, 300) + '…' : text)}</div>
            <div style="padding:0 14px 14px"><span class="btn sm" style="color:var(--blue)">Book</span></div></div>`
        : `<div class="sp-prev"><div class="ph">${avatar('Bloom Dental', 36)}<div><b style="font-size:14px">${esc(NET[n].account)}</b><div class="muted" style="font-size:12.5px">Just now · ${icon('globe', 12)}</div></div></div>
            <div class="pt">${esc(text)}</div>${img}
            <div class="pf"><span>${icon('heart', 16)} Like</span><span>${icon('chat', 16)} Comment</span><span>${icon('send', 16)} Share</span></div></div>`;
    };
    const count = () => { $('#sp_count', box).textContent = `${num(ta.value.length)} / 2,200`; };
    ta.oninput = () => { count(); drawPreview(); };
    $$('#sp_pick [data-n]', box).forEach((b) => (b.onclick = () => {
      if (b.disabled) return;
      const n = b.dataset.n;
      sel = sel.includes(n) ? sel.filter((x) => x !== n) : [...sel, n];
      b.classList.toggle('on', sel.includes(n));
      if (sel.includes(n)) prevNet = n;
      drawPreview();
    }));
    $('#sp_media', box).onclick = () => {
      const area = $('#sp_media_area', box);
      area.innerHTML = `<div style="width:100%"><div class="muted" style="font-size:13.5px;margin-bottom:6px">Media Storage — pick a file</div><div class="row" style="gap:10px">
        ${['evening', 'beforeafter', 'offer', 'team'].map((k) => `<div class="sp-thumb mk-img ${media[k][0]}" style="font-size:11.5px" id="sp_media_${k}" data-m="${k}">${esc(media[k][1])}</div>`).join('')}</div></div>`;
      $$('[data-m]', area).forEach((t) => (t.onclick = () => { pick = t.dataset.m; drawMedia(); drawPreview(); }));
    };
    $('#sp_emoji', box).onclick = (e) => KY.menu(e.currentTarget, ['😁', '✨', '🦷', '🗓️', '👉'].map((em) => ({ label: em, onClick: () => { ta.value += em; ta.oninput(); } })));
    $('#sp_hash', box).onclick = (e) => KY.menu(e.currentTarget, ['#Invisalign', '#MaryleboneDentist', '#TeethWhitening', '#SmileTips'].map((h) => ({ label: h, onClick: () => { ta.value += ' ' + h; ta.oninput(); } })));
    $('#sp_ai', box).onclick = () => {
      $('#sp_ai_box', box).innerHTML = `<div class="sp-ai"><div class="row" style="margin-bottom:8px;color:#5925dc">${icon('sparkle', 18)}<b>Content AI</b><span class="muted" style="font-size:13px">Describe the post you want</span></div>
        <div class="row"><input class="input" id="sp_ai_prompt" placeholder="e.g. Invite patients to our Invisalign open evening on 12 November">
        <select class="select" style="width:150px"><option>Friendly</option><option>Professional</option><option>Excited</option></select>
        <button class="btn primary" id="sp_ai_go">Generate</button></div></div>`;
      $('#sp_ai_go', box).onclick = () => {
        const btn = $('#sp_ai_go', box); btn.textContent = 'Writing…';
        ta.value = ''; let i = 0;
        const t = setInterval(() => { ta.value = AI_TEXT.slice(0, i += 6); count(); drawPreview(); if (i >= AI_TEXT.length) { clearInterval(t); btn.textContent = 'Regenerate'; } }, 30);
      };
    };
    $('#sp_recurring', box).onclick = (e) => { e.currentTarget.classList.toggle('on'); $('#sp_rec_opts', box).style.display = e.currentTarget.classList.contains('on') ? 'grid' : 'none'; };
    const save = (status, close) => {
      if (!sel.length) return KY.toast('Select at least one account', 'warn');
      const m = /(\d{1,2})\s+(\w{3})/.exec($('#sp_date', box).value);
      const d = status === 'published' ? new Date(TODAY) : status === 'draft' && !m ? null : new Date(2026, m ? MON[m[2]] ?? 9 : 9, m ? +m[1] : 30);
      const time = status === 'published' ? '11:42' : $('#sp_time', box).value;
      const rec = $('#sp_recurring', box).classList.contains('on') ? `${$('#sp_repeat', box).value}` : '';
      const fields = { text: ta.value || 'New post', networks: sel, d, time, status, media: pick, recurring: rec || undefined };
      if (isNew) {
        const id = 'n' + (posts.length + 1);
        posts.push({ id, ...fields });
        if (rec === 'Weekly' && d) for (let k = 1; k <= 5; k++) { const dd = new Date(d); dd.setDate(d.getDate() + 7 * k); posts.push({ id: `${id}r${k}`, ...fields, d: dd }); }
      } else Object.assign(post, fields);
      close();
      if (d && sp.view === 'calendar') sp.month = new Date(d.getFullYear(), d.getMonth(), 1);
      socialPlanner(view);
      KY.toast(status === 'published' ? `Posted to ${sel.length} account${sel.length > 1 ? 's' : ''}` : status === 'draft' ? 'Draft saved'
        : `Post scheduled for ${fmtDay(d)}, ${time}${rec ? ' · repeats ' + rec.toLowerCase() : ''}`);
    };
    KY.toggles; drawMedia(); drawPreview();
  }

  // ================================================================ EMAILS
  const campaigns = [
    { id: 'e4', name: 'November Check-up Reminder', status: 'draft', sent: 0, opened: '—', clicked: '—', date: '—', updated: 'Today', tpl: 'checkup' },
    ...data.emails.map((e) => ({ ...e, updated: { e1: '15 Oct 2026', e2: '19 Oct 2026', e3: '2 Oct 2026' }[e.id], tpl: { e1: 'newsletter', e2: 'offer', e3: 'welcome' }[e.id] })),
    { id: 'e5', name: 'September Newsletter — Back-to-School Smiles', status: 'sent', sent: 1984, opened: '45.1%', clicked: '5.4%', date: '16 Sep 2026', updated: '16 Sep 2026', tpl: 'newsletter' },
    { id: 'e6', name: 'Summer Whitening Flash Sale', status: 'sent', sent: 2012, opened: '51.3%', clicked: '8.2%', date: '12 Aug 2026', updated: '12 Aug 2026', tpl: 'offer' },
  ];
  const sendCfg = {}; // per campaign: recipients / sender / schedule
  let emSub = 'campaigns';
  let uid = 100;
  const B = (type, props = {}) => ({ id: 'b' + uid++, type, props });
  const footer = () => B('footer', { text: `Bloom Dental Studio · ${data.business.address}\nYou're receiving this email because you're a patient of Bloom Dental Studio.` });
  const TEMPLATES = {
    blank: { name: 'Blank', desc: 'Start from scratch', blocks: () => [] },
    offer: { name: 'Bloom — Monthly offer', desc: 'Saved template', hi: ['', '£199 Whitening'], blocks: () => [
      B('header'), B('image', { variant: '', title: '£199 Professional Whitening', small: 'This month only at Bloom Dental Studio', alt: 'Teeth whitening offer' }),
      B('text', { h: true, text: 'Hi {{contact.first_name}}, ready for a brighter smile?' }),
      B('text', { text: 'This month only, professional teeth whitening at Bloom is just £199 (usually £299). It is gentle on sensitive teeth, and most patients see results after one visit.' }),
      B('button', { text: 'Book my whitening', url: 'https://bloomdental.co.uk/whitening-199', color: '#0e7c7b', radius: 8 }),
      B('divider'), B('social'), footer()] },
    event: { name: 'Bloom — Event invite', desc: 'Saved template', hi: ['c', 'Open Evening'], blocks: () => [
      B('header'), B('image', { variant: 'c', title: 'Invisalign Open Evening', small: 'Thursday 12 November · 5–8 pm', alt: 'Invisalign open evening' }),
      B('text', { h: true, text: "You're invited to our Invisalign Open Evening" }),
      B('text', { text: 'Join us at the studio for a free 3D smile scan, see a preview of your new smile, and ask Dr Mitchell anything about clear aligners. Light refreshments provided.' }),
      B('button', { text: 'Book a free scan', url: 'https://bloomdental.co.uk/open-evening', color: '#0e7c7b', radius: 8 }),
      B('divider'), B('social'), footer()] },
    newsletter: { name: 'Bloom — Newsletter', desc: 'Saved template', hi: ['b', 'Smile Tips'], blocks: () => [
      B('header'), B('image', { variant: 'b', title: 'Halloween Smile Tips 🎃', small: 'Five ways to enjoy the treats without the cavities', alt: 'Halloween smile tips' }),
      B('text', { h: true, text: 'Hi {{contact.first_name}}, your October smile tips' }),
      B('text', { text: '1. Eat sweets with a meal, not as a snack.\n2. Choose chocolate over sticky toffee.\n3. Drink water afterwards.\n4. Wait 30 minutes before brushing.\n5. Book your autumn check-up.' }),
      B('button', { text: 'Read all five tips', url: 'https://bloomdental.co.uk/blog/halloween-tips', color: '#f79009', radius: 8 }),
      B('social'), footer()] },
    welcome: { name: 'Welcome email', desc: 'Pre-built', hi: ['d', 'Welcome'], blocks: () => [
      B('header'), B('text', { h: true, text: 'Welcome to Bloom, {{contact.first_name}}!' }),
      B('text', { text: "We're so glad you chose us. Before your first visit, please fill in your new patient form so we can make the most of your appointment." }),
      B('button', { text: 'Fill in my form', url: 'https://bloomdental.co.uk/new-patient', color: '#0e7c7b', radius: 8 }), footer()] },
    checkup: { name: 'Check-up reminder', desc: 'Pre-built', hi: ['', 'Check-up time'], blocks: () => [
      B('header'), B('image', { variant: '', title: 'Time for your check-up', small: 'Healthy smiles start with regular visits', alt: 'Check-up reminder' }),
      B('text', { h: true, text: 'Hi {{contact.first_name}}, your six-month check-up is due' }),
      B('text', { text: 'Regular check-ups catch small problems before they become big ones. Book a time that suits you online in under a minute. Evening and Saturday slots are available.' }),
      B('button', { text: 'Book my check-up', url: 'https://bloomdental.co.uk/book', color: '#0e7c7b', radius: 8 }),
      B('divider'), B('social'), footer()] },
  };
  const blocksFor = (c) => (c.blocks ||= TEMPLATES[c.tpl || 'blank'].blocks());

  function tplThumb(k) {
    const t = TEMPLATES[k];
    if (k === 'blank') return `<div class="th" style="display:grid;place-items:center;padding:0"><div class="faint" style="text-align:center">${icon('plus', 34)}<div style="font-weight:600;margin-top:6px">Blank</div></div></div>`;
    return `<div class="th"><div class="pg"><div class="ln" style="width:40%;background:#0e7c7b;opacity:.6"></div>
      <div class="hi mk-img ${t.hi[0]}" style="font-size:11px">${esc(t.hi[1])}</div><div class="ln" style="width:85%"></div><div class="ln" style="width:70%"></div>
      <div class="bt" style="background:#0e7c7b"></div></div></div>`;
  }

  function emailsList(view) {
    const statusChip = (s) => `<span class="chip ${s === 'sent' ? 'green' : s === 'scheduled' ? 'blue' : ''}">${s === 'sent' ? 'Sent' : s === 'scheduled' ? 'Scheduled' : 'Draft'}</span>`;
    view.innerHTML = `
      <div class="page-head"><h1>Email Marketing</h1>
        <div class="actions"><button class="btn" id="em_folder">${icon('folder', 18)} New folder</button>
        <button class="btn primary" id="em_new">${icon('plus', 18)} New campaign</button></div></div>
      ${sub([['campaigns', 'Campaigns'], ['templates', 'Templates']], emSub, 'em_sub')}
      ${emSub === 'campaigns' ? `<div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          <div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" id="em_search" placeholder="Search campaigns"></div>
          <button class="btn">${icon('filter', 18)} All statuses</button><span class="spacer"></span><span class="muted" style="font-size:14px">${campaigns.length} campaigns</span></div>
        <table class="t" id="em_table"><thead><tr><th>Campaign</th><th>Status</th><th>Sent</th><th>Opened</th><th>Clicked</th><th>Sent / scheduled</th><th>Last updated</th><th></th></tr></thead><tbody>
        ${campaigns.map((c) => `<tr class="click" data-c="${c.id}" id="em_row_${c.id}">
          <td><div class="row"><span style="width:36px;height:36px;border-radius:8px;background:var(--blue-soft);color:var(--blue);display:grid;place-items:center">${icon('mail', 18)}</span><span class="bold">${esc(c.name)}</span></div></td>
          <td>${statusChip(c.status)}</td><td>${c.sent ? num(c.sent) : '—'}</td><td>${esc(c.opened)}</td><td>${esc(c.clicked)}</td>
          <td class="muted">${esc(c.date)}</td><td class="muted">${esc(c.updated)}</td>
          <td style="text-align:right"><button class="btn ghost icon sm" data-more="${c.id}">${icon('more', 18)}</button></td></tr>`).join('')}
        </tbody></table></div>`
      : `<div class="row" style="margin-bottom:14px"><span class="muted">Reusable email designs. Every new campaign can start from one of these.</span><span class="spacer"></span><button class="btn" id="em_tpl_new">${icon('plus', 18)} New template</button></div>
        <div class="mk-tplgrid" style="grid-template-columns:repeat(4,1fr)">${Object.keys(TEMPLATES).filter((k) => k !== 'blank').map((k) => `<div class="mk-tpl">${tplThumb(k)}<div class="nm">${esc(TEMPLATES[k].name)}<span class="spacer"></span><span class="chip">${esc(TEMPLATES[k].desc)}</span></div></div>`).join('')}</div>`}`;
    $$('[data-sub]', view).forEach((a) => (a.onclick = () => { emSub = a.dataset.sub; emailsList(view); }));
    $('#em_new').onclick = () => templatePicker();
    $('#em_folder').onclick = () => KY.toast('Folder created');
    if (emSub !== 'campaigns') return;
    $('#em_search').oninput = (e) => { const q = e.target.value.toLowerCase(); $$('#em_table tbody tr').forEach((tr) => (tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none')); };
    $$('tr[data-c]', view).forEach((tr) => (tr.onclick = (e) => {
      if (e.target.closest('[data-more]')) return;
      const c = campaigns.find((x) => x.id === tr.dataset.c);
      KY.go(c.status === 'sent' ? `#/marketing/emails/stats/${c.id}` : c.status === 'scheduled' ? `#/marketing/emails/send/${c.id}` : `#/marketing/emails/builder/${c.id}`);
    }));
    $$('[data-more]', view).forEach((b) => (b.onclick = () => {
      const c = campaigns.find((x) => x.id === b.dataset.more);
      KY.menu(b, [
        { label: 'Edit', icon: 'edit', onClick: () => KY.go(`#/marketing/emails/builder/${c.id}`) },
        ...(c.status === 'sent' ? [{ label: 'View statistics', icon: 'chart', onClick: () => KY.go(`#/marketing/emails/stats/${c.id}`) }] : []),
        { label: 'Duplicate', icon: 'copy', onClick: () => { campaigns.unshift({ ...c, id: 'e' + uid++, name: c.name + ' (copy)', status: 'draft', sent: 0, opened: '—', clicked: '—', date: '—', updated: 'Just now', blocks: undefined }); emailsList(view); KY.toast('Campaign duplicated'); } },
        { label: 'Delete', icon: 'trash' },
      ]);
    }));
  }

  function templatePicker() {
    const box = KY.modal({
      title: 'Choose a template', wide: true,
      body: `<div class="row" style="margin-bottom:14px;gap:6px"><span class="chip blue">All</span><span class="chip">Saved templates</span><span class="chip">Pre-built</span></div>
        <div class="mk-tplgrid" id="em_tpls">${Object.keys(TEMPLATES).map((k) => `<div class="mk-tpl" id="em_tpl_${k}" data-t="${k}">${tplThumb(k)}
          <div class="nm">${esc(TEMPLATES[k].name)}<span class="spacer"></span>${k !== 'blank' ? `<span class="chip">${esc(TEMPLATES[k].desc)}</span>` : ''}</div></div>`).join('')}</div>`,
    });
    box.style.width = '1000px';
    $$('[data-t]', box).forEach((t) => (t.onclick = () => {
      const k = t.dataset.t;
      const c = { id: 'e' + uid++, name: k === 'blank' ? 'Untitled campaign' : `${TEMPLATES[k].name.replace('Bloom — ', '')} — ${'October'}`, status: 'draft', sent: 0, opened: '—', clicked: '—', date: '—', updated: 'Just now', tpl: k };
      if (k === 'event') c.name = 'Invisalign Open Evening';
      campaigns.unshift(c);
      box.closest('.overlay').remove();
      KY.go(`#/marketing/emails/builder/${c.id}`);
    }));
  }

  // ---------- builder
  const TOOLS = [['text', 'Text', 'type'], ['image', 'Image', 'image'], ['button', 'Button', 'btnblock'], ['divider', 'Divider', 'divider'],
    ['spacer', 'Spacer', 'spacer'], ['social', 'Social', 'share'], ['video', 'Video', 'video'], ['html', 'HTML', 'code']];
  const LABEL = { header: 'Logo', image: 'Image', text: 'Text', button: 'Button', divider: 'Divider', spacer: 'Spacer', social: 'Social', video: 'Video', html: 'HTML', footer: 'Footer' };
  const DEFAULTS = {
    text: () => ({ text: 'Write your message here. Click to edit this text.' }),
    image: () => ({ variant: 'd', title: 'Your image', small: 'Upload or choose from Media Storage', alt: '' }),
    button: () => ({ text: 'Click here', url: 'https://', color: '#0e7c7b', radius: 8 }),
    video: () => ({ url: 'https://youtube.com/watch?v=bloom-tour', title: 'Take a tour of the studio' }),
    divider: () => ({}), spacer: () => ({}), social: () => ({}), html: () => ({}),
  };

  function blockHTML(b, plain = false) {
    const p = b.props;
    const t = (s) => (plain ? esc(s).replace(/\{\{\s*contact\.first_name\s*\}\}/g, 'Olivia').replace(/\{\{[^}]+\}\}/g, '') : merge(s));
    switch (b.type) {
      case 'header': return `<div class="e-header" style="justify-content:center">${icon('smile', 30)}<span><b>Bloom</b> Dental Studio</span></div>`;
      case 'image': return `<div class="e-hero mk-img ${p.variant || ''}">${esc(p.title)}<small>${esc(p.small || '')}</small></div>`;
      case 'text': return `<div class="e-text ${p.h ? 'h' : ''}" style="text-align:${p.align || (p.h ? 'center' : 'left')}">${t(p.text)}</div>`;
      case 'button': return `<div class="e-btnwrap" style="text-align:${p.align || 'center'}"><span class="e-btn" style="background:${p.color};border-radius:${p.radius}px">${esc(p.text)}</span></div>`;
      case 'divider': return '<div class="e-div"><hr></div>';
      case 'spacer': return '<div style="height:32px"></div>';
      case 'social': return `<div class="e-social">${['facebook', 'instagram', 'google'].map((n) => net(n)).join('')}</div>`;
      case 'video': return `<div class="e-video mk-img c">${esc(p.title)}<span class="play">${icon('play', 30)}</span></div>`;
      case 'html': return '<div class="e-html">&lt;/&gt; Custom HTML block</div>';
      case 'footer': return `<div class="e-foot">${esc(p.text).replace(/\n/g, '<br>')}<br><a>Unsubscribe</a> · <a>Update preferences</a></div>`;
      default: return '';
    }
  }

  function builder(view, id) {
    const c = campaigns.find((x) => x.id === id);
    if (!c) return KY.go('#/marketing/emails');
    const blocks = blocksFor(c);
    let selId = null, left = 'elements', mobile = false, drag = null, dropAt = null, bg = '#eef1f5';
    $('#app').classList.add('mk-full');
    view.style.padding = '0';
    view.innerHTML = `<div class="eb">
      <div class="eb-top">
        <button class="btn ghost icon" id="em_back" title="Back to campaigns">${icon('left', 20)}</button>
        <input class="name" id="em_name" value="${esc(c.name)}">
        <span class="chip" id="em_saved">${icon('check', 13)} Saved</span>
        <span class="spacer"></span>
        <div class="mk-seg"><button id="em_desktop" class="on" title="Desktop">${icon('monitor', 18)} Desktop</button><button id="em_mobile" title="Mobile">${icon('mobile', 18)} Mobile</button></div>
        <span class="spacer"></span>
        <button class="btn" id="em_preview">${icon('eye', 18)} Preview</button>
        <button class="btn" id="em_test">${icon('send', 18)} Send test email</button>
        <button class="btn" id="em_save">Save</button>
        <button class="btn icon" id="em_more" title="More">${icon('more', 18)}</button>
        <button class="btn primary" id="em_next">Send or schedule ${icon('right', 18)}</button>
      </div>
      <div class="eb-body">
        <div class="eb-left"><div class="eb-ltabs"><a id="em_left_elements" data-l="elements" class="on">Elements</a><a id="em_left_layouts" data-l="layouts">Layouts</a></div><div id="em_left"></div></div>
        <div class="eb-canvaswrap" id="em_canvaswrap"><div class="eb-canvas" id="em_canvas"></div></div>
        <div class="eb-right" id="em_props"></div>
      </div></div>`;

    const drawLeft = () => {
      $$('[data-l]', view).forEach((a) => a.classList.toggle('on', a.dataset.l === left));
      $('#em_left').innerHTML = left === 'elements'
        ? `<div class="eb-tools">${TOOLS.map(([k, l, ic]) => `<div class="eb-tool" id="em_block_${k}" data-tool="${k}">${icon(ic, 26)}${l}</div>`).join('')}</div>
           <p class="muted" style="font-size:13.5px;padding:0 16px">Drag an element onto your email, or click it to add it at the end.</p>`
        : `<div class="eb-tools" style="grid-template-columns:1fr">${[['1 column', [1]], ['2 columns', [1, 1]], ['3 columns', [1, 1, 1]], ['1 : 2 columns', [1, 2]]].map(([l, cols]) =>
            `<div class="eb-tool" style="padding:12px"><div style="display:grid;grid-template-columns:${cols.map((x) => x + 'fr').join(' ')};gap:6px;margin-bottom:6px">${cols.map(() => '<div style="height:34px;border:1.5px dashed #84adff;border-radius:4px;background:var(--blue-soft)"></div>').join('')}</div>${l}</div>`).join('')}</div>`;
      $$('[data-tool]', view).forEach((t) => (t.onmousedown = (e) => { e.preventDefault(); drag = { type: t.dataset.tool, el: t, moved: false }; }));
    };
    const drawCanvas = () => {
      const cv = $('#em_canvas');
      $('#em_canvaswrap').classList.toggle('mobile', mobile);
      $('#em_canvaswrap').style.background = bg;
      cv.innerHTML = blocks.length ? blocks.map((b, i) => `${dropAt === i ? '<div class="eb-drop"></div>' : ''}<div class="eb-blk ${b.id === selId ? 'sel' : ''}" data-bid="${b.id}" id="em_c_${b.type}${blocks.filter((x, j) => x.type === b.type && j < i).length || ''}">
          <span class="lbl">${LABEL[b.type]}</span><span class="ops"><button data-op="up" title="Move up">${icon('up', 16)}</button><button data-op="dup" title="Duplicate">${icon('copy', 16)}</button><button data-op="del" title="Delete">${icon('trash', 16)}</button></span>
          ${blockHTML(b)}</div>`).join('') + (dropAt === blocks.length ? '<div class="eb-drop"></div>' : '')
        : `<div class="eb-empty" id="em_c_empty">${icon('plus', 30)}<div class="bold" style="margin-top:8px">Drag elements here</div>Start with a text, image or button element.</div>`;
      $$('[data-bid]', cv).forEach((el) => (el.onclick = (e) => {
        const op = e.target.closest('[data-op]');
        const i = blocks.findIndex((b) => b.id === el.dataset.bid);
        if (op) {
          if (op.dataset.op === 'del') { blocks.splice(i, 1); selId = null; }
          if (op.dataset.op === 'dup') { const copy = B(blocks[i].type, { ...blocks[i].props }); blocks.splice(i + 1, 0, copy); selId = copy.id; }
          if (op.dataset.op === 'up' && i > 0) [blocks[i - 1], blocks[i]] = [blocks[i], blocks[i - 1]];
          dirty(); drawCanvas(); drawProps(); return;
        }
        selId = el.dataset.bid; drawCanvas(); drawProps();
      }));
    };
    const redrawBlock = (b) => { const el = $(`[data-bid="${b.id}"]`); if (el) { el.lastElementChild.outerHTML = blockHTML(b); } dirty(); };
    const dirty = () => { const s = $('#em_saved'); if (s) { s.className = 'chip amber'; s.textContent = 'Unsaved changes'; } };
    const swatches = (cur, id, colors = ['#0e7c7b', '#155eef', '#f79009', '#ee46bc', '#101828', '#12b76a']) =>
      `<div class="sw">${colors.map((col, i) => `<button id="${id}_${i}" data-col="${col}" class="${col === cur ? 'on' : ''}" style="background:${col}"></button>`).join('')}</div>`;
    const align = (cur) => `<div class="mk-seg">${[['left', 'alignL'], ['center', 'alignC'], ['right', 'alignR']].map(([a, ic]) => `<button id="em_prop_align_${a}" data-al="${a}" class="${cur === a ? 'on' : ''}">${icon(ic, 16)}</button>`).join('')}</div>`;

    const drawProps = () => {
      const b = blocks.find((x) => x.id === selId);
      const P = $('#em_props');
      if (!b) {
        P.innerHTML = `<h4>${icon('settings', 18)} Email settings</h4>
          <div class="field"><label>Background colour</label>${swatches(bg, 'em_bg', ['#eef1f5', '#ffffff', '#e6f4f1', '#fdf2fa', '#101828'])}</div>
          <div class="field"><label>Content width</label><select class="select"><option>600 px (recommended)</option><option>640 px</option><option>700 px</option></select></div>
          <div class="field"><label>Default font</label><select class="select"><option>Arial</option><option>Helvetica</option><option>Georgia</option><option>Verdana</option></select></div>
          <div class="field"><label>Link colour</label>${swatches('#0e7c7b', 'em_link')}</div>
          <div class="grp muted" style="font-size:14px">Click any element in your email to edit it.</div>`;
        $$('[data-col]', P).forEach((s) => (s.onclick = () => { if (s.id.startsWith('em_bg')) { bg = s.dataset.col; drawCanvas(); drawProps(); } }));
        return;
      }
      const p = b.props;
      const head = `<h4>${icon({ text: 'type', image: 'image', button: 'btnblock', divider: 'divider', social: 'share', video: 'video', html: 'code', header: 'image', footer: 'type', spacer: 'spacer' }[b.type], 18)} ${LABEL[b.type]}<span class="spacer"></span><button class="btn ghost sm icon" id="em_props_close" style="width:30px">${icon('x', 16)}</button></h4>`;
      let body = '';
      if (b.type === 'text' || b.type === 'footer') body = `
        <div class="field"><label class="row">Content<span class="spacer"></span><button class="btn sm" id="em_merge" style="height:30px">${icon('user', 15)} Merge fields</button></label>
          <textarea class="input" rows="7" id="em_prop_text">${esc(p.text)}</textarea></div>
        ${b.type === 'text' ? `<div class="field"><label>Style</label><select class="select" id="em_prop_style"><option ${p.h ? 'selected' : ''}>Heading</option><option ${p.h ? '' : 'selected'}>Paragraph</option></select></div>
        <div class="field"><label>Alignment</label>${align(p.align || (p.h ? 'center' : 'left'))}</div>` : `<div class="grp muted" style="font-size:13.5px">The unsubscribe link is required in every marketing email. Keep it in your footer.</div>`}`;
      else if (b.type === 'button') body = `
        <div class="field"><label>Button text</label><input class="input" id="em_prop_btn_text" value="${esc(p.text)}"></div>
        <div class="field"><label>Action</label><select class="select"><option>Open website URL</option><option>Send email</option><option>Call phone number</option></select></div>
        <div class="field"><label>Website URL</label><input class="input" id="em_prop_btn_url" value="${esc(p.url)}"></div>
        <div class="field"><label>Button colour</label>${swatches(p.color, 'em_prop_btn_color')}</div>
        <div class="field"><label>Corner radius</label><select class="select" id="em_prop_radius">${[0, 4, 8, 24].map((r) => `<option value="${r}" ${r === p.radius ? 'selected' : ''}>${r} px</option>`).join('')}</select></div>
        <div class="field"><label>Alignment</label>${align(p.align || 'center')}</div>
        <div class="row"><button class="toggle on"></button><span>Full width on mobile</span></div>`;
      else if (b.type === 'image' || b.type === 'header') body = `
        <div class="mk-img ${p.variant || ''}" style="height:120px;border-radius:8px;margin-bottom:12px;font-size:15px">${esc(p.title || 'Bloom Dental Studio logo')}</div>
        <button class="btn" id="em_prop_img_change" style="width:100%;justify-content:center;margin-bottom:14px">${icon('upload', 18)} Replace image</button>
        <div class="field"><label>Alt text</label><input class="input" id="em_prop_img_alt" value="${esc(p.alt || 'Bloom Dental Studio')}"></div>
        <div class="field"><label>Link URL</label><input class="input" placeholder="https://"></div>
        <div class="field"><label>Width</label><select class="select"><option>Auto (fit to email)</option><option>Custom</option></select></div>`;
      else if (b.type === 'video') body = `
        <div class="field"><label>Video URL (YouTube or Vimeo)</label><input class="input" id="em_prop_video_url" value="${esc(p.url)}"></div>
        <div class="grp muted" style="font-size:13.5px">Email apps can't play video inside the email. Kyntlo shows a thumbnail with a play button that opens the video.</div>`;
      else if (b.type === 'social') body = ['Facebook', 'Instagram', 'Google'].map((n) => `<div class="field"><label>${n}</label><input class="input" value="https://${n.toLowerCase()}.com/bloomdentalstudio"></div>`).join('') + `<button class="btn sm">${icon('plus', 16)} Add network</button>`;
      else if (b.type === 'divider') body = `<div class="field"><label>Style</label><select class="select"><option>Solid</option><option>Dashed</option><option>Dotted</option></select></div><div class="field"><label>Thickness</label><select class="select"><option>1 px</option><option>2 px</option></select></div>`;
      else body = '<p class="muted">No settings for this element.</p>';
      P.innerHTML = head + body + `<div class="grp row" style="margin-top:16px"><span class="muted" style="font-size:14px">Padding</span><span class="spacer"></span><select class="select" style="width:130px;height:36px"><option>Default</option><option>None</option><option>Large</option></select></div>`;
      KY.toggles(P);
      $('#em_props_close').onclick = () => { selId = null; drawCanvas(); drawProps(); };
      const ta = $('#em_prop_text');
      if (ta) {
        ta.oninput = () => { p.text = ta.value; redrawBlock(b); };
        $('#em_merge').onclick = (e) => KY.menu(e.currentTarget, mergeFields.map(([l, f]) => ({ label: `${l}  ${f}`, icon: 'user', onClick: () => {
          const pos = ta.selectionStart ?? ta.value.length;
          ta.value = ta.value.slice(0, pos) + f + ta.value.slice(ta.selectionEnd ?? pos); ta.oninput(); ta.focus();
        } })));
      }
      const style = $('#em_prop_style'); if (style) style.onchange = () => { p.h = style.value === 'Heading'; redrawBlock(b); };
      const bt = $('#em_prop_btn_text'); if (bt) bt.oninput = () => { p.text = bt.value; redrawBlock(b); };
      const bu = $('#em_prop_btn_url'); if (bu) bu.oninput = () => { p.url = bu.value; dirty(); };
      const vu = $('#em_prop_video_url'); if (vu) vu.oninput = () => { p.url = vu.value; dirty(); };
      const rad = $('#em_prop_radius'); if (rad) rad.onchange = () => { p.radius = +rad.value; redrawBlock(b); };
      $$('[data-col]', P).forEach((s) => (s.onclick = () => { p.color = s.dataset.col; redrawBlock(b); drawProps(); }));
      $$('[data-al]', P).forEach((s) => (s.onclick = () => { p.align = s.dataset.al; redrawBlock(b); drawProps(); }));
      const ch = $('#em_prop_img_change'); if (ch) ch.onclick = () => KY.toast('Opening Media Storage…');
    };

    // Drag and drop from the Elements panel (mouse based, so it can be filmed).
    const wrap = $('#em_canvaswrap');
    const onMove = (e) => {
      if (!drag) return;
      drag.moved = true;
      const over = wrap.contains(e.target) || e.target === wrap;
      let at = null;
      if (over) {
        at = blocks.length;
        const els = $$('[data-bid]', $('#em_canvas'));
        for (let i = 0; i < els.length; i++) { const r = els[i].getBoundingClientRect(); if (e.clientY < r.top + r.height / 2) { at = i; break; } }
        if (at === blocks.length && blocks.length && blocks[blocks.length - 1].type === 'footer') at = blocks.length - 1;
      }
      if (at !== dropAt) { dropAt = at; drawCanvas(); }
    };
    const onUp = (e) => {
      if (!drag) return;
      const d = drag; drag = null;
      let at = dropAt; dropAt = null;
      const overTool = d.el.contains(e.target);
      if (at === null && overTool) { at = blocks.length; if (blocks.length && blocks[at - 1].type === 'footer') at--; }
      if (at !== null) {
        const nb = B(d.type, DEFAULTS[d.type]());
        blocks.splice(at, 0, nb); selId = nb.id; dirty();
        KY.toast(`${LABEL[d.type]} element added`);
      }
      drawCanvas(); drawProps();
      if (at !== null) setTimeout(() => $(`[data-bid="${selId}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 50);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    addEventListener('hashchange', function off() { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); removeEventListener('hashchange', off); });

    $$('[data-l]', view).forEach((a) => (a.onclick = () => { left = a.dataset.l; drawLeft(); }));
    $('#em_back').onclick = () => KY.go('#/marketing/emails');
    $('#em_name').oninput = (e) => { c.name = e.target.value; dirty(); };
    $('#em_desktop').onclick = () => { mobile = false; $('#em_desktop').classList.add('on'); $('#em_mobile').classList.remove('on'); drawCanvas(); };
    $('#em_mobile').onclick = () => { mobile = true; $('#em_mobile').classList.add('on'); $('#em_desktop').classList.remove('on'); drawCanvas(); };
    $('#em_save').onclick = () => { c.updated = 'Just now'; const s = $('#em_saved'); s.className = 'chip green'; s.innerHTML = `${icon('check', 13)} Saved`; KY.toast('Campaign saved'); };
    $('#em_next').onclick = () => { c.updated = 'Just now'; KY.go(`#/marketing/emails/send/${c.id}`); };
    $('#em_more').onclick = (e) => {
      const m = KY.menu(e.currentTarget, [
        { label: 'Save as template', icon: 'layers', onClick: () => {
          const key = 'saved' + uid++;
          const snap = blocks.map((b) => ({ type: b.type, props: { ...b.props } }));
          const hero = blocks.find((b) => b.type === 'image');
          TEMPLATES[key] = { name: c.name, desc: 'Saved template', hi: [hero?.props.variant || '', hero?.props.title || c.name], blocks: () => snap.map((b) => B(b.type, { ...b.props })) };
          KY.toast(`Saved as template "${c.name}"`);
        } },
        { label: 'Version history', icon: 'clock' },
      ]);
      m.querySelector('button').id = 'em_save_tpl';
      m.style.left = (e.currentTarget.getBoundingClientRect().right - 230) + 'px';
    };
    $('#em_preview').onclick = () => previewModal(blocks);
    $('#em_test').onclick = () => testModal(c);
    drawLeft(); drawCanvas(); drawProps();
  }

  function previewModal(blocks) {
    let mob = false;
    const box = KY.modal({ title: 'Preview', wide: true, body: `<div class="row" style="justify-content:center;margin-bottom:14px"><div class="mk-seg"><button id="em_pv_desktop" class="on">${icon('monitor', 16)} Desktop</button><button id="em_pv_mobile">${icon('mobile', 16)} Mobile</button></div>
      <span class="muted" style="font-size:13.5px;margin-left:12px">Merge fields shown with sample contact: Olivia Bennett</span></div><div class="eb-canvaswrap" id="em_pv" style="border-radius:8px;max-height:640px"><div class="eb-canvas">${blocks.map((b) => blockHTML(b, true)).join('')}</div></div>` });
    box.style.width = '960px';
    const set = (m) => { mob = m; $('#em_pv', box).classList.toggle('mobile', mob); $('#em_pv_mobile', box).classList.toggle('on', mob); $('#em_pv_desktop', box).classList.toggle('on', !mob); };
    $('#em_pv_desktop', box).onclick = () => set(false);
    $('#em_pv_mobile', box).onclick = () => set(true);
  }

  function testModal(c) {
    KY.modal({
      title: 'Send test email',
      body: `<div class="field"><label>Send a test to</label><input class="input" id="em_test_to" value="${esc(data.me.email)}"></div>
        <div class="field"><label>Fill merge fields using contact</label><select class="select" id="em_test_contact">${data.contacts.slice(0, 5).map((x) => `<option>${esc(x.name)}</option>`).join('')}</select></div>
        <p class="muted" style="margin:0;font-size:14px">Test emails are marked "[Test]" in the subject and don't count in your campaign statistics.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Send test', primary: true, id: 'em_test_send', onClick: (close, box) => { close(); KY.toast(`Test email sent to ${$('#em_test_to', box).value}`); } }],
    });
  }

  // ---------- send or schedule
  const TAGCOUNT = { whitening: 486, invisalign: 312, 'new patient': 268, 'check-up': 1120, implants: 74, vip: 94, 'facebook lead': 188, 'google lead': 161, nhs: 640, reactivation: 212, 'review requested': 97 };
  const LISTCOUNT = { 'Invisalign leads': 312, 'New this week': 46, Reactivation: 212 };
  const ALL = 2163;

  function sendPage(view, id) {
    const c = campaigns.find((x) => x.id === id);
    if (!c) return KY.go('#/marketing/emails');
    const blocks = blocksFor(c);
    const s = (sendCfg[id] ||= {
      to: c.status === 'scheduled' ? 'tags' : 'all', tags: c.status === 'scheduled' ? ['whitening'] : [], list: 'Invisalign leads',
      fromName: 'Bloom Dental Studio', fromEmail: 'hello@mail.bloomdental.co.uk',
      subject: c.status === 'scheduled' ? '{{contact.first_name}}, whitening is just £199 this month' : '',
      preview: c.status === 'scheduled' ? 'Brighter smile, gentle on sensitive teeth. Offer ends 31 October.' : '',
      when: c.status === 'scheduled' ? 'later' : 'now', date: c.status === 'scheduled' ? 'Wed 28 Oct 2026' : 'Tue 3 Nov 2026', time: '10:00', batch: 200, every: '1', unit: 'hours',
    });
    const count = () => (s.to === 'all' ? ALL : s.to === 'list' ? LISTCOUNT[s.list] : s.tags.reduce((a, t) => a + (TAGCOUNT[t] || 0), 0));
    const draw = () => {
      const n = count();
      const go = s.when === 'now' ? 'Send now' : s.when === 'later' ? 'Schedule' : 'Schedule batches';
      view.innerHTML = `
        <div class="page-head"><button class="btn ghost icon" id="em_send_back">${icon('left', 20)}</button><div><h1>Send or schedule</h1><div class="sub">${esc(c.name)}</div></div>
          <div class="actions"><button class="btn" id="em_send_edit">${icon('edit', 18)} Edit design</button><button class="btn" id="em_send_test">${icon('send', 18)} Send test email</button>
          <button class="btn primary" id="em_send_go">${icon(s.when === 'now' ? 'send' : 'clock', 18)} ${go}</button></div></div>
        <div class="mk-two">
          <div class="card">
            <div class="mk-sec" id="em_sec_to"><h3><span class="n">1</span>Recipients</h3>
              <div class="mk-seg" style="margin-bottom:14px"><button id="em_to_all" data-to="all" class="${s.to === 'all' ? 'on' : ''}">All contacts</button><button id="em_to_list" data-to="list" class="${s.to === 'list' ? 'on' : ''}">Smart list</button><button id="em_to_tags" data-to="tags" class="${s.to === 'tags' ? 'on' : ''}">Tags</button></div>
              ${s.to === 'tags' ? `<div class="field"><label>Send to contacts with any of these tags</label><div class="mk-pick" id="em_tags">${data.tags.map((t) => `<button id="em_tag_${t.replace(/\W+/g, '-')}" data-tag="${esc(t)}" class="${s.tags.includes(t) ? 'on' : ''}">${esc(t)}</button>`).join('')}</div></div>`
              : s.to === 'list' ? `<div class="field"><label>Smart list</label><select class="select" id="em_list">${Object.keys(LISTCOUNT).map((l) => `<option ${l === s.list ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></div>` : ''}
              <div class="row" style="background:#f9fafb;border:1px solid var(--line-soft);border-radius:8px;padding:10px 14px" id="em_count">${icon('users', 18)}<b>${num(n)} recipients</b><span class="muted" style="font-size:14px">Contacts who unsubscribed or have email DND on are skipped automatically.</span></div>
            </div>
            <div class="mk-sec" id="em_sec_from"><h3><span class="n">2</span>Sender</h3>
              <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px">
                <div class="field"><label>From name</label><input class="input" id="em_from_name" value="${esc(s.fromName)}"></div>
                <div class="field"><label>From email</label><input class="input" id="em_from_email" value="${esc(s.fromEmail)}"></div></div>
              <div class="row" style="gap:8px;font-size:14px" id="em_domain"><span class="chip green">${icon('shield', 14)} Dedicated domain verified</span><span class="muted">mail.bloomdental.co.uk</span>
                <a href="#/settings/email-services" id="em_domain_link" class="row" style="gap:4px;font-weight:600">Email services ${icon('external', 14)}</a></div>
            </div>
            <div class="mk-sec" id="em_sec_subject"><h3><span class="n">3</span>Subject & preview text</h3>
              <div class="field"><label class="row">Subject line<span class="spacer"></span><button class="btn sm" id="em_subject_merge" style="height:30px">${icon('user', 15)} Merge fields</button></label><input class="input" id="em_subject" placeholder="e.g. {{contact.first_name}}, time for your check-up" value="${esc(s.subject)}"></div>
              <div class="field" style="margin-bottom:0"><label>Preview text</label><input class="input" id="em_preview_text" placeholder="The line shown after the subject in the inbox" value="${esc(s.preview)}"></div>
            </div>
            <div class="mk-sec" id="em_sec_when"><h3><span class="n">4</span>When to send</h3>
              <div class="mk-seg" style="margin-bottom:14px"><button id="em_when_now" data-w="now" class="${s.when === 'now' ? 'on' : ''}">${icon('send', 16)} Send now</button><button id="em_when_later" data-w="later" class="${s.when === 'later' ? 'on' : ''}">${icon('calendar', 16)} Schedule</button><button id="em_when_batch" data-w="batch" class="${s.when === 'batch' ? 'on' : ''}">${icon('layers', 16)} Send in batches</button></div>
              ${s.when === 'now' ? '<p class="muted" style="margin:0">Your email starts sending as soon as you click Send now.</p>' : `
              <div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:0 14px">
                <div class="field"><label>${s.when === 'batch' ? 'Start on' : 'Date'}</label><input class="input" id="em_date" value="${esc(s.date)}"></div>
                <div class="field"><label>Time</label><input class="input" id="em_time" value="${esc(s.time)}"></div>
                <div class="field"><label>Time zone</label><select class="select"><option>Account time zone (Europe/London)</option><option>Contact's time zone</option></select></div></div>
              ${s.when === 'batch' ? `<div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:0 14px">
                <div class="field"><label>Batch quantity</label><input class="input" id="em_batch_qty" value="${s.batch}"></div>
                <div class="field"><label>Repeat after</label><input class="input" id="em_batch_every" value="${esc(s.every)}"></div>
                <div class="field"><label>&nbsp;</label><select class="select" id="em_batch_unit"><option ${s.unit === 'hours' ? 'selected' : ''}>hours</option><option ${s.unit === 'days' ? 'selected' : ''}>days</option></select></div></div>
                <div class="row" style="font-size:14px" id="em_batch_info">${icon('clock', 18)}<span class="muted">${num(n)} contacts in batches of ${num(s.batch)} → ${Math.ceil(n / s.batch)} batches, finishing about ${Math.ceil(n / s.batch) - 1} ${esc(s.unit)} after the first.</span></div>` : ''}`}
            </div>
          </div>
          <div class="card" id="em_inbox_preview" style="position:sticky;top:0">
            <div class="card-h"><h3>Inbox preview</h3></div>
            <div class="card-b">
              <div class="row" style="align-items:flex-start;padding:12px;border:1px solid var(--line-soft);border-radius:8px">${avatar(s.fromName || 'B', 36)}
                <div style="min-width:0;flex:1"><div class="row"><b style="font-size:14.5px">${esc(s.fromName)}</b><span class="spacer"></span><span class="faint" style="font-size:12.5px">10:00</span></div>
                <div id="em_ib_subject" style="font-size:14.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc((s.subject || 'Your subject line').replace(/\{\{\s*contact\.first_name\s*\}\}/g, 'Olivia'))}</div>
                <div class="muted" id="em_ib_preview" style="font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s.preview || 'Your preview text')}</div></div></div>
              <div style="margin-top:14px;height:360px;overflow:hidden;border:1px solid var(--line-soft);border-radius:8px;background:#eef1f5;padding:10px">
                <div style="transform:scale(.56);transform-origin:top left;width:600px"><div class="eb-canvas">${blocks.map((b) => blockHTML(b, true)).join('')}</div></div></div>
            </div></div>
        </div>`;
      $('#em_send_back').onclick = () => KY.go('#/marketing/emails');
      $('#em_send_edit').onclick = () => KY.go(`#/marketing/emails/builder/${c.id}`);
      $('#em_send_test').onclick = () => testModal(c);
      $$('[data-to]', view).forEach((b) => (b.onclick = () => { s.to = b.dataset.to; draw(); }));
      $$('[data-tag]', view).forEach((b) => (b.onclick = () => { const t = b.dataset.tag; s.tags = s.tags.includes(t) ? s.tags.filter((x) => x !== t) : [...s.tags, t]; draw(); }));
      $$('[data-w]', view).forEach((b) => (b.onclick = () => { s.when = b.dataset.w; draw(); }));
      const lst = $('#em_list'); if (lst) lst.onchange = () => { s.list = lst.value; draw(); };
      const bind = (sel, key, live) => { const el = $(sel); if (el) el.oninput = () => { s[key] = el.value; if (live) live(); }; };
      const refreshInbox = () => {
        $('#em_ib_subject').textContent = (s.subject || 'Your subject line').replace(/\{\{\s*contact\.first_name\s*\}\}/g, 'Olivia');
        $('#em_ib_preview').textContent = s.preview || 'Your preview text';
      };
      bind('#em_from_name', 'fromName'); bind('#em_from_email', 'fromEmail');
      bind('#em_subject', 'subject', refreshInbox); bind('#em_preview_text', 'preview', refreshInbox);
      bind('#em_date', 'date'); bind('#em_time', 'time'); bind('#em_batch_every', 'every');
      const bq = $('#em_batch_qty'); if (bq) bq.onchange = () => { s.batch = Math.max(1, parseInt(bq.value, 10) || 100); draw(); };
      const bu = $('#em_batch_unit'); if (bu) bu.onchange = () => { s.unit = bu.value; draw(); };
      $('#em_subject_merge').onclick = (e) => KY.menu(e.currentTarget, mergeFields.slice(0, 3).map(([l, f]) => ({ label: `${l}  ${f}`, icon: 'user', onClick: () => { const el = $('#em_subject'); el.value = f + (el.value ? ', ' + el.value : ''); s.subject = el.value; refreshInbox(); } })));
      $('#em_send_go').onclick = () => {
        if (!n) return KY.toast('Choose who to send to first', 'warn');
        if (!s.subject.trim()) { $('#em_subject').focus(); return KY.toast('Add a subject line first', 'warn'); }
        KY.modal({
          title: s.when === 'now' ? 'Send this campaign now?' : 'Schedule this campaign?',
          body: `<p style="margin-top:0"><b>${esc(c.name)}</b> will go to <b>${num(n)} contacts</b>${s.when === 'now' ? ' right away' : s.when === 'later' ? ` on <b>${esc(s.date)} at ${esc(s.time)}</b>` : ` in batches of ${num(s.batch)}, starting <b>${esc(s.date)} at ${esc(s.time)}</b>`}.</p>
            <p class="muted" style="margin-bottom:0">Subject: ${esc(s.subject)}</p>`,
          actions: [{ label: 'Cancel' }, { label: go, primary: true, id: 'em_confirm', onClick: (close) => {
            close();
            Object.assign(c, s.when === 'now' ? { status: 'sent', sent: n, opened: '0%', clicked: '0%', date: '21 Oct 2026' } : { status: 'scheduled', date: s.date.replace(/^\w{3} /, '') }, { updated: 'Just now' });
            KY.go('#/marketing/emails');
            KY.toast(s.when === 'now' ? `Sending to ${num(n)} contacts` : `Campaign scheduled for ${s.date}, ${s.time}`);
          } }],
        });
      };
    };
    draw();
  }

  // ---------- statistics
  function statsPage(view, id) {
    const c = campaigns.find((x) => x.id === id);
    if (!c || c.status !== 'sent') return KY.go('#/marketing/emails');
    const sent = c.sent || 2140;
    const bounced = Math.round(sent * 0.011), delivered = sent - bounced;
    const opened = Math.round(delivered * parseFloat(c.opened) / 100) || 0, clicked = Math.round(delivered * parseFloat(c.clicked) / 100) || 0;
    const unsub = Math.round(delivered * 0.0042), spam = 1;
    const pct = (v) => ((v / delivered) * 100).toFixed(1) + '%';
    const tiles = [['delivered', 'Delivered', delivered, ((delivered / sent) * 100).toFixed(1) + '% of sent'], ['opened', 'Opened', opened, pct(opened)], ['clicked', 'Clicked', clicked, pct(clicked)],
      ['bounced', 'Bounced', bounced, ((bounced / sent) * 100).toFixed(1) + '%'], ['unsub', 'Unsubscribed', unsub, pct(unsub)], ['spam', 'Spam complaints', spam, ((spam / delivered) * 100).toFixed(2) + '%']];
    const links = [['bloomdental.co.uk/blog/halloween-tips', 0.48], ['bloomdental.co.uk/book', 0.36], ['instagram.com/bloomdentalstudio', 0.09], ['facebook.com/bloomdentalstudio', 0.07]];
    const hours = [9, 22, 31, 18, 10, 6, 4, 3, 2, 2, 1, 1];
    const recips = data.contacts.slice(0, 7).map((x, i) => [x, ['Clicked', 'Opened', 'Opened', 'Delivered', 'Clicked', 'Bounced', 'Unsubscribed'][i]]);
    view.innerHTML = `
      <div class="page-head"><button class="btn ghost icon" id="em_stats_back">${icon('left', 20)}</button>
        <div><h1>${esc(c.name)}</h1><div class="sub">Sent ${esc(c.date)} · ${num(sent)} recipients · From Bloom Dental Studio &lt;hello@mail.bloomdental.co.uk&gt;</div></div>
        <div class="actions"><button class="btn" id="em_stats_export">${icon('download', 18)} Export</button><button class="btn" id="em_stats_dup">${icon('copy', 18)} Duplicate</button></div></div>
      <div class="mk-stats">${tiles.map(([k, l, v, p]) => `<div class="card stat" id="em_st_${k}"><div class="k">${l}</div><div class="v">${num(v)}</div><div class="p" style="${k === 'bounced' || k === 'spam' ? 'color:#b54708' : ''}">${p}</div></div>`).join('')}</div>
      <div class="grid" style="grid-template-columns:1.1fr 1fr">
        <div class="card" id="em_st_chart"><div class="card-h"><h3>Opens in the first 12 hours</h3></div><div class="card-b">
          <div class="row" style="align-items:flex-end;gap:10px;height:200px">${hours.map((h, i) => `<div style="flex:1;text-align:center"><div style="height:${h * 5.5}px;background:linear-gradient(180deg,#53b1fd,#8098f9);border-radius:5px 5px 0 0"></div><div class="faint" style="font-size:12px;margin-top:4px">${i + 1}h</div></div>`).join('')}</div>
          <p class="muted" style="font-size:14px;margin:12px 0 0">Most opens happen in the first three hours. Open rates are estimates: some email apps load images automatically, others block them.</p></div></div>
        <div class="card" id="em_st_links"><div class="card-h"><h3>Link activity</h3><span class="spacer"></span><span class="muted" style="font-size:14px">${num(clicked)} unique clicks</span></div>
          <table class="t"><thead><tr><th>Link</th><th style="width:150px">Unique clicks</th><th style="width:90px">Share</th></tr></thead><tbody>
          ${links.map(([u, f]) => `<tr><td><div class="row">${icon('link', 16)}<span>${esc(u)}</span></div></td><td><b>${num(Math.round(clicked * f))}</b></td><td><div class="mk-bar"><i style="width:${f * 100}%"></i></div></td></tr>`).join('')}
          </tbody></table></div>
      </div>
      <div class="card" style="margin-top:20px" id="em_st_recipients"><div class="card-h"><h3>Recipients</h3><span class="spacer"></span>
        <div class="row" style="gap:6px">${['All', 'Opened', 'Clicked', 'Bounced', 'Unsubscribed'].map((f, i) => `<span class="chip ${i ? '' : 'blue'}">${f}</span>`).join('')}</div></div>
        <table class="t"><thead><tr><th>Contact</th><th>Email</th><th>Status</th><th>Last activity</th></tr></thead><tbody>
        ${recips.map(([x, st]) => `<tr><td><div class="row">${avatar(x.name, 30)}<span class="bold">${esc(x.name)}</span></div></td><td class="muted">${esc(x.email)}</td>
          <td><span class="chip ${st === 'Clicked' ? 'green' : st === 'Opened' ? 'blue' : st === 'Bounced' ? 'red' : st === 'Unsubscribed' ? 'amber' : ''}">${st}</span></td><td class="muted">${['15 Oct, 10:42', '15 Oct, 11:05', '15 Oct, 18:20', '15 Oct, 10:00', '16 Oct, 08:14', '15 Oct, 10:01', '15 Oct, 13:37'][recips.findIndex((r) => r[0] === x)]}</td></tr>`).join('')}
        </tbody></table></div>`;
    $('#em_stats_back').onclick = () => KY.go('#/marketing/emails');
    $('#em_stats_export').onclick = () => KY.toast('Export started — we\'ll email you the CSV');
    $('#em_stats_dup').onclick = () => { campaigns.unshift({ ...c, id: 'e' + uid++, name: c.name + ' (copy)', status: 'draft', sent: 0, opened: '—', clicked: '—', date: '—', updated: 'Just now', blocks: undefined }); KY.go('#/marketing/emails'); KY.toast('Campaign duplicated'); };
  }

  // ================================================================ TEMPLATES (snippets)
  const templates = [
    { id: 't1', name: 'Appointment reminder — 24 hours', type: 'SMS', body: 'Hi {{contact.first_name}}, this is Bloom Dental Studio. Just a reminder of your appointment tomorrow at {{appointment.start_time}}. Reply C to confirm or call us on 020 7946 0321. Reply STOP to opt out.', updated: '2 days ago', by: 'Sarah Mitchell' },
    { id: 't2', name: 'Whitening offer — October', type: 'SMS', body: 'Hi {{contact.first_name}}, professional whitening at Bloom Dental is £199 until 31 Oct. Book: bloomdental.co.uk/whitening-199 Reply STOP to opt out.', updated: '1 week ago', by: 'Priya Shah' },
    { id: 't3', name: 'Review request', type: 'SMS', body: "Hi {{contact.first_name}}, thanks for visiting Bloom today! Would you leave us a quick Google review? It really helps: g.page/r/bloomdental/review Reply STOP to opt out.", updated: '3 weeks ago', by: 'Sarah Mitchell' },
    { id: 't4', name: 'Treatment plan follow-up', type: 'Email', subject: 'Your treatment plan from Bloom Dental', body: 'Hi {{contact.first_name}},\n\nThank you for coming in. Attached is your personalised treatment plan…', updated: '5 days ago', by: 'Sarah Mitchell' },
    { id: 't5', name: 'Running late — reschedule', type: 'Email', subject: 'Can we move your appointment?', body: 'Hi {{contact.first_name}},\n\nUnfortunately we need to move your appointment…', updated: '1 month ago', by: 'James Okafor' },
  ];
  const WA = [
    { id: 'w1', name: 'appointment_reminder', category: 'Utility', lang: 'English (UK)', status: 'Approved', body: 'Hi {{1}}, this is a reminder of your appointment at Bloom Dental Studio on {{2}}. Reply YES to confirm.' },
    { id: 'w2', name: 'whitening_offer_october', category: 'Marketing', lang: 'English (UK)', status: 'Approved', body: 'Hi {{1}} 😁 Professional teeth whitening is just £199 at Bloom Dental this month. Tap below to book your slot.', button: 'Book now' },
    { id: 'w3', name: 'review_request', category: 'Marketing', lang: 'English (UK)', status: 'Pending', body: 'Hi {{1}}, thank you for visiting Bloom today! Would you share a quick review?', button: 'Leave a review' },
    { id: 'w4', name: 'flash_sale_50', category: 'Marketing', lang: 'English (UK)', status: 'Rejected', body: 'LAST CHANCE!!! 50% off everything, today only!!!', reason: 'Message looks like spam (excessive capitals and punctuation).' },
  ];
  let tpFilter = 'all';
  const GSM = /^[@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&'()*+,\-./0-9:;<=>?¡A-ZÄÖÑÜ§¿a-zäöñüà^{}\\[~\]|€]*$/;
  function segments(text) {
    const gsm = GSM.test(text);
    const len = [...text].length + (gsm ? (text.match(/[\^{}\\[~\]|€]/g) || []).length : 0);
    const single = gsm ? 160 : 70, multi = gsm ? 153 : 67;
    return { len, gsm, seg: len === 0 ? 0 : len <= single ? 1 : Math.ceil(len / multi), per: len <= single ? single : multi };
  }

  function templatesTab(view) {
    const rows = templates.filter((t) => tpFilter === 'all' || t.type.toLowerCase() === tpFilter);
    const isWa = tpFilter === 'whatsapp';
    view.innerHTML = `
      <div class="page-head"><h1>Templates</h1><span class="sub">Reusable SMS, email and WhatsApp messages for conversations, bulk actions and workflows</span>
        <div class="actions"><button class="btn primary" id="tp_add">${icon('plus', 18)} Add template ${icon('chevron', 16)}</button></div></div>
      <div class="row" style="gap:6px;margin-bottom:14px" id="tp_filters">${[['all', 'All'], ['sms', 'SMS'], ['email', 'Email'], ['whatsapp', 'WhatsApp']].map(([k, l]) =>
        `<button class="btn sm ${tpFilter === k ? 'primary' : ''}" data-f="${k}" id="tp_f_${k}">${k === 'whatsapp' ? icon('whatsapp', 16) : k === 'sms' ? icon('sms', 16) : k === 'email' ? icon('mail', 16) : ''}${l}</button>`).join('')}</div>
      ${isWa ? `<div class="card row" style="padding:12px 16px;margin-bottom:14px;box-shadow:none;background:var(--blue-soft);border-color:#b2ccff;font-size:14.5px" id="tp_wa_note">${icon('whatsapp', 18)}
          <span>WhatsApp templates must be <b>approved by Meta</b> before you can use them. You need an approved template to message a contact more than 24 hours after their last reply.</span>
          <span class="spacer"></span><a href="#/settings/whatsapp" class="bold" style="white-space:nowrap">Manage in Settings → WhatsApp</a></div>
        <div class="card"><table class="t" id="tp_table"><thead><tr><th>Template name</th><th>Category</th><th>Language</th><th>Status</th><th>Message</th></tr></thead><tbody>
        ${WA.map((w) => `<tr class="click" data-wa="${w.id}" id="tp_row_${w.id}"><td class="bold" style="font-family:ui-monospace,Menlo,monospace;font-size:14px">${esc(w.name)}</td><td>${esc(w.category)}</td><td class="muted">${esc(w.lang)}</td>
          <td><span class="chip ${w.status === 'Approved' ? 'green' : w.status === 'Pending' ? 'amber' : 'red'}">${w.status}</span></td>
          <td class="muted" style="max-width:520px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(w.body)}</td></tr>`).join('')}</tbody></table></div>`
      : `<div class="card"><table class="t" id="tp_table"><thead><tr><th>Name</th><th>Type</th><th>Preview</th><th>Last updated</th><th>Updated by</th></tr></thead><tbody>
        ${rows.map((t) => `<tr class="click" data-t="${t.id}" id="tp_row_${t.id}"><td class="bold">${esc(t.name)}</td>
          <td><span class="chip ${t.type === 'SMS' ? 'blue' : 'purple'}">${t.type === 'SMS' ? icon('sms', 13) : icon('mail', 13)} ${t.type}</span></td>
          <td class="muted" style="max-width:560px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(t.subject || t.body)}</td><td class="muted">${esc(t.updated)}</td><td class="muted">${esc(t.by)}</td></tr>`).join('')}</tbody></table></div>`}`;
    $$('[data-f]', view).forEach((b) => (b.onclick = () => { tpFilter = b.dataset.f; templatesTab(view); }));
    $('#tp_add').onclick = (e) => {
      const m = KY.menu(e.currentTarget, [{ label: 'Text template (SMS)', icon: 'sms', onClick: () => smsEditor(view) }, { label: 'Email template', icon: 'mail', onClick: () => emailTplEditor(view) }]);
      m.querySelectorAll('button')[0].id = 'tp_add_sms'; m.querySelectorAll('button')[1].id = 'tp_add_email';
      m.style.left = Math.min(e.currentTarget.getBoundingClientRect().right - 240, innerWidth - 250) + 'px';
    };
    $$('[data-t]', view).forEach((r) => (r.onclick = () => { const t = templates.find((x) => x.id === r.dataset.t); t.type === 'SMS' ? smsEditor(view, t) : emailTplEditor(view, t); }));
    $$('[data-wa]', view).forEach((r) => (r.onclick = () => waDetail(WA.find((x) => x.id === r.dataset.wa))));
  }

  function smsEditor(view, t = null) {
    const box = KY.modal({
      title: t ? 'Edit text template' : 'New text template', wide: true,
      body: `<div class="grid" style="grid-template-columns:1fr 320px;gap:24px">
        <div>
          <div class="field"><label>Template name</label><input class="input" id="tp_sms_name" value="${esc(t?.name || '')}" placeholder="e.g. Whitening offer — November"></div>
          <div class="field"><label class="row">Message<span class="spacer"></span><button class="btn sm" id="tp_sms_merge" style="height:30px">${icon('user', 15)} Merge fields</button><button class="btn sm icon" id="tp_sms_emoji" style="height:30px;width:32px">${icon('smile', 15)}</button></label>
            <textarea class="input" rows="7" id="tp_sms_body" placeholder="Hi {{contact.first_name}}, …">${esc(t?.body || '')}</textarea>
            <div class="row" style="font-size:13.5px;margin-top:2px" id="tp_sms_counter"></div></div>
          <div class="field"><label>Attachment (optional)</label><button class="btn" id="tp_sms_attach" style="width:max-content">${icon('paperclip', 18)} Add image</button>
            <span class="muted" style="font-size:13px">Adding an image sends the message as an MMS, which is billed differently.</span></div>
          <div class="card" style="box-shadow:none;background:var(--amber-soft);border-color:#fedf89;padding:12px 14px;font-size:14px" id="tp_sms_compliance">
            <div class="row bold" style="color:#b54708;margin-bottom:4px">${icon('shield', 16)} Before you send marketing texts</div>
            Only text contacts who agreed to hear from you. Say who you are, and include how to opt out, for example <b>"Reply STOP to opt out"</b>. When someone replies STOP, Kyntlo turns on Do Not Disturb for SMS on their contact automatically.</div>
        </div>
        <div><div class="bold" style="margin-bottom:8px">Preview</div><div class="sms-phone"><div class="faint" style="text-align:center;font-size:12px;margin-bottom:10px">Bloom Dental · Text message</div><div class="sms-bub" id="tp_sms_preview"></div></div></div>
      </div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'tp_sms_save', onClick: (close, b) => {
        const name = $('#tp_sms_name', b).value || 'Untitled text template';
        const body = $('#tp_sms_body', b).value;
        if (t) Object.assign(t, { name, body, updated: 'Just now' });
        else templates.unshift({ id: 't' + uid++, name, type: 'SMS', body, updated: 'Just now', by: data.me.name });
        close(); tpFilter = tpFilter === 'email' || tpFilter === 'whatsapp' ? 'all' : tpFilter; templatesTab(view); KY.toast('Template saved');
      } }],
    });
    box.style.width = '1000px';
    const ta = $('#tp_sms_body', box);
    const upd = () => {
      const s = segments(ta.value);
      const stop = /\bSTOP\b/i.test(ta.value);
      $('#tp_sms_counter', box).innerHTML = `<span><b>${num(s.len)}</b> characters · <b>${s.seg}</b> segment${s.seg === 1 ? '' : 's'} <span class="muted">(${s.per} per segment${s.gsm ? '' : ' · has emoji or special characters'})</span></span>
        <span class="spacer"></span>${ta.value ? (stop ? `<span class="chip green">${icon('check', 13)} Opt-out text included</span>` : `<span class="chip amber">No opt-out text</span>`) : ''}`;
      $('#tp_sms_preview', box).innerHTML = ta.value ? esc(ta.value).replace(/\{\{\s*contact\.first_name\s*\}\}/g, 'Olivia').replace(/\{\{\s*appointment\.start_time\s*\}\}/g, '10:30 am') : '<span class="faint">Your message preview</span>';
    };
    ta.oninput = upd;
    $('#tp_sms_merge', box).onclick = (e) => KY.menu(e.currentTarget, mergeFields.map(([l, f]) => ({ label: `${l}  ${f}`, icon: 'user', onClick: () => {
      const pos = ta.selectionStart ?? ta.value.length; ta.value = ta.value.slice(0, pos) + f + ta.value.slice(ta.selectionEnd ?? pos); upd(); ta.focus(); ta.setSelectionRange(pos + f.length, pos + f.length);
    } })));
    $('#tp_sms_emoji', box).onclick = (e) => KY.menu(e.currentTarget, ['😁', '✨', '🦷', '📅'].map((em) => ({ label: em, onClick: () => { ta.value += em; upd(); } })));
    $('#tp_sms_attach', box).onclick = () => KY.toast('Opening Media Storage…');
    upd();
  }

  function emailTplEditor(view, t = null) {
    KY.modal({
      title: t ? 'Edit email template' : 'New email template', drawer: true,
      body: `<div class="field"><label>Template name</label><input class="input" id="tp_em_name" value="${esc(t?.name || '')}"></div>
        <div class="field"><label>Subject</label><input class="input" id="tp_em_subject" value="${esc(t?.subject || '')}"></div>
        <div class="field"><label>Message</label><textarea class="input" rows="12" id="tp_em_body">${esc(t?.body || '')}</textarea></div>
        <p class="muted" style="font-size:14px;margin:0">Email templates here are quick text replies for Conversations and workflows. For designed newsletters, use <a href="#/marketing/emails">Emails</a>.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'tp_em_save', onClick: (close, b) => {
        const v = { name: $('#tp_em_name', b).value || 'Untitled email template', subject: $('#tp_em_subject', b).value, body: $('#tp_em_body', b).value, updated: 'Just now' };
        if (t) Object.assign(t, v); else templates.unshift({ id: 't' + uid++, type: 'Email', by: data.me.name, ...v });
        close(); templatesTab(view); KY.toast('Template saved');
      } }],
    });
  }

  function waDetail(w) {
    KY.modal({
      title: w.name, wide: true,
      body: `<div class="grid" style="grid-template-columns:1fr 300px;gap:24px">
        <div>
          ${[['Status', `<span class="chip ${w.status === 'Approved' ? 'green' : w.status === 'Pending' ? 'amber' : 'red'}" id="tp_wa_status">${w.status}</span>`], ['Category', esc(w.category)], ['Language', esc(w.lang)]]
            .map(([k, v]) => `<div class="row" style="padding:10px 0;border-bottom:1px solid var(--line-soft)"><span class="muted" style="width:120px">${k}</span>${v}</div>`).join('')}
          ${w.reason ? `<div class="card" style="box-shadow:none;background:var(--red-soft);border-color:#fecdca;padding:12px 14px;margin-top:14px;font-size:14px"><b>Rejected by Meta:</b> ${esc(w.reason)}</div>` : ''}
          <p class="muted" style="font-size:14px">Variables like <span class="mf">{{1}}</span> are filled in when you send, for example with the contact's first name. Marketing templates are charged by Meta per conversation.</p>
        </div>
        <div class="wa-bg" style="border-radius:12px;padding:16px"><div class="wa-bub">${esc(w.body).replace(/\{\{1\}\}/g, 'Olivia').replace(/\{\{2\}\}/g, 'Thu 29 Oct, 10:30')}${w.button ? `<div style="border-top:1px solid #e4e7ec;margin-top:10px;padding-top:8px;text-align:center;color:#0a84ff;font-weight:600">${esc(w.button)}</div>` : ''}</div></div>
      </div>`,
    });
  }

  // ================================================================ TRIGGER LINKS
  const links = [
    { id: 'l1', name: 'Book Online', url: 'https://bloomdental.co.uk/book', key: 'Kx7pQ2mWz9RtB4nLcV8e', clicks: 412, unique: 356 },
    { id: 'l2', name: 'Whitening £199 Offer', url: 'https://bloomdental.co.uk/whitening-199', key: 'aP3vN8sJq1XyD6fGh2Ko', clicks: 188, unique: 161 },
    { id: 'l3', name: 'Leave a Google Review', url: 'https://g.page/r/bloomdental/review', key: 'Zt5mB9cRw2LqH7uYe4Ns', clicks: 97, unique: 92 },
  ];
  let tlSub = 'links';
  let tlSel = 'l1';
  const keyOf = (l) => `{{trigger_link.${l.key}}}`;
  const randKey = () => [...Array(20)].map((_, i) => 'Qm7Tx2Lb9WcR4pZk8NvYs3'[(i * 7 + links.length * 3) % 22]).join('');

  function triggerLinks(view) {
    const l = links.find((x) => x.id === tlSel) || links[0];
    const days = [12, 18, 9, 22, 31, 27, 14, 11, 25, 38, 29, 17, 21, 34].map((v) => Math.round(v * (l.clicks / 412) + 1));
    const clickers = [['c1', '5 min ago'], ['c5', '2 hours ago'], ['c9', 'Yesterday'], ['c2', 'Yesterday'], ['c13', '2 days ago']];
    view.innerHTML = `
      <div class="page-head"><h1>Trigger Links</h1><span class="sub">Track who clicks your links, and start automations when they do</span>
        <div class="actions"><button class="btn primary" id="tl_add">${icon('plus', 18)} Add Link</button></div></div>
      ${sub([['links', 'Links'], ['analyze', 'Analyze']], tlSub, 'tl_sub')}
      ${tlSub === 'links' ? `<div class="card"><table class="t" id="tl_table"><thead><tr><th>Name</th><th>Link URL</th><th>Link key</th><th>Clicks</th><th style="width:150px"></th></tr></thead><tbody>
        ${links.map((x) => `<tr id="tl_row_${x.id}"><td class="bold">${esc(x.name)}</td><td><a>${esc(x.url)}</a></td>
          <td><span class="tl-key">${esc(keyOf(x))}</span></td><td>${num(x.clicks)}</td>
          <td><div class="row" style="gap:4px;justify-content:flex-end"><button class="btn sm" id="tl_copy_${x.id}" data-copy="${x.id}">${icon('copy', 16)} Copy</button>
            <button class="btn ghost sm icon" data-edit="${x.id}" style="width:34px">${icon('edit', 16)}</button><button class="btn ghost sm icon" data-del="${x.id}" style="width:34px">${icon('trash', 16)}</button></div></td></tr>`).join('')}
        </tbody></table></div>
        <div class="card row" style="margin-top:16px;padding:14px 18px;box-shadow:none;background:#f9fafb;border-color:var(--line-soft);font-size:14.5px" id="tl_howto">${icon('zap', 20)}
          <span>Paste a link key into any email, SMS or social post. Kyntlo swaps it for a tracked link, and in <b>Automation</b> you can use the <b>Trigger Link Clicked</b> trigger to act on every click.</span></div>`
      : `<div class="row" style="margin-bottom:16px;gap:12px"><div class="field" style="margin:0;width:340px"><select class="select" id="tl_an_link">${links.map((x) => `<option value="${x.id}" ${x.id === l.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select></div>
          <button class="btn">${icon('calendar', 18)} Last 14 days</button></div>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px">
          <div class="card stat" id="tl_an_total"><div class="k">Total clicks</div><div class="v">${num(l.clicks)}</div></div>
          <div class="card stat" id="tl_an_unique"><div class="k">Unique clicks</div><div class="v">${num(l.unique)}</div></div>
          <div class="card stat"><div class="k">Clicks from known contacts</div><div class="v">${num(Math.round(l.unique * 0.82))}</div></div></div>
        <div class="grid" style="grid-template-columns:1.3fr 1fr">
          <div class="card" id="tl_an_chart"><div class="card-h"><h3>Clicks per day</h3></div><div class="card-b"><div class="row" style="align-items:flex-end;gap:8px;height:220px">
            ${days.map((v, i) => `<div style="flex:1;text-align:center"><div style="height:${(v / Math.max(...days)) * 190}px;background:linear-gradient(180deg,#53b1fd,#8098f9);border-radius:5px 5px 0 0"></div><div class="faint" style="font-size:11.5px;margin-top:4px">${8 + i}</div></div>`).join('')}</div>
            <div class="muted" style="font-size:13px;text-align:center;margin-top:6px">October</div></div></div>
          <div class="card" id="tl_an_contacts"><div class="card-h"><h3>Recent clicks</h3></div>
            ${clickers.map(([cid, t]) => { const x = data.contacts.find((k) => k.id === cid); return `<div class="row" style="padding:10px 18px;border-bottom:1px solid var(--line-soft)">${avatar(x.name, 32)}<span class="bold" style="flex:1">${esc(x.name)}</span><span class="muted" style="font-size:14px">${t}</span></div>`; }).join('')}
          </div></div>`}`;
    $$('[data-sub]', view).forEach((a) => (a.onclick = () => { tlSub = a.dataset.sub; triggerLinks(view); }));
    $('#tl_add').onclick = () => linkModal(view);
    if (tlSub === 'links') {
      $$('[data-copy]', view).forEach((b) => (b.onclick = () => {
        const x = links.find((k) => k.id === b.dataset.copy);
        navigator.clipboard?.writeText(keyOf(x)).catch(() => {});
        b.innerHTML = `${icon('check', 16)} Copied`; setTimeout(() => (b.innerHTML = `${icon('copy', 16)} Copy`), 1800);
        KY.toast('Link key copied to clipboard');
      }));
      $$('[data-edit]', view).forEach((b) => (b.onclick = () => linkModal(view, links.find((k) => k.id === b.dataset.edit))));
      $$('[data-del]', view).forEach((b) => (b.onclick = () => { links.splice(links.findIndex((k) => k.id === b.dataset.del), 1); triggerLinks(view); KY.toast('Link deleted'); }));
    } else $('#tl_an_link').onchange = (e) => { tlSel = e.target.value; triggerLinks(view); };
  }

  function linkModal(view, l = null) {
    KY.modal({
      title: l ? 'Edit link' : 'Add link',
      body: `<div class="field"><label>Link name</label><input class="input" id="tl_name" value="${esc(l?.name || '')}" placeholder="e.g. Invisalign Open Evening"></div>
        <div class="field"><label>Link URL</label><input class="input" id="tl_url" value="${esc(l?.url || '')}" placeholder="https://"></div>
        <p class="muted" style="margin:0;font-size:14px">Use the full web address, including https://</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'tl_save', onClick: (close, b) => {
        const name = $('#tl_name', b).value.trim() || 'New link';
        const url = $('#tl_url', b).value.trim() || 'https://bloomdental.co.uk';
        if (l) Object.assign(l, { name, url });
        else links.push({ id: 'l' + (links.length + 1), name, url, key: randKey(), clicks: 0, unique: 0 });
        close(); tlSub = 'links'; triggerLinks(view); KY.toast(l ? 'Link updated' : 'Link created');
      } }],
    });
  }

  // ================================================================ AD MANAGER
  function adManager(view) {
    const ads = [
      ['Invisalign Free Scan — Lead Form', 'facebook', 'Active', 412.6, 38, 18450],
      ['Whitening £199 — Instagram Stories', 'instagram', 'Active', 186.2, 21, 12300],
      ['Dentist Marylebone — Search', 'google', 'Active', 524.9, 33, 6120],
      ['Implant Consultation — Retargeting', 'facebook', 'Paused', 96.4, 4, 3980],
    ];
    const spend = ads.reduce((a, x) => a + x[3], 0), leads = ads.reduce((a, x) => a + x[4], 0);
    view.innerHTML = `
      <div class="page-head"><h1>Ad Manager</h1><span class="chip purple">Add-on</span>
        <div class="actions"><button class="btn" id="ad_accounts">${icon('settings', 18)} Ad accounts</button><button class="btn primary" id="ad_create">${icon('plus', 18)} Create Ad</button></div></div>
      <div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
        ${[['Amount spent', KY.money(spend, 2)], ['Leads', leads], ['Cost per lead', KY.money(spend / leads, 2)], ['Impressions', num(ads.reduce((a, x) => a + x[5], 0))]].map(([k, v]) => `<div class="card stat"><div class="k">${k}</div><div class="v">${v}</div><div class="muted" style="font-size:13px">Last 30 days</div></div>`).join('')}</div>
      <div class="card"><div class="card-h"><h3>Campaigns</h3><span class="spacer"></span><span class="row muted" style="font-size:14px;gap:8px">${net('facebook', 'sm')}${net('instagram', 'sm')}${net('google', 'sm')} Connected</span></div>
        <table class="t" id="ad_table"><thead><tr><th>Ad</th><th>Network</th><th>Status</th><th>Spent</th><th>Leads</th><th>Cost per lead</th><th>Impressions</th></tr></thead><tbody>
        ${ads.map(([n, nw, s, sp, ld, im]) => `<tr><td class="bold">${esc(n)}</td><td>${net(nw, 'sm')}</td><td><span class="chip ${s === 'Active' ? 'green' : ''}">${s}</span></td>
          <td>${KY.money(sp, 2)}</td><td>${ld}</td><td>${KY.money(sp / ld, 2)}</td><td>${num(im)}</td></tr>`).join('')}</tbody></table></div>
      <p class="muted" style="font-size:14px">Leads from your ads are added to Contacts automatically, with the ad as their source. Ad spend is paid directly to Meta, Google or LinkedIn.</p>`;
    $('#ad_create').onclick = () => KY.modal({
      title: 'Create Ad', wide: true,
      body: `<div class="grid" style="grid-template-columns:repeat(3,1fr)">${[['facebook', 'Facebook & Instagram', 'Lead form, traffic or messages'], ['google', 'Google Ads', 'Search and Performance Max'], ['linkedin', 'LinkedIn', 'Lead gen forms']].map(([n, l, d]) =>
        `<div class="card" style="padding:18px;box-shadow:none;text-align:center">${net(n, 'lg')}<div class="bold" style="margin-top:10px">${l}</div><div class="muted" style="font-size:14px;margin:4px 0 12px">${d}</div><button class="btn sm primary">Start from a template</button></div>`).join('')}</div>`,
    });
    $('#ad_accounts').onclick = () => KY.go('#/marketing/social-planner');
  }

  // ================================================================ ROUTER
  KY.screen('marketing', {
    tabs: [{ id: 'social-planner', label: 'Social Planner' }, { id: 'emails', label: 'Emails' }, { id: 'templates', label: 'Templates' }, { id: 'trigger-links', label: 'Trigger Links' }, { id: 'ad-manager', label: 'Ad Manager' }],
    render(view, { tab, params }) {
      $('#app').classList.remove('mk-full');
      if (tab === 'emails') {
        if (params[0] === 'builder') return builder(view, params[1]);
        if (params[0] === 'send') return sendPage(view, params[1]);
        if (params[0] === 'stats') return statsPage(view, params[1]);
        if (params[0] === 'templates') emSub = 'templates';
        return emailsList(view);
      }
      if (tab === 'templates') return templatesTab(view);
      if (tab === 'trigger-links') { if (params[0] === 'analyze') tlSub = 'analyze'; return triggerLinks(view); }
      if (tab === 'ad-manager') return adManager(view);
      return socialPlanner(view);
    },
  });
})();
