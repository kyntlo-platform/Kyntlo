// Sites — funnels, websites, the drag-and-drop page builder, forms, surveys,
// chat widget, QR codes, blogs and domains. Mirrors HighLevel's Sites module.
(() => {
  const { esc, icon, $, $$ } = KY;
  const D = KY.data;
  const BIZ = D.business;

  Object.assign(window.KY_ICONS, {
    desktop: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
    redo: '<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',
    type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    alignL: '<path d="M3 6h18M3 12h12M3 18h16"/>',
    alignC: '<path d="M3 6h18M6 12h12M4 18h16"/>',
    alignR: '<path d="M3 6h18M9 12h12M5 18h16"/>',
    section: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/>',
    rowi: '<rect x="3" y="8" width="18" height="8" rx="2"/>',
    columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
    up: '<path d="M18 15l-6-6-6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    pin: '<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    radio: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
    divider: '<path d="M3 12h18M7 7h10M7 17h10"/>',
    cursor: '<path d="M4 2l15 11.2-6.6 1.1 3.9 7.4-3 1.5-3.9-7.5L4 20z"/>',
    signature: '<path d="M3 17c3-6 5-9 6-6s-2 7 1 6 3-5 5-4 0 4 3 3M3 21h18"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>',
    tooth: '<path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4 2 7 .5 3 1 6.5 2.5 6.5S9.5 17 12 17s3 4 4.5 4S18.5 17.5 19 14.5c.5-3 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
  });

  // ---------------------------------------------------------------- styles
  if (!document.getElementById('css-sites')) {
    const st = document.createElement('style');
    st.id = 'css-sites';
    st.textContent = `
    .st-sub{display:flex;gap:4px;border-bottom:1px solid var(--line);margin:-4px 0 20px}
    .st-sub a{padding:10px 16px;color:var(--ink-2);font-weight:600;font-size:15.5px;border-bottom:2px solid transparent;cursor:pointer;margin-bottom:-1px}
    .st-sub a.on{color:var(--blue);border-bottom-color:var(--blue)}
    .st-crumb{display:flex;align-items:center;gap:8px;font-size:15px;color:var(--muted);margin-bottom:6px}
    .st-crumb a{cursor:pointer;color:var(--muted);font-weight:500}.st-crumb a:hover{color:var(--blue)}
    .st-thumb{width:100%;aspect-ratio:16/9.7;overflow:hidden;border-radius:8px;border:1px solid var(--line-soft);background:#fff;position:relative}
    .st-thumb>.lp{width:1180px;transform-origin:0 0;pointer-events:none;position:absolute;left:0;top:0}
    .st-step{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:8px;cursor:pointer;border:1px solid transparent;margin-bottom:6px}
    .st-step:hover{background:#f9fafb}.st-step.on{background:var(--blue-soft);border-color:#b2ccff}
    .st-step .n{width:28px;height:28px;border-radius:50%;background:#f2f4f7;display:grid;place-items:center;font-weight:700;font-size:13px;color:var(--ink-2);flex:none}
    .st-step.on .n{background:var(--blue);color:#fff}
    .st-num{font-variant-numeric:tabular-nums}
    .st-pick{border:1.5px solid var(--line);border-radius:10px;padding:16px;cursor:pointer;background:#fff;transition:border-color .15s, box-shadow .15s}
    .st-pick:hover{border-color:#84adff}.st-pick.on{border-color:var(--blue);box-shadow:0 0 0 4px #d1e0ff}
    .st-code{font:13.5px/1.55 ui-monospace,Menlo,Consolas,monospace;background:#101828;color:#d0d5dd;border-radius:8px;padding:14px 16px;white-space:pre-wrap;word-break:break-all}
    .st-kv{display:grid;grid-template-columns:200px 1fr;gap:10px 18px;align-items:center}
    .st-tile{border:1px solid var(--line);border-radius:10px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:13.5px;font-weight:600;color:var(--ink-2);cursor:grab;background:#fff;user-select:none;text-align:center;line-height:1.2}
    .st-tile:hover{border-color:#84adff;background:#f5f8ff;color:var(--blue)}
    .st-group{font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--faint);margin:16px 0 10px}
    .st-ptabs{display:flex;border-bottom:1px solid var(--line-soft)}
    .st-ptabs button{flex:1;background:none;border:0;padding:13px 6px;font-weight:600;color:var(--muted);border-bottom:2px solid transparent;font-size:15px}
    .st-ptabs button.on{color:var(--blue);border-bottom-color:var(--blue)}
    .st-acc{border-bottom:1px solid var(--line-soft);padding:16px 18px}
    .st-acc h4{margin:0 0 12px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
    .st-sw{display:flex;gap:8px;flex-wrap:wrap}
    .st-sw button{width:30px;height:30px;border-radius:8px;border:1px solid var(--line);padding:0}
    .st-sw button.on{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--blue)}
    .st-seg{display:flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
    .st-seg button{flex:1;border:0;background:#fff;height:38px;display:grid;place-items:center;color:var(--ink-2);font-weight:600;font-size:14px;padding:0 10px}
    .st-seg button+button{border-left:1px solid var(--line)}
    .st-seg button.on{background:var(--blue-soft);color:var(--blue)}
    .st-full{position:fixed;inset:0;z-index:40;background:#f2f4f7;display:flex;flex-direction:column}
    .pb-top{height:62px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px;padding:0 16px;flex:none}
    .pb-top .ttl b{display:block;font-size:16px}.pb-top .ttl small{color:var(--muted);font-size:13px}
    .pb-body{flex:1;display:flex;min-height:0}
    .pb-rail{width:68px;background:#fff;border-right:1px solid var(--line);display:flex;flex-direction:column;align-items:center;padding:12px 0;gap:6px;flex:none}
    .pb-rail button{width:48px;height:48px;border-radius:10px;border:0;background:none;color:var(--ink-2);display:grid;place-items:center}
    .pb-rail button:hover{background:#f2f4f7}.pb-rail button.on{background:var(--blue-soft);color:var(--blue)}
    .pb-rail .add{background:var(--blue);color:#fff}.pb-rail .add:hover,.pb-rail .add.on{background:#004eeb;color:#fff}
    .pb-panel{width:330px;background:#fff;border-right:1px solid var(--line);overflow:auto;flex:none}
    .pb-stage{flex:1;overflow:auto;padding:28px 30px 120px;min-width:0}
    .pb-canvas{margin:0 auto;width:100%;max-width:1180px;background:#fff;box-shadow:0 4px 24px rgba(16,24,40,.12);transition:max-width .4s ease}
    .pb-canvas.mob{max-width:400px;border-radius:30px;overflow:hidden;border:10px solid #1d2939;box-shadow:0 18px 40px rgba(16,24,40,.25)}
    .pb-props{width:360px;background:#fff;border-left:1px solid var(--line);overflow:auto;flex:none}
    .pb-props .hd{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid var(--line-soft)}
    .pb-props .hd b{font-size:17px}
    .pb-dev{display:flex;background:#f2f4f7;border-radius:9px;padding:3px}
    .pb-dev button{width:44px;height:36px;border:0;border-radius:7px;background:none;color:var(--muted);display:grid;place-items:center}
    .pb-dev button.on{background:#fff;color:var(--blue);box-shadow:var(--shadow)}
    .pb-ghost{position:fixed;z-index:90;pointer-events:none;background:var(--blue);color:#fff;font-weight:600;font-size:14px;padding:8px 14px;border-radius:8px;box-shadow:0 10px 24px rgba(21,94,239,.35);transform:translate(14px,10px);display:flex;gap:8px;align-items:center}
    .pb-drop{position:fixed;z-index:89;pointer-events:none;height:4px;background:var(--blue);border-radius:3px;box-shadow:0 0 0 3px rgba(21,94,239,.2)}
    .pb-drop span{position:absolute;left:50%;top:-13px;transform:translateX(-50%);background:var(--blue);color:#fff;font:700 12px Inter,system-ui;padding:3px 9px;border-radius:999px}
    .pb-canvas .lp-el:hover{outline:1px dashed #84adff;outline-offset:3px}
    .pb-canvas .lp-sec:hover{box-shadow:inset 0 0 0 1px #a6f4c5}
    .lp-el.sel,.pb-canvas .lp-el.sel:hover{outline:2px solid #155eef;outline-offset:3px}
    .lp-sec.sel,.pb-canvas .lp-sec.sel:hover{box-shadow:inset 0 0 0 3px #12b76a}
    .lp-row.sel{outline:2px solid #06aed4;outline-offset:8px}
    .lp-col.sel{outline:2px solid #7f56d9;outline-offset:3px}
    .pb-tag{position:absolute;top:-33px;left:-5px;background:#155eef;color:#fff;font:600 13px Inter,system-ui;padding:0 4px 0 9px;height:28px;border-radius:6px 6px 0 0;display:flex;gap:2px;align-items:center;z-index:6;white-space:nowrap;text-align:left;letter-spacing:0;text-transform:none;font-style:normal}
    .pb-tag button{width:26px;height:24px;border:0;background:none;color:#fff;display:grid;place-items:center;border-radius:4px}
    .pb-tag button:hover{background:rgba(255,255,255,.2)}
    .pb-tag.sec{top:0;left:0;background:#12b76a;border-radius:0 0 6px 0}.pb-tag.row{background:#06aed4;top:-38px}.pb-tag.col{background:#7f56d9}
    .pb-empty{border:2px dashed #b2ccff;border-radius:10px;padding:26px;text-align:center;color:#2e90fa;font-weight:600;background:#f5f8ff;font-size:15px}
    .pb-hid{opacity:.35}
    .pb-hidbadge{position:absolute;right:0;top:-24px;font:600 12px Inter;background:#344054;color:#fff;border-radius:5px;padding:2px 7px}
    [data-edit]:focus{outline:none}
    .lp{font-family:Inter,system-ui,sans-serif;color:#14324a;background:#fff;text-align:left}
    .lp-sec{position:relative;padding:var(--pad) 48px}
    .lp-row{display:flex;gap:44px;margin:0 auto;max-width:1060px;position:relative}
    .lp-row+.lp-row{margin-top:28px}
    .w-full .lp-row{max-width:none}.w-medium .lp-row{max-width:780px}.w-small .lp-row{max-width:560px}
    .lp-col{flex:1;min-width:0;position:relative;display:flex;flex-direction:column;justify-content:center;min-height:40px}
    .lp-el{position:relative}
    .lp.mob .lp-sec{padding:calc(var(--pad) * .55) 20px}.lp.mob .lp-row{flex-direction:column;gap:22px}
    .lp h1,.lp h2,.lp p,.lp ul{margin:0}
    .lp-btn{display:inline-flex;flex-direction:column;align-items:center;gap:2px;padding:16px 34px;border-radius:10px;font-weight:700;font-size:19px;text-decoration:none;box-shadow:0 8px 20px rgba(13,148,136,.25)}
    .lp-btn small{font-weight:500;font-size:13px;opacity:.85}
    .lp-bul li{list-style:none;display:flex;gap:10px;align-items:flex-start;margin:9px 0}
    .lp-bul li i{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;color:#fff;flex:none;margin-top:2px;font-style:normal}
    .lp-form{border:1px solid #e4ebef;border-radius:14px;padding:24px;background:#fff;box-shadow:0 10px 30px rgba(20,50,74,.08)}
    .lp-form .f{margin-bottom:12px}
    .lp-form label{display:block;font-size:14px;font-weight:600;margin-bottom:5px;color:#344054}
    .lp-form .in{height:46px;border:1px solid #d0d5dd;border-radius:8px;padding:0 14px;display:flex;align-items:center;color:#98a2b3;font-size:15px;background:#fff}
    .lp-form .ta{height:84px;align-items:flex-start;padding-top:12px}
    .lp-form .sub{height:52px;border-radius:9px;color:#fff;font-weight:700;display:grid;place-items:center;font-size:17px;margin-top:6px}
    .lp-form .opt{display:flex;align-items:center;gap:9px;margin:6px 0;font-size:15px;color:#344054}
    .lp-form .opt i{width:18px;height:18px;border:1.5px solid #98a2b3;border-radius:50%;flex:none}
    .lp-form .opt i.sq{border-radius:4px}
    .lp-form .terms{font-size:13px;color:#667085;display:flex;gap:9px;line-height:1.4}
    .lp-feat{text-align:center;padding:6px}
    .lp-feat .ic{width:60px;height:60px;border-radius:16px;display:grid;place-items:center;margin:0 auto 14px}
    .lp-nav{display:flex;align-items:center;gap:24px}
    .lp-nav .logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:21px;letter-spacing:-.01em}
    .lp-nav .lp-menu{display:flex;gap:22px;margin-left:auto;font-weight:600;font-size:15px;color:#475467}
    .lp-nav .ph{margin-left:auto;font-weight:700;font-size:15px;border-radius:999px;padding:9px 16px;display:flex;gap:8px;align-items:center}
    .lp-nav .lp-menu+.ph{margin-left:8px}
    .lp.mob .lp-nav .lp-menu{display:none}.lp.mob .lp-nav .logo{font-size:18px}.lp.mob .lp-nav .ph span{display:none}.lp.mob .lp-nav .ph{padding:10px}
    .lp-cal{border:1px solid #e4ebef;border-radius:14px;display:grid;grid-template-columns:240px 1fr;overflow:hidden;background:#fff;box-shadow:0 10px 30px rgba(20,50,74,.08)}
    .lp.mob .lp-cal{grid-template-columns:1fr}
    .lp-cal .l{padding:22px;border-right:1px solid #e4ebef;background:#fafcfc}
    .lp-cal .r{padding:22px}
    .lp-cal .days{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:12px 0 18px}
    .lp-cal .days div{border:1px solid #e4ebef;border-radius:10px;text-align:center;padding:8px 0;font-size:13px;color:#667085}
    .lp-cal .days div b{display:block;font-size:18px;color:#14324a}
    .lp-cal .slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .lp-cal .slots div{border:1.5px solid;border-radius:8px;text-align:center;padding:9px 0;font-weight:600;font-size:14px}
    .lp-vid{aspect-ratio:16/9;border-radius:14px;background:linear-gradient(135deg,#14324a,#0d9488);display:grid;place-items:center;position:relative;overflow:hidden}
    .lp-vid .pl{width:74px;height:74px;border-radius:50%;background:rgba(255,255,255,.92);display:grid;place-items:center;color:#14324a}
    .lp-vid small{position:absolute;left:18px;bottom:14px;color:#fff;font-weight:600;font-size:15px}
    .lp-faq div{border-bottom:1px solid #e4ebef;padding:14px 0;font-weight:600;display:flex;justify-content:space-between}
    .lp-cd{display:flex;gap:12px;justify-content:center}
    .lp-cd div{background:#14324a;color:#fff;border-radius:10px;padding:10px 16px;text-align:center;min-width:76px}
    .lp-cd b{font-size:28px;display:block}.lp-cd small{font-size:12px;opacity:.8}
    .st-prev{position:fixed;inset:0;z-index:55;background:#e4e7ec;display:flex;flex-direction:column}
    .st-prev .bar{height:58px;background:#101828;color:#fff;display:flex;align-items:center;gap:14px;padding:0 18px;flex:none}
    .st-prev .url{background:#344054;border-radius:8px;padding:7px 14px;font-size:14px;color:#e4e7ec;display:flex;gap:8px;align-items:center}
    .st-prev .wrap{flex:1;overflow:auto;padding:24px}
    .fb-field{position:relative;border-radius:8px;padding:8px 10px;margin:0 -10px 4px;cursor:pointer;border:2px solid transparent}
    .fb-field:hover{border-color:#d1e0ff;border-style:dashed}
    .fb-field.sel{border:2px solid #155eef;background:#f5f8ff}
    .fb-field .req{color:#f04438;margin-left:3px}
    .fb-badge{position:absolute;right:8px;top:6px;font:600 12px Inter;border-radius:999px;padding:2px 8px;background:#f4f3ff;color:#5925dc}
    .cw-stage{position:relative;height:100%;min-height:760px;border-radius:12px;overflow:hidden;border:1px solid var(--line);background:#fff}
    .cw-stage .site{position:absolute;inset:0;filter:saturate(.9)}
    .cw-stage .site>.lp{width:1180px;transform-origin:0 0;pointer-events:none}
    .cw-stage .dim{position:absolute;inset:0;background:rgba(16,24,40,.08)}
    .cw-win{position:absolute;bottom:104px;width:380px;border-radius:16px;background:#fff;box-shadow:0 18px 48px rgba(16,24,40,.28);overflow:hidden;display:flex;flex-direction:column;animation:pop .25s}
    .cw-win .h{padding:18px 18px 16px;color:#fff}
    .cw-win .h b{font-size:18px;display:block}
    .cw-win .h small{opacity:.9;font-size:13.5px}
    .cw-win .av{display:flex;margin-bottom:10px}.cw-win .av .avatar{border:2px solid #fff;margin-right:-8px}
    .cw-win .b{padding:16px 18px;background:#f9fafb;flex:1}
    .cw-win .msg{background:#fff;border:1px solid var(--line-soft);border-radius:4px 14px 14px 14px;padding:10px 13px;font-size:14.5px;margin-bottom:12px;max-width:88%}
    .cw-win .me{margin-left:auto;border-radius:14px 4px 14px 14px;color:#fff;border:0}
    .cw-win .in{width:100%;height:40px;border:1px solid var(--line);border-radius:8px;padding:0 12px;margin-bottom:8px;font-size:14.5px;background:#fff;outline:none}
    .cw-win .send{width:100%;height:44px;border:0;border-radius:9px;color:#fff;font-weight:700;font-size:15px}
    .cw-win .ft{font-size:11.5px;color:var(--faint);text-align:center;padding:8px}
    .cw-bub{position:absolute;bottom:28px;height:62px;border-radius:999px;color:#fff;display:flex;align-items:center;gap:10px;padding:0 22px 0 18px;font-weight:700;font-size:16px;box-shadow:0 10px 26px rgba(16,24,40,.3);cursor:pointer;border:0}
    .cw-bub.round{width:62px;padding:0;justify-content:center}
    .cw-prompt{position:absolute;bottom:104px;width:290px;background:#fff;border-radius:14px;padding:14px 16px;box-shadow:0 12px 30px rgba(16,24,40,.2);font-size:14.5px}
    .qr svg{display:block}
.sv-big .lp-form label{font-size:21px;margin-bottom:14px;color:#101828}.sv-big .lp-form .opt{font-size:17px;border:1px solid #e4e7ec;border-radius:10px;padding:13px 14px;margin:8px 0}
    .bl-doc{background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:var(--shadow);padding:34px 48px;min-height:640px}
    .bl-doc .ttl{font-size:34px;font-weight:800;border:0;outline:none;width:100%;letter-spacing:-.01em;color:var(--ink)}
    .bl-doc .body{font-size:17.5px;line-height:1.7;outline:none;min-height:360px;color:#344054}
    .bl-doc .body h2{font-size:23px;margin:22px 0 8px;color:var(--ink)}
    .bl-tool{display:flex;gap:4px;border:1px solid var(--line);border-radius:8px;padding:5px;margin:18px 0 22px;align-items:center}
    .bl-tool span{min-width:34px;height:32px;display:grid;place-items:center;border-radius:6px;color:var(--ink-2);font-weight:700;font-size:14px}
    .dns td{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14.5px}
    @keyframes st-spin{to{transform:rotate(360deg)}}
    .st-spin{width:18px;height:18px;border:2.5px solid #d1e0ff;border-top-color:var(--blue);border-radius:50%;animation:st-spin .8s linear infinite;display:inline-block}
    `;
    document.head.appendChild(st);
  }

  // ---------------------------------------------------------------- page model
  let uid = 100;
  const nid = (p) => `${p}${uid++}`;
  const el = (type, props = {}, id) => ({ id: id || nid('e'), type, mt: 0, mb: 18, ...props });
  const col = (els, id) => ({ id: id || nid('c'), els });
  const row = (cols, id) => ({ id: id || nid('r'), cols });
  const sec = (id, props, rows) => ({ id: id || nid('s'), bg: '#ffffff', width: 'wide', pad: 64, ...props, rows });
  const clone = (o) => JSON.parse(JSON.stringify(o));

  const header = (s) => sec('header', { bg: '#ffffff', pad: 18, width: 'wide', name: 'Header' }, [row([col([el('nav', { logo: s.brand, phone: s.phone, menu: s.menu || null, accent: s.accent, mb: 0 }, 'nav')], 'c_nav')], 'r_nav')]);
  const footer = (s) => sec('footer', { bg: s.dark, pad: 30, name: 'Footer' }, [row([col([el('paragraph', { text: s.footer, size: 14, color: '#cbd5e1', align: 'center', mb: 0 }, 'footer')], 'c_footer')], 'r_footer')]);

  function makeLanding(s) {
    return {
      seo: { title: s.seoTitle || `${s.headline} | ${s.brand}`, desc: s.seoDesc || s.sub, author: s.brand, keywords: s.keywords || '', image: '' },
      sections: [
        header(s),
        sec('hero', { bg: s.heroBg, pad: 72, name: 'Hero' }, [row([
          col([
            el('headline', { text: s.headline, size: 54, weight: 800, color: s.ink, align: 'left', mb: 18 }, 'headline'),
            el('subheadline', { text: s.sub, size: 22, weight: 500, color: '#475467', align: 'left', mb: 22 }, 'subheadline'),
            el('bullets', { items: s.bullets, size: 17, color: s.ink, accent: s.accent, mb: 28 }, 'bullets'),
            el('button', { text: s.cta, sub: s.ctaSub, bg: s.accent, color: '#ffffff', radius: 10, align: 'left', action: 'scroll', target: 'Form section', mb: 0 }, 'cta'),
          ], 'c_hero_1'),
          col([el('image', { art: s.art, accent: s.accent, alt: s.alt, mb: 0 }, 'heroimg')], 'c_hero_2'),
        ], 'r_hero')]),
        sec('form', { bg: '#ffffff', pad: 64, width: 'small', name: 'Form section' }, [row([col([
          el('headline', { text: s.formTitle, size: 34, weight: 800, color: s.ink, align: 'center', mb: 10 }, 'formtitle'),
          el('paragraph', { text: s.formText, size: 17, color: '#475467', align: 'center', mb: 24 }, 'formtext'),
          el('form', { form: s.form || 'fm1', mb: 0 }, 'form'),
        ], 'c_form')], 'r_form')]),
        sec('features', { bg: s.soft, pad: 60, name: 'Benefits' }, [row(s.features.map((f, i) =>
          col([el('feature', { ...f, accent: s.accent, mb: 0 }, `feat${i + 1}`)], `c_feat${i + 1}`)), 'r_features')]),
        sec('review', { bg: '#ffffff', pad: 60, width: 'medium', name: 'Testimonial' }, [row([col([
          el('subheadline', { text: '★★★★★', size: 26, weight: 700, color: '#f59e0b', align: 'center', mb: 10 }, 'stars'),
          el('paragraph', { text: s.review.quote, size: 22, color: s.ink, align: 'center', italic: true, mb: 12 }, 'quote'),
          el('paragraph', { text: s.review.name, size: 15, weight: 700, color: '#667085', align: 'center', mb: 0 }, 'quotename'),
        ], 'c_review')], 'r_review')]),
        footer(s),
      ],
    };
  }

  function simplePage(s, body) {
    return {
      seo: { title: `${s.title} | ${s.brand}`, desc: s.text || '', author: s.brand, keywords: '', image: '' },
      sections: [header(s), sec('main', { bg: s.heroBg, pad: 64, width: 'medium', name: 'Main' }, [row([col([
        el('headline', { text: s.title, size: 42, weight: 800, color: s.ink, align: 'center', mb: 12 }, 'headline'),
        el('paragraph', { text: s.text, size: 18, color: '#475467', align: 'center', mb: 28 }, 'para'),
        ...body,
      ], 'c_main')], 'r_main')]), footer(s)],
    };
  }

  const BLOOM = {
    brand: 'Bloom Dental Studio', phone: '020 7946 0321', accent: '#0d9488', ink: '#14324a', heroBg: '#eef8f6', soft: '#f6fbfa', dark: '#14324a', art: 'aligner',
    headline: 'Straighter teeth, without the metal.',
    sub: 'Book your free Invisalign scan at our Marylebone studio, worth £150.',
    bullets: ['Free 3D iTero scan and smile preview', 'Treatment from £3,200, with 0% finance', 'Same-week appointments available'],
    cta: 'Claim My Free Scan', ctaSub: 'Takes 30 seconds', alt: 'Clear Invisalign aligner',
    formTitle: 'Get your free scan', formText: "Leave your details and we'll call you to choose a time.", form: 'fm1',
    features: [
      { icon: 'sparkle', title: 'See your new smile', text: 'Our 3D scan previews your results in minutes.' },
      { icon: 'smile', title: 'Comfortable & discreet', text: 'Clear aligners that nobody will notice.' },
      { icon: 'shield', title: 'Expert care', text: 'Led by our Invisalign-certified dentists.' },
    ],
    review: { quote: '“My Invisalign journey has been so easy with Bloom. Great communication throughout.”', name: 'Chloe Scott, Invisalign patient' },
    footer: '© 2026 Bloom Dental Studio · 14 Marylebone High Street, London W1U 4NS · Privacy policy',
    seoTitle: 'Free Invisalign Scan in Marylebone | Bloom Dental Studio',
    seoDesc: 'Book a free 3D Invisalign scan at Bloom Dental Studio in Marylebone. See your new smile in minutes. Treatment from £3,200 with 0% finance.',
    keywords: 'invisalign london, free invisalign scan, clear aligners marylebone',
  };
  const BLOOM_SITE = { ...BLOOM, menu: ['Home', 'Treatments', 'About', 'Contact'] };

  const bookingPage = (s, cal = 'k2') => simplePage({ ...s, title: 'Pick a time for your free scan', text: 'Choose a day and time that suits you. It takes about 30 minutes.' },
    [el('calendar', { calendar: cal, accent: s.accent, mb: 0 }, 'calendar')]);
  const thanksPage = (s, title = "You're booked in!") => simplePage({ ...s, title, text: "We've sent a confirmation by email and text. Here's a short video so you know what to expect." },
    [el('video', { url: 'https://youtu.be/bloom-welcome', caption: 'Meet the Bloom team (1:12)', mb: 0 }, 'video')]);

  const sp = (id, name, path, page, st) => ({ id, name, path, page, published: true, ab: null, ...st });
  const stat = (views, uniq, optins, ouniq) => ({ views, uniq, optins, ouniq });

  const WHITEN = { ...BLOOM, art: 'smile', accent: '#db2777', heroBg: '#fdf2f8', soft: '#fff7fb',
    headline: 'Professional whitening for £199.', sub: 'A brighter smile in one 60-minute visit. This month only.',
    bullets: ['Up to 8 shades whiter', 'Safe for sensitive teeth', 'Free take-home top-up kit'], cta: 'Book My Whitening', ctaSub: 'Limited October slots', alt: 'Bright white smile',
    formTitle: 'Reserve your £199 whitening', formText: "Leave your details and we'll confirm your slot." };
  const NEWPT = { ...BLOOM, art: 'team', accent: '#2563eb', heroBg: '#eff6ff', soft: '#f5f9ff',
    headline: 'New patients welcome in Marylebone.', sub: 'Exam, X-rays and hygiene clean for £90.',
    bullets: ['Evening & Saturday appointments', 'Gentle care for nervous patients', 'Register online in two minutes'], cta: 'Become a Patient', ctaSub: '', alt: 'The Bloom Dental team',
    formTitle: 'Register as a new patient', formText: 'Tell us a little about you and pick a time.', form: 'fm2' };

  const STEPS = {
    f1: { domain: 'bloomdental.co.uk', chat: 'Bloom Website Chat', pages: [
      sp('s1', 'Free Scan Opt-in', 'invisalign-free-scan', makeLanding(BLOOM), stat(4820, 3960, 412, 398)),
      sp('s2', 'Book Your Scan', 'book-scan', bookingPage(BLOOM), stat(398, 371, 171, 166)),
      sp('s3', 'Thank You', 'scan-booked', thanksPage(BLOOM), stat(171, 165, 0, 0)),
    ] },
    f2: { domain: 'bloomdental.co.uk', chat: 'Bloom Website Chat', pages: [
      sp('w1', 'Whitening Offer', 'whitening-offer', makeLanding(WHITEN), { ...stat(2310, 1955, 188, 181),
        ab: { split: 50, started: '29 Sep 2026', a: stat(1160, 980, 79, 76), b: stat(1150, 975, 109, 105),
          bPage: makeLanding({ ...WHITEN, headline: 'A whiter smile in one hour, for £199.' }) } }),
      sp('w2', 'Thank You', 'whitening-booked', thanksPage(WHITEN, "You're all set!"), stat(188, 181, 0, 0)),
    ] },
    f3: { domain: 'bloomdental.co.uk', chat: 'Bloom Website Chat', pages: [
      sp('n1', 'New Patient Offer', 'new-patients', makeLanding(NEWPT), stat(1590, 1310, 143, 137)),
      sp('n2', 'Registration', 'register', simplePage({ ...NEWPT, title: 'Complete your registration', text: 'This saves time at your first visit.' }, [el('form', { form: 'fm2', mb: 0 }, 'form')]), stat(143, 139, 96, 94)),
      sp('n3', 'Welcome', 'welcome', thanksPage(NEWPT, 'Welcome to Bloom!'), stat(96, 94, 0, 0)),
    ] },
  };
  D.funnels.forEach((f) => Object.assign(f, { kind: 'funnel', path: '', favicon: '', head: '', body: '', payment: 'Live' }, STEPS[f.id] || {}));

  const sitePage = (title, text) => simplePage({ ...BLOOM_SITE, title, text }, [el('button', { text: 'Book an Appointment', sub: '', bg: BLOOM.accent, color: '#fff', radius: 10, align: 'center', action: 'url', target: 'bloomdental.co.uk/book', mb: 0 }, 'cta')]);
  const home = makeLanding({ ...BLOOM_SITE, art: 'team', headline: 'Modern dentistry in the heart of Marylebone.', sub: 'Check-ups, whitening, Invisalign and implants, with evening and Saturday appointments.',
    bullets: ['Rated 4.9 stars by 300+ patients', 'NHS and private care', 'Interest-free finance on treatments'], cta: 'Book an Appointment', ctaSub: '', alt: 'The Bloom Dental team',
    formTitle: 'Request an appointment', formText: "We'll get back to you within one working day.", form: 'fm3', seoTitle: 'Dentist in Marylebone, London | Bloom Dental Studio' });
  const WEBSITES = [{
    id: 'ws1', kind: 'website', name: 'Bloom Dental Website', domain: 'bloomdental.co.uk', updated: '5 days ago', chat: 'Bloom Website Chat', path: '', favicon: '', head: '', body: '', payment: 'Live',
    pages: [
      sp('home', 'Home', '', home, stat(9840, 7310, 286, 271)),
      sp('invisalign', 'Invisalign', 'invisalign', sitePage('Invisalign clear aligners', 'Straighten your teeth discreetly, from £3,200 with 0% finance.'), stat(2210, 1890, 64, 61)),
      sp('whitening', 'Teeth Whitening', 'teeth-whitening', sitePage('Professional teeth whitening', 'Safe, dentist-led whitening from £199.'), stat(1430, 1210, 31, 30)),
      sp('implants', 'Dental Implants', 'dental-implants', sitePage('Dental implants', 'Permanent, natural-looking replacements for missing teeth.'), stat(980, 840, 22, 22)),
      sp('about', 'About Us', 'about', sitePage('Meet the Bloom team', 'A friendly, modern practice on Marylebone High Street since 2012.'), stat(1120, 990, 0, 0)),
      sp('contact', 'Contact', 'contact', simplePage({ ...BLOOM_SITE, title: 'Contact us', text: '14 Marylebone High Street, London W1U 4NS · 020 7946 0321' }, [el('form', { form: 'fm3', mb: 0 }, 'form')]), stat(1640, 1420, 96, 92)),
    ],
  }];
  D.websites = WEBSITES;

  // ---------------------------------------------------------------- forms & surveys data
  const fld = (key, type, label, ph = '', extra = {}) => ({ key, type, label, ph, req: false, hidden: false, qkey: key, ...extra });
  const FORM_DEFS = {
    fm1: { fields: [
      fld('first_name', 'text', 'First Name', 'First name', { req: true }),
      fld('phone', 'phone', 'Phone', '+44 7700 900000', { req: true }),
      fld('email', 'email', 'Email', 'you@example.com', { req: true }),
      fld('treatment', 'dropdown', 'Which treatment are you interested in?', 'Select an option', { custom: true, options: ['Invisalign', 'Teeth whitening', 'Dental implants', 'Check-up'] }),
      fld('terms', 'terms', 'I agree to receive texts and emails from Bloom Dental Studio about my enquiry. Reply STOP to opt out.'),
      fld('submit', 'submit', 'Claim My Free Scan'),
    ] },
    fm2: { fields: [
      fld('first_name', 'text', 'First Name', 'First name', { req: true }), fld('last_name', 'text', 'Last Name', 'Last name', { req: true }),
      fld('dob', 'date', 'Date of Birth', 'DD/MM/YYYY'), fld('phone', 'phone', 'Phone', '+44 7700 900000', { req: true }),
      fld('email', 'email', 'Email', 'you@example.com', { req: true }), fld('address', 'text', 'Address', 'Street address'),
      fld('heard', 'dropdown', 'How did you hear about us?', 'Select an option', { custom: true, options: ['Google', 'Facebook or Instagram', 'Friend or family', 'Walked past'] }),
      fld('submit', 'submit', 'Register'),
    ] },
    fm3: { fields: [
      fld('full_name', 'text', 'Full Name', 'Full name', { req: true }), fld('email', 'email', 'Email', 'you@example.com', { req: true }),
      fld('phone', 'phone', 'Phone', '+44 7700 900000'), fld('message', 'textarea', 'Message', 'How can we help?'),
      fld('submit', 'submit', 'Send Message'),
    ] },
  };
  D.forms.forEach((f) => Object.assign(f, {
    style: { btn: '#0d9488', bg: '#ffffff', width: 560, labels: true },
    opts: { onSubmit: 'message', message: "Thanks! We'll call you within one working day to book your scan.", url: 'https://bloomdental.co.uk/thank-you', notify: true, sticky: true, logic: [] },
    ...clone(FORM_DEFS[f.id] || FORM_DEFS.fm3),
  }));
  const formById = (id) => D.forms.find((f) => f.id === id) || D.forms[0];

  const SURVEYS = [{ id: 'sv1', name: 'Smile Assessment Quiz', submissions: 164, updated: '6 days ago', progress: true, autoNav: true, slides: [
    { name: 'Your goal', fields: [fld('goal', 'radio', 'What would you most like to improve?', '', { custom: true, options: ['Straighter teeth', 'Whiter teeth', 'Replace a missing tooth', 'Just a check-up'] })], logic: 'Just a check-up → jump to Slide 3 (skip timing)' },
    { name: 'Timing', fields: [fld('when', 'radio', 'How soon would you like to start?', '', { custom: true, options: ['As soon as possible', 'In the next 3 months', 'Just researching'] })], logic: 'Just researching → disqualify (show nurture message)' },
    { name: 'Your details', fields: [fld('first_name', 'text', 'First Name', 'First name', { req: true }), fld('phone', 'phone', 'Phone', '+44 7700 900000', { req: true }), fld('email', 'email', 'Email', 'you@example.com', { req: true }), fld('submit', 'submit', 'See My Results')] },
  ] }];
  D.surveys = SURVEYS;

  // ---------------------------------------------------------------- templates library
  const tplSpec = (o) => ({ ...BLOOM, brand: 'Your Practice', phone: '000 0000 0000', footer: '© 2026 Your Business · Your address · Privacy policy',
    review: { quote: '“The team were wonderful from start to finish. I would recommend them to anyone.”', name: 'Happy customer' }, seoTitle: '', seoDesc: '', keywords: '', ...o });
  const TEMPLATES = [
    { id: 't1', cat: 'Dental & Health', name: 'Dental — Free Consultation', steps: ['Opt-in', 'Booking', 'Thank You'], spec: tplSpec({ art: 'smile', accent: '#0891b2', heroBg: '#ecfeff', soft: '#f5feff', headline: 'Book your free dental consultation', sub: 'Meet our friendly team and get a personalised treatment plan.', bullets: ['No-obligation consultation', 'Flexible payment plans', 'Evening and weekend appointments'], cta: 'Book My Free Consultation', ctaSub: 'Limited spaces each week', formTitle: 'Claim your free consultation', formText: "Leave your details and we'll be in touch.", features: [{ icon: 'smile', title: 'Gentle care', text: 'Relaxed, nervous-patient friendly visits.' }, { icon: 'calendar', title: 'Easy booking', text: 'Pick a time online in seconds.' }, { icon: 'star', title: 'Five-star rated', text: 'Hundreds of happy patients.' }] }) },
    { id: 't2', cat: 'Dental & Health', name: 'Dental — Whitening Offer', steps: ['Offer', 'Thank You'], spec: tplSpec({ art: 'smile', accent: '#db2777', heroBg: '#fdf2f8', soft: '#fff7fb', headline: 'A brighter smile, in one visit', sub: 'Professional whitening at a special introductory price.', bullets: ['Dentist-led and safe', 'Visible results in one hour', 'Take-home kit included'], cta: 'Claim the Offer', ctaSub: '', formTitle: 'Reserve your slot', formText: "We'll confirm by text.", features: [{ icon: 'sparkle', title: 'Up to 8 shades', text: 'Noticeably whiter teeth.' }, { icon: 'shield', title: 'Safe', text: 'Gentle on sensitive teeth.' }, { icon: 'clock', title: 'Quick', text: 'One 60-minute visit.' }] }) },
    { id: 't3', cat: 'Dental & Health', name: 'Clinic — New Patient Special', steps: ['Offer', 'Registration', 'Welcome'], spec: tplSpec({ art: 'team', accent: '#2563eb', heroBg: '#eff6ff', soft: '#f5f9ff', headline: 'New patients welcome', sub: 'Your first exam and clean at a special price.', bullets: ['Same-week appointments', 'Friendly, modern clinic', 'Register online in minutes'], cta: 'Register Now', ctaSub: '', formTitle: 'Register today', formText: 'It only takes two minutes.', features: [{ icon: 'users', title: 'Whole family', text: 'Care for all ages.' }, { icon: 'clock', title: 'Late opening', text: 'Evenings and Saturdays.' }, { icon: 'heart', title: 'Gentle', text: 'Nervous patients welcome.' }] }) },
    { id: 't4', cat: 'Local Business', name: 'Local Business — Quote Request', steps: ['Quote Form', 'Thank You'], spec: tplSpec({ art: 'clinic', accent: '#ea580c', heroBg: '#fff7ed', soft: '#fffaf5', headline: 'Get a free, no-pressure quote', sub: 'Trusted local experts. Fast response, fair prices.', bullets: ['Reply within one hour', 'Fully insured', 'Five-star local reviews'], cta: 'Get My Free Quote', ctaSub: '', formTitle: 'Request your quote', formText: 'Tell us what you need.', features: [{ icon: 'clock', title: 'Fast', text: 'Quotes the same day.' }, { icon: 'shield', title: 'Insured', text: 'Peace of mind, guaranteed.' }, { icon: 'star', title: 'Rated 4.9', text: 'By local customers.' }] }) },
    { id: 't5', cat: 'Local Business', name: 'Local Business — Book a Service', steps: ['Landing', 'Booking', 'Confirmation'], spec: tplSpec({ art: 'clinic', accent: '#16a34a', heroBg: '#f0fdf4', soft: '#f7fef9', headline: 'Book your appointment online', sub: 'Choose a time that suits you, in under a minute.', bullets: ['Instant confirmation', 'Text reminders', 'Easy rescheduling'], cta: 'Book Now', ctaSub: '', formTitle: 'Tell us about you', formText: "We'll take you to the calendar next.", features: [{ icon: 'calendar', title: 'Real-time slots', text: 'Always up to date.' }, { icon: 'sms', title: 'Reminders', text: 'Never miss a visit.' }, { icon: 'heart', title: 'Local', text: 'Family run since 2010.' }] }) },
    { id: 't6', cat: 'Lead Generation', name: 'Lead Magnet — Free Guide', steps: ['Opt-in', 'Download'], spec: tplSpec({ art: 'guide', accent: '#7c3aed', heroBg: '#f5f3ff', soft: '#faf8ff', headline: 'Download our free guide', sub: 'Everything you need to know before you choose.', bullets: ['Straight answers to common questions', 'Real prices explained', 'Read in ten minutes'], cta: 'Send Me the Guide', ctaSub: '', formTitle: 'Where should we send it?', formText: 'Instant download, no spam.', features: [{ icon: 'book', title: '12 pages', text: 'Clear and practical.' }, { icon: 'check', title: 'Checklists', text: 'Ready to use.' }, { icon: 'mail', title: 'Instant', text: 'Straight to your inbox.' }] }) },
  ];

  function pagesFromTemplate(t) {
    const s = t.spec;
    const paths = { 'Opt-in': 'free-consultation', Offer: 'offer', Booking: 'book', 'Thank You': 'thank-you', Registration: 'register', Welcome: 'welcome', 'Quote Form': 'quote', Landing: 'home', Confirmation: 'confirmed', Download: 'download' };
    return t.steps.map((name, i) => sp(nid('s'), name, paths[name] || name.toLowerCase(),
      i === 0 ? makeLanding(s) : name === 'Booking' ? bookingPage(s, 'k1') : name === 'Registration' ? simplePage({ ...s, title: 'Complete your registration', text: '' }, [el('form', { form: 'fm2', mb: 0 }, 'form')]) : thanksPage(s, 'Thank you!'),
      { ...stat(0, 0, 0, 0), published: false }));
  }

  // ---------------------------------------------------------------- illustrations (inline SVG, no network)
  function art(kind, accent = '#0d9488') {
    const tint = (a) => `${accent}${a}`;
    if (kind === 'aligner' || kind === 'smile') {
      const teeth = [];
      for (let i = 0; i < 12; i++) {
        const t = (i + 0.5) / 12, ang = Math.PI * (1 - t);
        const x = 260 + Math.cos(ang) * 150, y = 236 - Math.sin(ang) * 112;
        const w = i === 0 || i === 11 ? 30 : i < 3 || i > 8 ? 34 : 38;
        teeth.push(`<rect x="${x - w / 2}" y="${y - 24}" width="${w}" height="46" rx="13" transform="rotate(${(t - 0.5) * 150} ${x} ${y})" fill="#fff" stroke="${tint('55')}" stroke-width="2"/>`);
      }
      const tray = kind === 'aligner' ? `<path d="M110 236 A150 112 0 0 1 410 236" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="64" stroke-linecap="round"/>` : '';
      return `<svg viewBox="0 0 520 400" width="100%" style="display:block;border-radius:22px">
        <defs><linearGradient id="ag${kind}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tint('22')}"/><stop offset="1" stop-color="${tint('66')}"/></linearGradient></defs>
        <rect width="520" height="400" rx="22" fill="url(#ag${kind})"/>
        <circle cx="430" cy="70" r="110" fill="#fff" opacity=".22"/><circle cx="70" cy="360" r="90" fill="#fff" opacity=".18"/>
        ${tray}${teeth.join('')}
        <path d="M150 300 Q260 352 370 300" fill="none" stroke="${tint('aa')}" stroke-width="6" stroke-linecap="round"/>
        <g fill="#fff"><path d="M420 150l7 18 18 7-18 7-7 18-7-18-18-7 18-7z"/><path d="M96 110l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/></g>
        <rect x="300" y="318" width="190" height="52" rx="26" fill="#fff"/><circle cx="328" cy="344" r="12" fill="${accent}"/>
        <text x="350" y="350" font-family="Inter,system-ui" font-size="17" font-weight="700" fill="#14324a">${kind === 'aligner' ? 'Free 3D scan' : 'Brighter smile'}</text></svg>`;
    }
    if (kind === 'team' || kind === 'clinic') {
      const people = kind === 'team' ? [['#f4c7a1', '#14324a', 150], ['#c68b5e', accent, 260], ['#e8b48f', '#7c3aed', 370]] : [['#e8b48f', accent, 260]];
      return `<svg viewBox="0 0 520 400" width="100%" style="display:block;border-radius:22px">
        <rect width="520" height="400" rx="22" fill="${tint('26')}"/><circle cx="440" cy="60" r="100" fill="#fff" opacity=".25"/>
        <rect x="40" y="300" width="440" height="100" fill="#fff" opacity=".5"/>
        ${people.map(([skin, top, x]) => `<g><rect x="${x - 58}" y="230" width="116" height="140" rx="50" fill="${top}"/><circle cx="${x}" cy="180" r="48" fill="${skin}"/>
          <path d="M${x - 50} 170 Q${x} 110 ${x + 50} 170 Q${x + 40} 140 ${x} 138 Q${x - 40} 140 ${x - 50} 170z" fill="#3b2a20"/>
          <path d="M${x - 16} 196 Q${x} 210 ${x + 16} 196" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`).join('')}
        <rect x="300" y="26" width="190" height="52" rx="26" fill="#fff"/><text x="322" y="58" font-family="Inter,system-ui" font-size="17" font-weight="700" fill="#14324a">★ 4.9 · 300+ reviews</text></svg>`;
    }
    if (kind === 'guide') {
      return `<svg viewBox="0 0 520 400" width="100%" style="display:block;border-radius:22px"><rect width="520" height="400" rx="22" fill="${tint('22')}"/>
        <rect x="160" y="50" width="210" height="290" rx="12" fill="${accent}" transform="rotate(-6 265 195)"/><rect x="170" y="56" width="200" height="290" rx="12" fill="#fff"/>
        <rect x="196" y="96" width="150" height="16" rx="8" fill="${accent}"/><rect x="196" y="126" width="120" height="10" rx="5" fill="#d0d5dd"/>
        ${[0, 1, 2, 3, 4].map((i) => `<rect x="196" y="${170 + i * 26}" width="${150 - i * 12}" height="9" rx="4.5" fill="#e4e7ec"/>`).join('')}</svg>`;
    }
    return `<svg viewBox="0 0 520 400" width="100%" style="display:block;border-radius:22px"><rect width="520" height="400" rx="22" fill="${tint('22')}"/>
      <path d="M60 330l120-130 90 90 70-60 120 100z" fill="${tint('77')}"/><circle cx="380" cy="120" r="40" fill="#fff" opacity=".7"/></svg>`;
  }

  // ---------------------------------------------------------------- page renderer
  const LABEL = { headline: 'Headline', subheadline: 'Sub-Headline', paragraph: 'Paragraph', bullets: 'Bullet List', image: 'Image', video: 'Video', feature: 'Image Feature', button: 'Button', form: 'Form', survey: 'Survey', calendar: 'Calendar', divider: 'Divider', countdown: 'Countdown Timer', faq: 'FAQ', nav: 'Navigation Menu' };
  const msz = (e, mob, def) => (mob ? e.msize || Math.round((e.size || def) * ((e.size || def) > 30 ? 0.6 : 0.92)) : e.size || def);

  function formHtml(fm, compact) {
    const F = formById(fm);
    return `<div class="lp-form" style="background:${F.style.bg}">${F.fields.filter((f) => !f.hidden).map((f) => fieldHtml(f, F)).join('')}</div>`;
  }
  function fieldHtml(f, F) {
    if (f.type === 'submit') return `<div class="sub" style="background:${F.style.btn}">${esc(f.label)}</div>`;
    if (f.type === 'terms') return `<div class="f terms"><i style="width:18px;height:18px;border:1.5px solid #98a2b3;border-radius:4px;flex:none"></i><span>${esc(f.label)}</span></div>`;
    if (f.type === 'html') return `<div class="f" style="font-size:14px;color:#667085">${esc(f.label)}</div>`;
    if (f.type === 'captcha') return `<div class="f"><div class="in" style="width:300px;justify-content:space-between"><span class="row" style="gap:10px;color:#344054"><i style="width:22px;height:22px;border:2px solid #98a2b3;border-radius:3px"></i>I'm not a robot</span><small>reCAPTCHA</small></div></div>`;
    const lab = F.style.labels ? `<label>${esc(f.label)}${f.req ? '<span style="color:#f04438"> *</span>' : ''}</label>` : '';
    if (f.type === 'radio' || f.type === 'checkbox') return `<div class="f">${lab}${(f.options || ['Option 1', 'Option 2']).map((o) => `<div class="opt"><i class="${f.type === 'checkbox' ? 'sq' : ''}"></i>${esc(o)}</div>`).join('')}</div>`;
    if (f.type === 'dropdown') return `<div class="f">${lab}<div class="in" style="justify-content:space-between">${esc(f.ph || 'Select an option')}${icon('chevron', 18)}</div></div>`;
    if (f.type === 'textarea') return `<div class="f">${lab}<div class="in ta">${esc(f.ph)}</div></div>`;
    if (f.type === 'file') return `<div class="f">${lab}<div class="in ta" style="justify-content:center;align-items:center;border-style:dashed">${icon('upload', 18)}&nbsp;Drop a file or browse</div></div>`;
    if (f.type === 'signature') return `<div class="f">${lab}<div class="in ta" style="height:96px"></div></div>`;
    return `<div class="f">${lab}<div class="in">${esc(f.ph)}</div></div>`;
  }

  function elInner(e, mob, edit) {
    const ed = (k = 'text') => (edit ? ` data-edit="${k}"` : '');
    const txt = (tag, def) => `<${tag}${ed()} style="font-size:${msz(e, mob, def)}px;font-weight:${e.weight || 400};color:${e.color || '#14324a'};text-align:${e.align || 'left'};line-height:${tag === 'h1' ? 1.1 : 1.5};${tag === 'h1' ? 'letter-spacing:-.02em;' : ''}${e.italic ? 'font-style:italic;' : ''}">${esc(e.text)}</${tag}>`;
    switch (e.type) {
      case 'headline': return txt('h1', 48);
      case 'subheadline': return txt('h2', 22);
      case 'paragraph': return txt('p', 17);
      case 'bullets': return `<ul class="lp-bul" style="padding:0;font-size:${msz(e, mob, 17)}px;color:${e.color || '#14324a'};font-weight:500">${e.items.map((it, i) => `<li><i style="background:${e.accent || '#0d9488'}">${icon('check', 14)}</i><span${ed('item:' + i)}>${esc(it)}</span></li>`).join('')}</ul>`;
      case 'button': return `<div style="text-align:${mob ? 'center' : e.align || 'left'}"><a class="lp-btn" style="background:${e.bg};color:${e.color};border-radius:${e.radius ?? 10}px;${mob ? 'width:100%;' : ''}box-shadow:0 8px 20px ${e.bg}44"><span${ed()}>${esc(e.text)}</span>${e.sub ? `<small>${esc(e.sub)}</small>` : ''}</a></div>`;
      case 'image': return art(e.art, e.accent);
      case 'video': return `<div class="lp-vid"><div class="pl">${icon('play', 30)}</div><small>${esc(e.caption || 'Video')}</small></div>`;
      case 'feature': return `<div class="lp-feat"><div class="ic" style="background:${e.accent}1f;color:${e.accent}">${icon(e.icon || 'star', 28)}</div>
        <div${ed('title')} style="font-weight:800;font-size:${mob ? 19 : 20}px;margin-bottom:6px">${esc(e.title)}</div><div style="color:#475467;font-size:16px">${esc(e.text)}</div></div>`;
      case 'form': return formHtml(e.form);
      case 'survey': return `<div class="lp-form"><div style="height:6px;border-radius:3px;background:#e4e7ec;margin-bottom:18px"><div style="width:33%;height:100%;border-radius:3px;background:#0d9488"></div></div>
        <label style="font-size:18px;margin-bottom:12px">What would you most like to improve?</label>${['Straighter teeth', 'Whiter teeth', 'Replace a missing tooth'].map((o) => `<div class="opt" style="border:1px solid #e4e7ec;border-radius:8px;padding:10px 12px"><i></i>${o}</div>`).join('')}</div>`;
      case 'calendar': {
        const k = D.calendars.find((c) => c.id === e.calendar) || D.calendars[1];
        const a = e.accent || '#0d9488';
        return `<div class="lp-cal"><div class="l"><div style="font-size:13px;font-weight:700;color:#667085;text-transform:uppercase;letter-spacing:.05em">${esc(BIZ.name)}</div>
          <div style="font-size:21px;font-weight:800;margin:6px 0 10px">${esc(k.name)}</div><div class="row" style="gap:8px;color:#475467;font-size:15px">${icon('clock', 18)} ${k.duration} minutes</div>
          <div class="row" style="gap:8px;color:#475467;font-size:15px;margin-top:6px">${icon('pin', 18)} Marylebone High Street</div></div>
          <div class="r"><b>Select a date &amp; time</b><div class="days">${D.week.map((d, i) => `<div style="${i === 2 ? `border-color:${a};background:${a}12` : ''}">${d.split(' ')[0]}<b style="${i === 2 ? `color:${a}` : ''}">${d.split(' ')[1]}</b></div>`).join('')}</div>
          <div class="slots">${['09:00', '09:30', '10:30', '11:00', '14:00', '15:30'].map((t) => `<div style="border-color:${a}66;color:${a}">${t}</div>`).join('')}</div></div></div>`;
      }
      case 'divider': return `<div style="border-top:2px solid #e4e7ec;margin:8px 0"></div>`;
      case 'countdown': return `<div class="lp-cd">${[['06', 'Days'], ['14', 'Hours'], ['32', 'Minutes'], ['09', 'Seconds']].map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`).join('')}</div>`;
      case 'faq': return `<div class="lp-faq">${['Is the scan really free?', 'Does Invisalign hurt?', 'How long does treatment take?'].map((q) => `<div>${q}<span>+</span></div>`).join('')}</div>`;
      case 'nav': return `<div class="lp-nav"><div class="logo" style="color:#14324a"><span style="width:38px;height:38px;border-radius:11px;background:${e.accent};color:#fff;display:grid;place-items:center">${icon('tooth', 22)}</span><span${ed('logo')}>${esc(e.logo)}</span></div>
        ${e.menu ? `<div class="lp-menu">${e.menu.map((m) => `<span>${esc(m)}</span>`).join('')}</div>` : ''}<div class="ph" style="background:${e.accent}14;color:${e.accent}">${icon('phone', 16)}<span>${esc(e.phone)}</span></div></div>`;
      default: return '';
    }
  }

  // renderPage(page, { edit, mob, sel }) — edit adds ids/data attributes for the builder.
  function renderPage(page, { edit = false, mob = false, sel = null } = {}) {
    const isSel = (type, id) => sel && sel.type === type && sel.id === id;
    const tag = (type, label, cls = '') => (edit ? `<div class="pb-tag ${cls}">${label}${type === 'el' ? `<button id="pb_tb_up" title="Move up">${icon('up', 15)}</button><button id="pb_tb_down" title="Move down">${icon('down', 15)}</button><button id="pb_tb_dup" title="Duplicate">${icon('copy', 15)}</button><button id="pb_tb_del" title="Delete">${icon('trash', 15)}</button>` : `<button id="pb_tb_${type}_del" title="Delete">${icon('trash', 15)}</button>`}</div>` : '');
    const hid = (o) => (mob ? o.hideMob : o.hideDesk);
    return `<div class="lp ${mob ? 'mob' : ''}">${page.sections.map((s) => {
      if (hid(s) && !edit) return '';
      return `<section class="lp-sec w-${s.width} ${isSel('sec', s.id) ? 'sel' : ''} ${hid(s) ? 'pb-hid' : ''}" style="background:${s.bg};--pad:${s.pad}px" ${edit ? `id="pb_${s.id}" data-sec="${s.id}"` : ''}>
        ${isSel('sec', s.id) ? tag('sec', `${icon('section', 14)}&nbsp;Section · ${esc(s.name || 'Section')}`, 'sec') : ''}
        ${s.rows.map((r) => `<div class="lp-row ${isSel('row', r.id) ? 'sel' : ''}" ${edit ? `id="pb_${r.id}" data-row="${r.id}"` : ''}>
          ${isSel('row', r.id) ? tag('row', `Row · ${r.cols.length} column${r.cols.length > 1 ? 's' : ''}`, 'row') : ''}
          ${r.cols.map((c) => `<div class="lp-col ${isSel('col', c.id) ? 'sel' : ''}" ${edit ? `id="pb_${c.id}" data-col="${c.id}"` : ''}>
            ${isSel('col', c.id) ? tag('col', 'Column', 'col') : ''}
            ${c.els.length ? c.els.map((e) => {
              if (hid(e) && !edit) return '';
              return `<div class="lp-el ${isSel('el', e.id) ? 'sel' : ''} ${hid(e) ? 'pb-hid' : ''}" style="margin:${e.mt || 0}px 0 ${mob ? Math.round((e.mb ?? 18) * 0.8) : e.mb ?? 18}px" ${edit ? `id="pb_el_${e.id}" data-el="${e.id}"` : ''}>
                ${isSel('el', e.id) ? tag('el', LABEL[e.type] || e.type) : ''}${hid(e) ? `<span class="pb-hidbadge">Hidden on ${mob ? 'mobile' : 'desktop'}</span>` : ''}${elInner(e, mob, edit)}</div>`;
            }).join('') : edit ? `<div class="pb-empty">${icon('plus', 18)} Add or drop an element here</div>` : ''}
          </div>`).join('')}</div>`).join('')}
      </section>`;
    }).join('')}</div>`;
  }

  // Scaled, non-interactive preview of a page (step thumbnails, templates).
  const thumb = (page, id = '') => `<div class="st-thumb" ${id ? `id="${id}"` : ''}>${renderPage(page)}</div>`;
  function fitThumbs(root = document) {
    $$('.st-thumb', root).forEach((t) => { const lp = t.firstElementChild; if (lp) lp.style.transform = `scale(${t.clientWidth / 1180})`; });
  }

  // ---------------------------------------------------------------- shared bits
  const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)}%` : '0%');
  const num = (n) => Number(n).toLocaleString('en-GB');
  const urlOf = (owner, step) => `${owner.domain}/${step.path}`.replace(/\/$/, '');
  const ownerOf = (kind, id) => (kind === 'website' ? WEBSITES : D.funnels).find((f) => f.id === id);
  const base = (kind) => (kind === 'website' ? '#/sites/websites' : '#/sites/funnels');
  const toggle = (id, on, label) => `<div class="row" style="margin:10px 0"><button class="toggle ${on ? 'on' : ''}" id="${id}"></button><span>${label}</span></div>`;
  const pageHead = (title, actions = '', sub = '') => `<div class="page-head"><h1>${title}</h1>${sub}<div class="actions">${actions}</div></div>`;

  // ---------------------------------------------------------------- funnels & websites list
  function listView(view, kind) {
    const isWeb = kind === 'website';
    const items = isWeb ? WEBSITES : D.funnels;
    view.innerHTML = `
      ${pageHead(isWeb ? 'Websites' : 'Funnels', `
        <button class="btn" id="fn_folder">${icon('folder', 18)} Create Folder</button>
        <button class="btn primary" id="fn_new">${icon('plus', 18)} New ${isWeb ? 'Website' : 'Funnel'}</button>`,
        `<span class="sub">${isWeb ? 'Multi-page sites with navigation, for people browsing your business.' : 'Step-by-step pages that guide visitors to one action.'}</span>`)}
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          <div class="search" style="width:340px"><span>${icon('search', 18)}</span><input class="input" id="fn_search" placeholder="Search ${isWeb ? 'websites' : 'funnels'}"></div>
          <span class="spacer"></span><span class="muted" style="font-size:14px">${items.length} ${isWeb ? 'website' : 'funnel'}${items.length === 1 ? '' : 's'}</span>
        </div>
        <table class="t" id="fn_table"><thead><tr><th>Name</th><th>${isWeb ? 'Pages' : 'Steps'}</th><th>Domain</th><th>Last updated</th><th style="width:60px"></th></tr></thead>
        <tbody>${items.map((f) => `<tr class="click" id="fn_row_${f.id}" data-id="${f.id}">
          <td><div class="row"><span style="width:38px;height:38px;border-radius:9px;background:var(--blue-soft);color:var(--blue);display:grid;place-items:center">${icon(isWeb ? 'globe' : 'layers', 20)}</span><span class="bold">${esc(f.name)}</span></div></td>
          <td>${f.pages.length} ${isWeb ? 'pages' : 'steps'}</td><td class="muted">${esc(f.domain || '—')}</td><td class="muted">${esc(f.updated)}</td>
          <td><button class="btn ghost icon sm" data-more="${f.id}">${icon('more', 18)}</button></td></tr>`).join('')}</tbody></table>
      </div>`;
    $$('tr.click', view).forEach((tr) => (tr.onclick = (e) => { if (!e.target.closest('[data-more]')) KY.go(`${base(kind)}/${tr.dataset.id}`); }));
    $$('[data-more]', view).forEach((b) => (b.onclick = () => KY.menu(b, [{ label: 'Clone', icon: 'copy', onClick: () => KY.toast('Copy created') }, { label: 'Move to folder', icon: 'folder' }, { label: 'Share', icon: 'link', onClick: () => KY.toast('Share link copied') }, { label: 'Delete', icon: 'trash' }])));
    $('#fn_search').oninput = (e) => $$('tr.click', view).forEach((tr) => (tr.style.display = tr.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? '' : 'none'));
    $('#fn_folder').onclick = () => KY.modal({ title: 'Create folder', body: '<div class="field"><label>Folder name</label><input class="input" placeholder="e.g. Seasonal offers"></div>', actions: [{ label: 'Cancel' }, { label: 'Create', primary: true, onClick: (c) => { c(); KY.toast('Folder created'); } }] });
    $('#fn_new').onclick = () => newFunnel(kind);
  }

  function newFunnel(kind) {
    const isWeb = kind === 'website';
    const box = KY.modal({
      title: `New ${isWeb ? 'website' : 'funnel'}`, wide: true,
      body: `<p class="muted" style="margin:0 0 16px">How would you like to start?</p>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);gap:14px">
          <div class="st-pick" id="fn_new_blank">${icon('plus', 26)}<div class="bold" style="margin:10px 0 4px">From Blank</div><div class="muted" style="font-size:14px">Start with an empty ${isWeb ? 'page' : 'step'} and build it yourself.</div></div>
          <div class="st-pick" id="fn_new_template">${icon('layers', 26)}<div class="bold" style="margin:10px 0 4px">From Template</div><div class="muted" style="font-size:14px">Pick a ready-made design from the templates library.</div></div>
          <div class="st-pick" id="fn_new_ai">${icon('ai', 26)}<div class="bold" style="margin:10px 0 4px">Build with AI <span class="chip purple" style="height:22px">Usage-based</span></div><div class="muted" style="font-size:14px">Describe your business and let Funnels AI draft it.</div></div>
        </div>`,
    });
    $('#fn_new_template', box).onclick = () => { box.closest('.overlay').remove(); templateLibrary(kind); };
    $('#fn_new_blank', box).onclick = () => { box.closest('.overlay').remove(); nameFunnel(kind, null); };
    $('#fn_new_ai', box).onclick = () => KY.toast('Funnels AI is billed per funnel generated', 'warn');
  }

  function nameFunnel(kind, tpl) {
    const isWeb = kind === 'website';
    KY.modal({
      title: tpl ? `Use template: ${tpl.name}` : `Name your ${isWeb ? 'website' : 'funnel'}`,
      body: `${tpl ? `<div class="row" style="gap:14px;margin-bottom:16px;align-items:flex-start"><div style="width:220px">${thumb(makeLanding(tpl.spec))}</div><div><div class="bold">${esc(tpl.name)}</div><div class="muted" style="font-size:14px;margin:4px 0 8px">${tpl.steps.length} steps</div>${tpl.steps.map((s, i) => `<div class="row" style="font-size:14px;gap:8px;margin:4px 0"><span class="chip">${i + 1}</span>${esc(s)}</div>`).join('')}</div></div>` : ''}
        <div class="field"><label>${isWeb ? 'Website' : 'Funnel'} name</label><input class="input" id="fn_name" placeholder="e.g. Dental Implants Consultation"></div>`,
      actions: [{ label: 'Cancel' }, { label: `Create ${isWeb ? 'Website' : 'Funnel'}`, primary: true, id: 'fn_create', onClick: (close, box) => {
        const name = $('#fn_name', box).value.trim() || (tpl ? tpl.name : 'Untitled Funnel');
        const pages = tpl ? pagesFromTemplate(tpl) : [sp(nid('s'), 'Step 1', 'step-1', { seo: { title: name, desc: '', author: BIZ.name, keywords: '', image: '' }, sections: [header(BLOOM), sec(null, { name: 'Section', pad: 64 }, [row([col([])])]), footer(BLOOM)] }, { ...stat(0, 0, 0, 0), published: false })];
        const f = { id: 'f' + (D.funnels.length + WEBSITES.length + 1), kind, name, steps: pages.length, views: 0, optins: 0, updated: 'Just now', domain: 'bloomdental.co.uk', chat: 'Bloom Website Chat', path: '', favicon: '', head: '', body: '', payment: 'Live', pages };
        (isWeb ? WEBSITES : D.funnels).unshift(f);
        close(); KY.toast(`${isWeb ? 'Website' : 'Funnel'} "${name}" created`); KY.go(`${base(kind)}/${f.id}`);
      } }],
    });
    setTimeout(() => $('#fn_name')?.focus(), 50);
  }

  function templateLibrary(kind) {
    let cat = 'All';
    const cats = ['All', 'Dental & Health', 'Local Business', 'Lead Generation'];
    const box = KY.modal({ title: 'Templates library', wide: true, body: '<div id="tl_body"></div>' });
    box.style.width = '1240px';
    box.style.maxHeight = '92vh';
    const draw = () => {
      const list = TEMPLATES.filter((t) => cat === 'All' || t.cat === cat);
      $('#tl_body', box).innerHTML = `<div style="display:grid;grid-template-columns:200px 1fr;gap:22px">
        <div>${cats.map((c) => `<button class="btn ${c === cat ? 'primary' : 'ghost'}" style="width:100%;justify-content:flex-start;margin-bottom:6px" id="tl_cat_${c.split(' ')[0].toLowerCase()}" data-cat="${c}">${esc(c)}</button>`).join('')}
          <div class="muted" style="font-size:13.5px;margin-top:14px;line-height:1.45">Every template is fully editable: text, images, colours and steps.</div></div>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);gap:18px">${list.map((t) => `
          <div class="card" style="padding:10px;box-shadow:none" id="tl_${t.id}">${thumb(makeLanding(t.spec))}
            <div class="bold" style="margin:10px 4px 2px;font-size:15.5px">${esc(t.name)}</div>
            <div class="row" style="margin:0 4px 4px"><span class="muted" style="font-size:13.5px">${t.steps.length} steps · ${esc(t.cat)}</span><span class="spacer"></span>
              <button class="btn sm" data-prev="${t.id}">${icon('eye', 16)}</button><button class="btn sm primary" id="tl_use_${t.id}" data-use="${t.id}">Use</button></div></div>`).join('')}</div></div>`;
      fitThumbs(box);
      $$('[data-cat]', box).forEach((b) => (b.onclick = () => { cat = b.dataset.cat; draw(); }));
      $$('[data-use]', box).forEach((b) => (b.onclick = () => { box.closest('.overlay').remove(); nameFunnel(kind, TEMPLATES.find((t) => t.id === b.dataset.use)); }));
      $$('[data-prev]', box).forEach((b) => (b.onclick = () => openPreview(makeLanding(TEMPLATES.find((t) => t.id === b.dataset.prev).spec), 'template-preview')));
    };
    draw();
  }

  // ---------------------------------------------------------------- funnel / website detail
  function detailView(view, kind, owner, sub, stepId) {
    const isWeb = kind === 'website';
    const tabs = [['steps', isWeb ? 'Pages' : 'Steps'], ['stats', 'Stats'], ['sales', 'Sales'], ['settings', 'Settings']];
    view.innerHTML = `
      <div class="st-crumb"><a id="fn_back">${isWeb ? 'Websites' : 'Funnels'}</a>${icon('right', 16)}<span>${esc(owner.name)}</span></div>
      <div class="page-head" style="margin-bottom:10px"><h1>${esc(owner.name)}</h1>
        <div class="actions"><button class="btn" id="fn_view_live">${icon('external', 18)} View live</button></div></div>
      <div class="st-sub">${tabs.map(([id, l]) => `<a id="fn_tab_${id}" class="${sub === id ? 'on' : ''}" data-t="${id}">${l}</a>`).join('')}</div>
      <div id="fn_body"></div>`;
    $('#fn_back').onclick = () => KY.go(base(kind));
    $$('[data-t]', view).forEach((a) => (a.onclick = () => KY.go(`${base(kind)}/${owner.id}/${a.dataset.t}`)));
    $('#fn_view_live').onclick = () => openPreview(owner.pages[0].page, urlOf(owner, owner.pages[0]));
    const body = $('#fn_body');
    if (sub === 'stats') return statsTab(body, owner, isWeb);
    if (sub === 'sales') return salesTab(body, owner);
    if (sub === 'settings') return settingsTab(body, owner, isWeb);
    stepsTab(body, kind, owner, stepId);
  }

  function stepsTab(body, kind, owner, stepId) {
    const isWeb = kind === 'website';
    const step = owner.pages.find((s) => s.id === stepId) || owner.pages[0];
    let subtab = 'overview';
    const stepWord = isWeb ? 'Page' : 'Step';
    body.innerHTML = `<div style="display:grid;grid-template-columns:360px 1fr;gap:20px;align-items:start">
      <div class="card"><div class="card-h"><h3>${isWeb ? 'Website pages' : 'Funnel steps'}</h3></div>
        <div style="padding:10px" id="fn_steps">${owner.pages.map((s, i) => `
          <div class="st-step ${s.id === step.id ? 'on' : ''}" id="fn_step_${s.id}" data-s="${s.id}"><span class="faint">${icon('grip', 16)}</span><span class="n">${i + 1}</span>
            <div style="min-width:0"><div class="bold" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s.name)}</div><div class="muted" style="font-size:13px">/${esc(s.path)}</div></div>
            ${s.ab ? '<span class="chip purple" style="margin-left:auto">A/B</span>' : ''}</div>`).join('')}
          <button class="btn" id="fn_add_step" style="width:100%;justify-content:center;margin-top:8px;border-style:dashed">${icon('plus', 18)} Add New ${stepWord}</button>
        </div></div>
      <div class="card" id="fn_step_card">
        <div class="row" style="padding:18px 22px 6px;align-items:flex-start">
          <div><h2 style="margin:0;font-size:22px" id="fn_step_name">${esc(step.name)}</h2>
            <div class="row" style="gap:8px;margin-top:6px"><a id="fn_step_url" style="font-size:15px">${icon('link', 16)} https://${esc(urlOf(owner, step))}</a>
              <button class="btn ghost icon sm" id="fn_copy_url" title="Copy URL">${icon('copy', 16)}</button>
              ${step.published ? '<span class="chip green">Published</span>' : '<span class="chip amber">Draft</span>'}</div></div>
          <span class="spacer"></span>
          ${!isWeb && !step.ab ? `<button class="btn" id="fn_ab_create">${icon('split', 18)} Create A/B Test</button>` : ''}
          <button class="btn ghost icon" id="fn_step_more">${icon('more', 18)}</button>
        </div>
        <div class="st-sub" style="margin:8px 22px 0">${[['overview', 'Overview'], ['automation', 'Automation'], ['publishing', 'Publishing'], ['products', 'Products']].map(([id, l]) => `<a id="fn_sub_${id}" data-sub="${id}" class="${id === subtab ? 'on' : ''}">${l}</a>`).join('')}</div>
        <div id="fn_sub_body" style="padding:4px 22px 22px"></div>
      </div></div>`;

    const drawSub = () => {
      $$('[data-sub]', body).forEach((a) => a.classList.toggle('on', a.dataset.sub === subtab));
      const sb = $('#fn_sub_body');
      if (subtab === 'overview') {
        const card = (label, page, st, key, traffic, control) => `
          <div class="card" style="box-shadow:none;padding:14px" id="fn_var_${key}">${thumb(page)}
            <div class="row" style="margin-top:12px"><div><div class="bold">${label} ${control ? '<span class="chip" style="margin-left:4px">Control</span>' : ''}</div>
              <div class="muted st-num" style="font-size:14px">${num(st.views)} views · ${num(st.optins)} opt-ins · ${pct(st.optins, st.views)}</div></div><span class="spacer"></span>
              ${traffic !== null ? `<span class="chip blue st-num" id="fn_traffic_${key}" style="font-size:14px;height:30px">${traffic}% traffic</span>` : ''}</div>
            <div class="row" style="margin-top:12px">
              <button class="btn primary" id="${key === 'b' ? 'fn_edit_b' : 'fn_edit'}" data-edit="${key}">${icon('edit', 18)} Edit</button>
              <button class="btn" data-pv="${key}">${icon('eye', 18)} Preview</button>
              ${traffic !== null ? `<span class="spacer"></span><button class="btn" id="fn_win_${key}" data-win="${key}">${icon('star', 18)} Declare Winner</button>` : ''}</div></div>`;
        sb.innerHTML = step.ab ? `
          <div class="card" style="box-shadow:none;padding:16px 18px;margin:16px 0;background:#f9fafb" id="fn_ab_panel">
            <div class="row"><b>A/B test running</b><span class="muted" style="font-size:14px">since ${esc(step.ab.started)}</span><span class="spacer"></span><span class="muted" style="font-size:14px">Traffic split</span></div>
            <div class="row" style="margin-top:10px;gap:14px"><span class="bold st-num" style="width:110px">A · ${step.ab.split}%</span>
              <input type="range" id="fn_ab_slider" min="0" max="100" step="5" value="${step.ab.split}" style="flex:1;accent-color:#155eef;height:6px">
              <span class="bold st-num" style="width:110px;text-align:right">B · ${100 - step.ab.split}%</span></div></div>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:18px">${card('Variation A', step.page, step.ab.a, 'a', step.ab.split, true)}${card('Variation B', step.ab.bPage, step.ab.b, 'b', 100 - step.ab.split, false)}</div>`
          : `<div style="max-width:620px;margin-top:16px">${card(isWeb ? 'Page' : 'Variation A', step.page, step, 'a', null, false)}</div>`;
        fitThumbs(sb);
        $$('[data-edit]', sb).forEach((b) => (b.onclick = () => KY.go(`${base(kind)}/${owner.id}/builder/${step.id}${b.dataset.edit === 'b' ? '/b' : ''}`)));
        $$('[data-pv]', sb).forEach((b) => (b.onclick = () => openPreview(b.dataset.pv === 'b' ? step.ab.bPage : step.page, urlOf(owner, step))));
        const slider = $('#fn_ab_slider');
        if (slider) slider.oninput = () => { step.ab.split = +slider.value; drawSub(); $('#fn_ab_slider').focus(); };
        $$('[data-win]', sb).forEach((b) => (b.onclick = () => KY.modal({
          title: `Declare Variation ${b.dataset.win.toUpperCase()} the winner?`,
          body: `<p style="margin:0">All traffic will go to Variation ${b.dataset.win.toUpperCase()} and the test will end. The other variation is archived, so you can bring it back later.</p>`,
          actions: [{ label: 'Cancel' }, { label: 'Declare Winner', primary: true, id: 'fn_win_confirm', onClick: (close) => {
            if (b.dataset.win === 'b') step.page = step.ab.bPage;
            const w = step.ab[b.dataset.win]; Object.assign(step, { views: step.views, optins: step.optins }); step.ab = null;
            close(); KY.toast(`Variation ${b.dataset.win.toUpperCase()} is now live for 100% of visitors`); stepsTab(body, kind, owner, step.id); void w;
          } }],
        })));
      } else if (subtab === 'automation') {
        sb.innerHTML = `<p class="muted" style="margin:16px 0">Workflows that start when someone takes action on this ${stepWord.toLowerCase()}.</p>
          <table class="t"><thead><tr><th>Workflow</th><th>Trigger</th><th>Status</th></tr></thead><tbody>
          <tr><td class="bold">New Lead — Instant Follow-up</td><td>Form Submitted · Invisalign Enquiry</td><td><span class="chip green">Published</span></td></tr></tbody></table>
          <button class="btn" style="margin-top:14px" onclick="KY.go('#/automation')">${icon('plus', 18)} Add workflow</button>`;
      } else if (subtab === 'publishing') {
        sb.innerHTML = `<div class="st-kv" style="margin-top:18px"><b>Domain</b><span>${esc(owner.domain)}</span><b>Path</b><span>/${esc(step.path)}</span>
          <b>Status</b><span>${step.published ? '<span class="chip green">Published</span>' : '<span class="chip amber">Draft — not live yet</span>'}</span><b>SSL</b><span class="chip green">${icon('shield', 14)} Secure (HTTPS)</span></div>`;
      } else {
        sb.innerHTML = `<div class="empty" style="padding:40px"><div class="big">No products on this ${stepWord.toLowerCase()}</div>Add products to an order form step to take payments.<br><br><button class="btn">${icon('plus', 18)} Add Product</button></div>`;
      }
    };
    drawSub();
    $$('[data-sub]', body).forEach((a) => (a.onclick = () => { subtab = a.dataset.sub; drawSub(); }));
    $$('[data-s]', body).forEach((d) => (d.onclick = () => KY.go(`${base(kind)}/${owner.id}/steps/${d.dataset.s}`)));
    $('#fn_copy_url').onclick = () => KY.toast('URL copied');
    $('#fn_step_url').onclick = () => openPreview(step.page, urlOf(owner, step));
    const ab = $('#fn_ab_create');
    if (ab) ab.onclick = () => KY.modal({
      title: 'Create A/B test',
      body: `<p style="margin-top:0">We'll make <b>Variation B</b> as a copy of this page. Change one thing on it, such as the headline, then split your traffic between both versions.</p>
        <div class="field"><label>Start Variation B from</label><select class="select" id="fn_ab_from"><option>A copy of Variation A (recommended)</option><option>A blank page</option></select></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Create Variation', primary: true, id: 'fn_ab_confirm', onClick: (close) => {
        step.ab = { split: 50, started: 'Today', a: stat(0, 0, 0, 0), b: stat(0, 0, 0, 0), bPage: clone(step.page) };
        close(); KY.toast('Variation B created — traffic split 50/50'); stepsTab(body, kind, owner, step.id);
      } }],
    });
    $('#fn_step_more').onclick = (e) => KY.menu(e.currentTarget, [
      { label: 'Edit name & path', icon: 'edit', onClick: () => editStep(owner, step, () => stepsTab(body, kind, owner, step.id)) },
      { label: `Clone ${stepWord.toLowerCase()}`, icon: 'copy', onClick: () => { owner.pages.push({ ...clone(step), id: nid('s'), name: step.name + ' (copy)', path: step.path + '-copy' }); stepsTab(body, kind, owner, step.id); KY.toast(`${stepWord} cloned`); } },
      { label: `Delete ${stepWord.toLowerCase()}`, icon: 'trash' },
    ]);
    $('#fn_add_step').onclick = () => KY.modal({
      title: `Add new ${isWeb ? 'page' : 'funnel step'}`,
      body: `<div class="field"><label>Name for ${stepWord.toLowerCase()}</label><input class="input" id="fn_ns_name" placeholder="e.g. Book Your Scan"></div>
        <div class="field"><label>Path</label><div class="row" style="gap:0"><span class="btn" style="border-radius:8px 0 0 8px;background:#f9fafb;cursor:default">${esc(owner.domain)}/</span><input class="input" id="fn_ns_path" style="border-radius:0 8px 8px 0;border-left:0" placeholder="book"></div></div>`,
      actions: [{ label: 'Cancel' }, { label: `Create ${stepWord}`, primary: true, id: 'fn_ns_create', onClick: (close, box) => {
        const name = $('#fn_ns_name', box).value.trim() || `New ${stepWord}`;
        const path = $('#fn_ns_path', box).value.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const s = sp(nid('s'), name, path, { seo: { title: name, desc: '', author: BIZ.name, keywords: '', image: '' }, sections: [header(BLOOM), sec(null, { name: 'Section', pad: 64 }, [row([col([])])]), footer(BLOOM)] }, { ...stat(0, 0, 0, 0), published: false });
        owner.pages.push(s); owner.steps = owner.pages.length;
        close(); KY.toast(`${stepWord} "${name}" added`); KY.go(`${base(kind)}/${owner.id}/steps/${s.id}`);
      } }],
    });
    const nm = $('#fn_ns_name');
    if (nm) nm.focus();
  }

  function editStep(owner, step, done) {
    KY.modal({
      title: 'Edit name & path',
      body: `<div class="field"><label>Name</label><input class="input" id="fn_es_name" value="${esc(step.name)}"></div>
        <div class="field"><label>Path</label><div class="row" style="gap:0"><span class="btn" style="border-radius:8px 0 0 8px;background:#f9fafb;cursor:default">${esc(owner.domain)}/</span><input class="input" id="fn_es_path" style="border-radius:0 8px 8px 0;border-left:0" value="${esc(step.path)}"></div></div>
        <p class="muted" style="font-size:14px;margin:0">Keep paths short, lowercase and descriptive. Changing a live path breaks any old links to it.</p>`,
      actions: [{ label: 'Cancel' }, { label: 'Update', primary: true, id: 'fn_es_save', onClick: (close, box) => {
        step.name = $('#fn_es_name', box).value.trim() || step.name;
        step.path = $('#fn_es_path', box).value.trim().replace(/^\//, '');
        close(); done(); KY.toast('Name & path updated');
      } }],
    });
  }

  function statsTab(body, owner, isWeb) {
    let range = 'Last 30 days';
    const rows = [];
    owner.pages.forEach((s) => {
      if (s.ab) {
        rows.push({ name: s.name, st: { views: s.ab.a.views + s.ab.b.views, uniq: s.ab.a.uniq + s.ab.b.uniq, optins: s.ab.a.optins + s.ab.b.optins, ouniq: s.ab.a.ouniq + s.ab.b.ouniq }, bold: true, id: s.id });
        rows.push({ name: `Variation A · ${s.ab.split}%`, st: s.ab.a, sub: true, id: s.id + '_a' }, { name: `Variation B · ${100 - s.ab.split}%`, st: s.ab.b, sub: true, id: s.id + '_b', win: s.ab.b.optins / (s.ab.b.views || 1) > s.ab.a.optins / (s.ab.a.views || 1) });
      } else rows.push({ name: s.name, st: s, bold: true, id: s.id });
    });
    const first = owner.pages[0];
    const fs = first.ab ? { views: first.ab.a.views + first.ab.b.views, optins: first.ab.a.optins + first.ab.b.optins } : first;
    const draw = () => {
      body.innerHTML = `
        <div class="row" style="margin-bottom:16px"><button class="btn" id="fn_stats_range">${icon('calendar', 18)} ${range} ${icon('chevron', 16)}</button>
          <span class="muted" style="font-size:14px">All = every visit · Uniques = each person counted once</span><span class="spacer"></span>
          <button class="btn" id="fn_stats_reset">${icon('restore', 18)} Reset Stats</button></div>
        <div class="grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px" id="fn_stats_tiles">
          <div class="card stat"><div class="k">Page views (first ${isWeb ? 'page' : 'step'})</div><div class="v st-num">${num(fs.views)}</div></div>
          <div class="card stat"><div class="k">Opt-ins (first ${isWeb ? 'page' : 'step'})</div><div class="v st-num">${num(fs.optins)}</div></div>
          <div class="card stat"><div class="k">Opt-in rate (first ${isWeb ? 'page' : 'step'})</div><div class="v st-num">${pct(fs.optins, fs.views)}</div></div>
          <div class="card stat"><div class="k">Sales</div><div class="v st-num">£0</div></div></div>
        <div class="card"><table class="t" id="fn_stats_table"><thead>
          <tr><th rowspan="2">${isWeb ? 'Page' : 'Step'}</th><th colspan="2" style="text-align:center">Page views</th><th colspan="2" style="text-align:center">Opt-ins</th><th colspan="2" style="text-align:center">Opt-in rate</th><th rowspan="2">Sales</th><th rowspan="2">Earnings / page view</th></tr>
          <tr><th>All</th><th>Uniques</th><th>All</th><th>Uniques</th><th>All</th><th>Uniques</th></tr></thead>
          <tbody>${rows.map((r) => `<tr id="fn_stat_${r.id}" style="${r.sub ? 'background:#fcfcfd' : ''}">
            <td class="${r.bold ? 'bold' : ''}" style="${r.sub ? 'padding-left:38px;color:var(--ink-2)' : ''}">${esc(r.name)} ${r.win ? '<span class="chip green" style="margin-left:6px">Leading</span>' : ''}</td>
            <td class="st-num">${num(r.st.views)}</td><td class="st-num">${num(r.st.uniq)}</td><td class="st-num">${num(r.st.optins)}</td><td class="st-num">${num(r.st.ouniq)}</td>
            <td class="st-num bold">${pct(r.st.optins, r.st.views)}</td><td class="st-num">${pct(r.st.ouniq, r.st.uniq)}</td><td class="st-num">£0</td><td class="st-num">£0.00</td></tr>`).join('')}</tbody></table></div>`;
      $('#fn_stats_range').onclick = (e) => KY.menu(e.currentTarget, ['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map((r) => ({ label: r, onClick: () => { range = r; draw(); } })));
      $('#fn_stats_reset').onclick = () => KY.modal({ title: 'Reset stats?', body: '<p style="margin:0">This permanently clears the views and opt-ins shown here. Contacts and form submissions are not affected.</p>', actions: [{ label: 'Cancel' }, { label: 'Reset', primary: true }] });
    };
    draw();
  }

  function salesTab(body, owner) {
    body.innerHTML = `<div class="row" style="margin-bottom:16px"><button class="btn">${icon('calendar', 18)} Last 30 days ${icon('chevron', 16)}</button></div>
      <div class="card"><table class="t"><thead><tr><th>Customer</th><th>Product</th><th>Amount</th><th>Step</th><th>Date</th></tr></thead><tbody></tbody></table>
      <div class="empty" id="fn_sales_empty"><div class="big">No sales yet</div>${esc(owner.name)} collects leads rather than payments.<br>Add an order form step with a product to sell directly from a funnel.</div></div>`;
  }

  function settingsTab(body, owner, isWeb) {
    const doms = DOMAINS.map((d) => d.name);
    body.innerHTML = `<div class="card" style="max-width:900px"><div class="card-h"><h3>${isWeb ? 'Website' : 'Funnel'} settings</h3></div><div class="card-b">
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 18px">
        <div class="field"><label>Domain</label><select class="select" id="fn_set_domain">${doms.map((d) => `<option ${d === owner.domain ? 'selected' : ''}>${esc(d)}</option>`).join('')}</select></div>
        <div class="field"><label>Favicon URL</label><input class="input" id="fn_set_favicon" placeholder="https://…/favicon.png" value="${esc(owner.favicon)}"></div></div>
      <div class="field"><label>Head tracking code</label><textarea class="input" rows="4" id="fn_set_head" placeholder="<!-- e.g. Meta Pixel or Google tag: added to the <head> of every ${isWeb ? 'page' : 'step'} -->">${esc(owner.head)}</textarea></div>
      <div class="field"><label>Body tracking code</label><textarea class="input" rows="3" id="fn_set_body" placeholder="<!-- Added just before </body> -->">${esc(owner.body)}</textarea></div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 18px">
        <div class="field"><label>Chat widget</label><select class="select" id="fn_set_chat"><option>None</option>${CHAT.map((c) => `<option ${c.name === owner.chat ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></div>
        <div class="field"><label>Payment mode</label><select class="select" id="fn_set_payment"><option ${owner.payment === 'Live' ? 'selected' : ''}>Live</option><option ${owner.payment === 'Test' ? 'selected' : ''}>Test</option></select></div></div>
      ${toggle('fn_set_optimise', true, 'Optimise images for faster loading')}
      <div class="row" style="margin-top:18px"><span class="spacer"></span><button class="btn primary" id="fn_set_save">Save</button></div></div></div>`;
    KY.toggles(body);
    $('#fn_set_save').onclick = () => {
      Object.assign(owner, { domain: $('#fn_set_domain').value, favicon: $('#fn_set_favicon').value, head: $('#fn_set_head').value, body: $('#fn_set_body').value, chat: $('#fn_set_chat').value, payment: $('#fn_set_payment').value });
      KY.toast(`${isWeb ? 'Website' : 'Funnel'} settings saved`);
    };
  }

  function openPreview(page, url) {
    let mob = false;
    const p = document.createElement('div');
    p.className = 'st-prev';
    p.id = 'pv_root';
    const draw = () => {
      p.innerHTML = `<div class="bar"><b>Preview</b><span class="url">${icon('lock', 15)} https://${esc(url)}</span><span class="spacer"></span>
        <div class="pb-dev" style="background:#344054"><button id="pv_desktop" class="${mob ? '' : 'on'}">${icon('desktop', 20)}</button><button id="pv_mobile" class="${mob ? 'on' : ''}">${icon('mobile', 20)}</button></div>
        <button class="btn sm" id="pv_close">${icon('x', 16)} Exit preview</button></div>
        <div class="wrap"><div class="pb-canvas ${mob ? 'mob' : ''}">${renderPage(page, { mob })}</div></div>`;
      $('#pv_close', p).onclick = () => p.remove();
      $('#pv_desktop', p).onclick = () => { mob = false; draw(); };
      $('#pv_mobile', p).onclick = () => { mob = true; draw(); };
    };
    draw();
    document.body.appendChild(p);
  }

  // ---------------------------------------------------------------- page builder
  const SWATCHES = ['#ffffff', '#eef8f6', '#14324a', '#0d9488', '#db2777', '#f59e0b', '#155eef', '#101828'];
  const PALETTE = [
    ['Text', [['headline', 'Headline', 'type'], ['subheadline', 'Sub-Headline', 'type'], ['paragraph', 'Paragraph', 'alignL'], ['bullets', 'Bullet List', 'list']]],
    ['Media', [['image', 'Image', 'image'], ['video', 'Video', 'video'], ['feature', 'Image Feature', 'star']]],
    ['Forms', [['button', 'Button', 'cursor'], ['form', 'Form', 'form'], ['survey', 'Survey', 'task'], ['calendar', 'Calendar', 'calendar']]],
    ['Blocks', [['countdown', 'Countdown Timer', 'clock'], ['divider', 'Divider', 'divider'], ['faq', 'FAQ', 'help'], ['nav', 'Navigation Menu', 'list']]],
  ];
  const NEW = {
    headline: { text: 'Your new headline', size: 40, weight: 800, color: '#14324a', align: 'left' },
    subheadline: { text: 'Add a supporting line here', size: 22, weight: 500, color: '#475467', align: 'left' },
    paragraph: { text: 'Write a short paragraph that explains your offer and why it matters.', size: 17, color: '#475467', align: 'left' },
    bullets: { items: ['First benefit', 'Second benefit', 'Third benefit'], size: 17, color: '#14324a', accent: '#0d9488' },
    image: { art: 'smile', accent: '#0d9488', alt: '' },
    video: { url: '', caption: 'Your video' },
    feature: { icon: 'star', title: 'Feature title', text: 'Describe the benefit in one line.', accent: '#0d9488' },
    button: { text: 'Book Now', sub: '', bg: '#0d9488', color: '#ffffff', radius: 10, align: 'left', action: 'next', target: '' },
    form: { form: 'fm1' }, survey: { survey: 'sv1' }, calendar: { calendar: 'k2', accent: '#0d9488' },
    countdown: {}, divider: {}, faq: {}, nav: { logo: BIZ.name, phone: '020 7946 0321', accent: '#0d9488' },
  };
  const ACTIONS = [['next', 'Go to next funnel step'], ['url', 'Go to website URL'], ['scroll', 'Scroll to element'], ['popup', 'Open popup'], ['phone', 'Call phone number'], ['email', 'Send email'], ['download', 'Download file']];
  const B = {};

  const locate = (id) => {
    for (const s of B.page.sections) {
      if (s.id === id) return { sec: s };
      for (const r of s.rows) {
        if (r.id === id) return { sec: s, row: r };
        for (const c of r.cols) {
          if (c.id === id) return { sec: s, row: r, col: c };
          const i = c.els.findIndex((e) => e.id === id);
          if (i > -1) return { sec: s, row: r, col: c, el: c.els[i], idx: i };
        }
      }
    }
    return null;
  };
  const snap = () => JSON.stringify(B.page.sections);
  function remember() { B.past.push(snap()); if (B.past.length > 80) B.past.shift(); B.future = []; markDirty(); }
  function markDirty() { B.dirty = true; const s = $('#pb_status'); if (s) { s.textContent = 'Unsaved changes'; s.className = 'chip amber'; } updTop(); }
  function restore(json) { B.page.sections = JSON.parse(json); if (B.sel && !locate(B.sel.id)) B.sel = null; drawCanvas(); drawProps(); drawPanel(); markDirty(); }
  function updTop() {
    $('#pb_desktop')?.classList.toggle('on', B.device === 'desktop');
    $('#pb_mobile')?.classList.toggle('on', B.device === 'mobile');
    if ($('#pb_undo')) { $('#pb_undo').style.opacity = B.past.length ? 1 : 0.4; $('#pb_redo').style.opacity = B.future.length ? 1 : 0.4; }
  }

  function builderView(view, kind, owner, step, variant) {
    const page = variant === 'b' && step.ab ? step.ab.bPage : step.page;
    Object.assign(B, { kind, owner, step, page, variant, sel: null, device: 'desktop', panel: 'add', addTab: 'elements', past: [], future: [], dirty: false, typed: false, drag: null });
    const root = document.createElement('div');
    root.className = 'st-full';
    root.id = 'pb_root';
    root.innerHTML = `
      <div class="pb-top">
        <button class="btn ghost icon" id="pb_back" title="Back">${icon('left', 22)}</button>
        <div class="ttl"><b id="pb_title">${esc(step.name)}${variant === 'b' ? ' · Variation B' : ''}</b><small>${esc(owner.name)} · ${esc(urlOf(owner, step))}</small></div>
        <span id="pb_status" class="chip green" style="margin-left:8px">All changes saved</span>
        <span class="spacer"></span>
        <div class="pb-dev" id="pb_devices"><button id="pb_desktop" title="Desktop view">${icon('desktop', 20)}</button><button id="pb_mobile" title="Mobile view">${icon('mobile', 20)}</button></div>
        <span class="spacer"></span>
        <button class="btn ghost icon" id="pb_undo" title="Undo">${icon('undo', 20)}</button>
        <button class="btn ghost icon" id="pb_redo" title="Redo">${icon('redo', 20)}</button>
        <button class="btn" id="pb_preview">${icon('eye', 18)} Preview</button>
        <button class="btn" id="pb_save">Save</button>
        <button class="btn primary" id="pb_publish">Publish</button>
      </div>
      <div class="pb-body">
        <div class="pb-rail">
          <button class="add" id="pb_add" title="Add elements">${icon('plus', 24)}</button>
          <button id="pb_layers" title="Layers">${icon('layers', 22)}</button>
          <button id="pb_settings" title="Page settings">${icon('settings', 22)}</button>
          <button id="pb_media" title="Media">${icon('image', 22)}</button>
        </div>
        <div class="pb-panel" id="pb_panel"></div>
        <div class="pb-stage" id="pb_stage"><div class="pb-canvas" id="pb_canvas"></div></div>
        <div class="pb-props" id="pb_props"></div>
      </div>`;
    view.appendChild(root);
    drawCanvas(); drawPanel(); drawProps(); updTop();

    $('#pb_back').onclick = () => KY.go(`${base(kind)}/${owner.id}/steps/${step.id}`);
    const device = (d) => { B.device = d; drawCanvas(); drawProps(); updTop(); $('#pb_stage').scrollTop = 0; };
    $('#pb_desktop').onclick = () => device('desktop');
    $('#pb_mobile').onclick = () => device('mobile');
    $('#pb_undo').onclick = () => { if (!B.past.length) return; B.future.push(snap()); restore(B.past.pop()); };
    $('#pb_redo').onclick = () => { if (!B.future.length) return; B.past.push(snap()); restore(B.future.pop()); };
    $('#pb_preview').onclick = () => { openPreview(B.page, urlOf(owner, step)); if (B.device === 'mobile') $('#pv_mobile').click(); };
    const saved = (msg) => { B.dirty = false; const s = $('#pb_status'); s.textContent = 'All changes saved'; s.className = 'chip green'; owner.updated = 'Just now'; KY.toast(msg); };
    $('#pb_save').onclick = () => saved('Page saved');
    $('#pb_publish').onclick = () => { step.published = true; saved(`Published · live at ${urlOf(owner, step)}`); };
    $('#pb_add').onclick = () => { B.panel = B.panel === 'add' ? null : 'add'; drawPanel(); };
    $('#pb_layers').onclick = () => { B.panel = B.panel === 'layers' ? null : 'layers'; drawPanel(); };
    $('#pb_settings').onclick = () => pageSettings();
    $('#pb_media').onclick = () => mediaLibrary();

    const stage = $('#pb_stage');
    stage.addEventListener('click', (e) => {
      if (e.target.closest('.pb-tag')) return;
      const n = e.target.closest('[data-el],[data-col],[data-row],[data-sec]');
      if (!n) return select(null);
      if (n.dataset.el) return select({ type: 'el', id: n.dataset.el });
      if (n.dataset.col) return select({ type: 'col', id: n.dataset.col });
      if (n.dataset.row) return select({ type: 'row', id: n.dataset.row });
      select({ type: 'sec', id: n.dataset.sec });
    });
    stage.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.closest('[data-edit]')) e.preventDefault(); });
    stage.addEventListener('input', (e) => {
      const n = e.target.closest('[data-edit]');
      if (!n) return;
      const L = locate(n.closest('[data-el]').dataset.el);
      if (!B.typed) { remember(); B.typed = true; }
      const k = n.dataset.edit, v = n.innerText.replace(/\n+$/, '');
      if (k.startsWith('item:')) L.el.items[+k.slice(5)] = v; else L.el[k] = v;
      const mirror = k === 'text' ? $('#pb_prop_btntext') || $('#pb_prop_ftext') : k === 'title' ? $('#pb_prop_ftitle') : k === 'logo' ? $('#pb_prop_logo') : null;
      if (mirror) mirror.value = v;
    });
  }

  function select(sel, focus = true) {
    if (sel && B.sel && sel.type === B.sel.type && sel.id === B.sel.id) return;
    B.sel = sel;
    B.typed = false;
    drawCanvas(); drawProps();
    if (B.panel === 'layers') drawPanel();
    if (focus && sel && sel.type === 'el') {
      const ed = $(`#pb_el_${sel.id} [data-edit]`);
      if (ed) {
        ed.focus();
        const r = document.createRange(); r.selectNodeContents(ed); r.collapse(false);
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      }
    }
  }

  function drawCanvas() {
    const c = $('#pb_canvas');
    if (!c) return;
    c.className = 'pb-canvas' + (B.device === 'mobile' ? ' mob' : '');
    c.innerHTML = renderPage(B.page, { edit: true, mob: B.device === 'mobile', sel: B.sel });
    if (B.sel && B.sel.type === 'el') $$(`#pb_el_${B.sel.id} [data-edit]`).forEach((n) => n.setAttribute('contenteditable', 'plaintext-only'));
    const L = B.sel && locate(B.sel.id);
    const on = (id, fn) => { const b = $(id); if (b) b.onclick = (e) => { e.stopPropagation(); fn(); }; };
    if (!L) return;
    on('#pb_tb_up', () => moveEl(L, -1));
    on('#pb_tb_down', () => moveEl(L, 1));
    on('#pb_tb_dup', () => { remember(); const e = { ...clone(L.el), id: nid('e') }; L.col.els.splice(L.idx + 1, 0, e); B.sel = { type: 'el', id: e.id }; drawCanvas(); drawProps(); KY.toast('Element duplicated'); });
    on('#pb_tb_del', () => { remember(); L.col.els.splice(L.idx, 1); B.sel = null; drawCanvas(); drawProps(); });
    on('#pb_tb_sec_del', () => { remember(); B.page.sections.splice(B.page.sections.indexOf(L.sec), 1); B.sel = null; drawCanvas(); drawProps(); });
    on('#pb_tb_row_del', () => { remember(); L.sec.rows.splice(L.sec.rows.indexOf(L.row), 1); B.sel = null; drawCanvas(); drawProps(); });
    on('#pb_tb_col_del', () => { remember(); L.row.cols.splice(L.row.cols.indexOf(L.col), 1); B.sel = null; drawCanvas(); drawProps(); });
  }
  function moveEl(L, dir) {
    const j = L.idx + dir;
    if (j < 0 || j >= L.col.els.length) return;
    remember();
    [L.col.els[L.idx], L.col.els[j]] = [L.col.els[j], L.col.els[L.idx]];
    drawCanvas();
  }

  // ----- left panel: add elements / layers
  function drawPanel() {
    const p = $('#pb_panel');
    if (!p) return;
    $('#pb_add').classList.toggle('on', B.panel === 'add');
    $('#pb_layers').classList.toggle('on', B.panel === 'layers');
    p.style.display = B.panel ? '' : 'none';
    if (B.panel === 'layers') {
      const L = (id) => (B.sel && B.sel.id === id ? 'background:var(--blue-soft);color:var(--blue);' : '');
      p.innerHTML = `<div class="hd row" style="padding:16px 18px;border-bottom:1px solid var(--line-soft)"><b style="font-size:17px">Layers</b></div><div style="padding:10px 12px">
        ${B.page.sections.map((s) => `<div class="st-step" style="margin:0;padding:8px 10px;${L(s.id)}" id="pb_layer_${s.id}" data-layer="sec:${s.id}"><span style="color:#12b76a">${icon('section', 18)}</span><b>${esc(s.name || 'Section')}</b></div>
          ${s.rows.map((r) => `<div class="st-step" style="margin:0 0 0 18px;padding:6px 10px;${L(r.id)}" id="pb_layer_${r.id}" data-layer="row:${r.id}"><span style="color:#06aed4">${icon('rowi', 16)}</span>Row · ${r.cols.length} column${r.cols.length > 1 ? 's' : ''}</div>
            ${r.cols.map((c, ci) => `${r.cols.length > 1 ? `<div class="st-step" style="margin:0 0 0 36px;padding:5px 10px;font-size:14.5px;${L(c.id)}" id="pb_layer_${c.id}" data-layer="col:${c.id}"><span style="color:#7f56d9">${icon('columns', 15)}</span>Column ${ci + 1}</div>` : ''}
              ${c.els.map((e) => `<div class="st-step" style="margin:0 0 0 ${r.cols.length > 1 ? 54 : 36}px;padding:4px 10px;font-size:14.5px;${L(e.id)}" id="pb_layer_${e.id}" data-layer="el:${e.id}"><span class="faint">${icon('cursor', 14)}</span>${LABEL[e.type]}</div>`).join('')}`).join('')}`).join('')}`).join('')}</div>`;
      $$('[data-layer]', p).forEach((d) => (d.onclick = () => {
        const [t, id] = d.dataset.layer.split(':');
        select({ type: t, id }, false);
        $(`#pb_${t === 'el' ? 'el_' : ''}${id}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }));
      return;
    }
    if (B.panel !== 'add') return;
    const tabs = [['elements', 'Elements'], ['rows', 'Rows'], ['sections', 'Sections']];
    let inner = '';
    if (B.addTab === 'elements') {
      inner = PALETTE.map(([g, items]) => `<div class="st-group">${g}</div><div class="grid" style="grid-template-columns:repeat(3,1fr);gap:10px">
        ${items.map(([t, l, ic]) => `<div class="st-tile" id="pb_addel_${t}" data-add="el:${t}" data-label="${l}">${icon(ic, 24)}${l}</div>`).join('')}</div>`).join('');
    } else if (B.addTab === 'rows') {
      inner = `<p class="muted" style="font-size:14px;margin:14px 0">Rows sit inside sections and split them into columns.</p><div class="grid" style="gap:10px">
        ${[1, 2, 3, 4].map((n) => `<div class="st-tile" style="flex-direction:row;justify-content:flex-start;gap:12px;padding:12px 14px" id="pb_addrow_${n}" data-add="row:${n}" data-label="${n} Column${n > 1 ? 's' : ''}">
          <span style="display:flex;gap:4px;width:110px">${Array.from({ length: n }, () => '<i style="flex:1;height:30px;border-radius:4px;background:#d1e0ff"></i>').join('')}</span>${n} Column${n > 1 ? 's' : ''}</div>`).join('')}</div>`;
    } else {
      inner = `<p class="muted" style="font-size:14px;margin:14px 0">Sections are the big horizontal blocks of your page.</p><div class="grid" style="gap:10px">
        ${[['full', 'Full Width', 100], ['wide', 'Wide', 82], ['medium', 'Medium', 62], ['small', 'Small', 44]].map(([k, l, w]) => `<div class="st-tile" style="flex-direction:row;justify-content:flex-start;gap:12px;padding:12px 14px" id="pb_addsec_${k}" data-add="sec:${k}" data-label="${l} section">
          <span style="width:110px;height:34px;border-radius:4px;background:#ecfdf3;display:flex;justify-content:center"><i style="width:${w}%;background:#a6f4c5;border-radius:3px"></i></span>${l}</div>`).join('')}</div>`;
    }
    p.innerHTML = `<div class="row" style="padding:16px 18px 6px"><b style="font-size:17px">Add elements</b><span class="spacer"></span><button class="btn ghost icon sm" id="pb_panel_close">${icon('x', 18)}</button></div>
      <div class="st-ptabs">${tabs.map(([id, l]) => `<button id="pb_tab_${id}" class="${B.addTab === id ? 'on' : ''}" data-tab="${id}">${l}</button>`).join('')}</div>
      <div style="padding:4px 18px 24px">${inner}<p class="muted" style="font-size:13.5px;margin-top:18px">Drag onto the page, or click to add below what you've selected.</p></div>`;
    $('#pb_panel_close').onclick = () => { B.panel = null; drawPanel(); };
    $$('[data-tab]', p).forEach((b) => (b.onclick = () => { B.addTab = b.dataset.tab; drawPanel(); }));
    $$('[data-add]', p).forEach((t) => (t.onmousedown = (e) => {
      e.preventDefault();
      const [k, v] = t.dataset.add.split(':');
      startDrag(k, v, t.dataset.label, e);
    }));
  }

  // ----- adding things
  function defaultSpot() {
    const L = B.sel && locate(B.sel.id);
    if (L && L.el) return { col: L.col, index: L.idx + 1 };
    if (L && L.col) return { col: L.col, index: L.col.els.length };
    if (L && L.row) return { col: L.row.cols[0], index: L.row.cols[0].els.length };
    const s = (L && L.sec) || B.page.sections[1] || B.page.sections[0];
    const c = s.rows[0].cols[0];
    return { col: c, index: c.els.length };
  }
  function addEl(type, spot = defaultSpot()) {
    remember();
    const e = el(type, clone(NEW[type]));
    const near = spot.col.els[spot.index - 1] || spot.col.els[spot.index];
    if (near && near.align && 'align' in e) e.align = near.align;
    const prev = spot.col.els[spot.index - 1];
    if (prev && (prev.mb ?? 18) < 12) e.mt = 22;
    spot.col.els.splice(spot.index, 0, e);
    B.sel = { type: 'el', id: e.id };
    afterAdd(`#pb_el_${e.id}`);
  }
  function addRow(n, spot) {
    const L = B.sel && locate(B.sel.id);
    const s = spot ? spot.sec : (L && L.sec) || B.page.sections[1];
    const at = spot ? spot.index : L && L.row ? s.rows.indexOf(L.row) + 1 : s.rows.length;
    remember();
    const r = row(Array.from({ length: +n }, () => col([])));
    s.rows.splice(at, 0, r);
    B.sel = { type: 'row', id: r.id };
    afterAdd(`#pb_${r.id}`);
  }
  function addSec(width, spot) {
    const L = B.sel && locate(B.sel.id);
    const at = spot ? spot.index : L && L.sec ? B.page.sections.indexOf(L.sec) + 1 : B.page.sections.length - 1;
    remember();
    const s = sec(null, { width, name: 'New section', pad: 56 }, [row([col([])])]);
    B.page.sections.splice(at, 0, s);
    B.sel = { type: 'sec', id: s.id };
    afterAdd(`#pb_${s.id}`);
  }
  function afterAdd(sel) {
    drawCanvas(); drawProps();
    if (B.panel === 'layers') drawPanel();
    const n = $(sel);
    if (n) { n.scrollIntoView({ block: 'center', behavior: 'smooth' }); n.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' }); }
    const ed = n && $('[data-edit]', n);
    if (ed && B.sel.type === 'el') { ed.focus({ preventScroll: true }); const r = document.createRange(); r.selectNodeContents(ed); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  }

  // ----- drag & drop (follows the on-screen cursor while a lesson is being recorded)
  let rafId = 0;
  function startDrag(kind, val, label, e) {
    B.drag = { kind, val, label, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false, target: null };
    const g = document.createElement('div'); g.className = 'pb-ghost'; g.id = 'pb_ghost'; g.innerHTML = `${icon('plus', 16)} ${esc(label)}`; g.style.display = 'none';
    const ln = document.createElement('div'); ln.className = 'pb-drop'; ln.id = 'pb_dropline'; ln.innerHTML = '<span>Drop here</span>'; ln.style.display = 'none';
    document.body.append(g, ln);
    const tick = () => {
      if (!B.drag) return;
      const c = document.getElementById('ky-cursor');
      const p = c && c.style.opacity === '1' && c.style.left ? { x: parseFloat(c.style.left), y: parseFloat(c.style.top) } : { x: B.drag.x, y: B.drag.y };
      if (Math.hypot(p.x - B.drag.sx, p.y - B.drag.sy) > 10) B.drag.moved = true;
      if (B.drag.moved) {
        Object.assign(g.style, { display: 'flex', left: p.x + 'px', top: p.y + 'px' });
        const t = dropTarget(p.x, p.y, B.drag.kind);
        if (t) Object.assign(ln.style, { display: 'block', left: t.rect.left + 'px', width: t.rect.width + 'px', top: (t.after ? t.rect.bottom + 6 : t.rect.top - 8) + 'px' });
        else ln.style.display = 'none';
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();
  }
  document.addEventListener('mousemove', (e) => { if (B.drag) { B.drag.x = e.clientX; B.drag.y = e.clientY; } });
  document.addEventListener('mouseup', (e) => {
    if (!B.drag) return;
    const d = B.drag;
    B.drag = null;
    cancelAnimationFrame(rafId);
    $('#pb_ghost')?.remove(); $('#pb_dropline')?.remove();
    const moved = d.moved || Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 10;
    const t = moved ? dropTarget(e.clientX, e.clientY, d.kind) : null;
    if (moved && !t) return;
    if (d.kind === 'el') addEl(d.val, t || undefined);
    else if (d.kind === 'row') addRow(d.val, t || undefined);
    else addSec(d.val, t || undefined);
  });
  function dropTarget(x, y, kind) {
    const n = document.elementFromPoint(x, y);
    if (!n || !n.closest('#pb_canvas')) return null;
    const sn = n.closest('[data-sec]');
    if (kind === 'el') {
      const en = n.closest('[data-el]');
      if (en) { const L = locate(en.dataset.el); const r = en.getBoundingClientRect(); const after = y > r.top + r.height / 2; return { col: L.col, index: L.idx + (after ? 1 : 0), rect: r, after }; }
      const cn = n.closest('[data-col]') || (sn && $(`[data-col]`, sn));
      if (!cn) return null;
      const L = locate(cn.dataset.col);
      const els = $$(':scope > [data-el]', cn);
      const last = els[els.length - 1];
      return { col: L.col, index: L.col.els.length, rect: (last || cn).getBoundingClientRect(), after: !!last };
    }
    if (!sn) return null;
    const Ls = locate(sn.dataset.sec);
    if (kind === 'row') {
      const rn = n.closest('[data-row]');
      return { sec: Ls.sec, index: rn ? Ls.sec.rows.findIndex((r) => r.id === rn.dataset.row) + 1 : Ls.sec.rows.length, rect: (rn || sn).getBoundingClientRect(), after: true };
    }
    const r = sn.getBoundingClientRect();
    const after = y > r.top + r.height / 2;
    return { index: B.page.sections.indexOf(Ls.sec) + (after ? 1 : 0), rect: r, after };
  }
  document.addEventListener('keydown', (e) => {
    if (!$('#pb_root') || !(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 'z') return;
    if (e.target.closest('input,textarea,[contenteditable]')) return;
    e.preventDefault();
    $(e.shiftKey ? '#pb_redo' : '#pb_undo').click();
  });

  // ----- right panel: settings for the selected element / row / section
  const acc = (title, html) => `<div class="st-acc"><h4>${title}</h4>${html}</div>`;
  const sw = (key, cur, prefix) => `<div class="st-sw">${SWATCHES.map((c, i) => `<button id="${prefix}_${i}" data-sw="${key}" data-v="${c}" class="${(cur || '').toLowerCase() === c ? 'on' : ''}" style="background:${c}" title="${c}"></button>`).join('')}</div>`;
  const numIn = (id, key, val, label, unit = 'px') => `<div class="field" style="margin-bottom:10px"><label>${label}</label><div class="row" style="gap:8px"><input class="input" type="number" id="${id}" data-k="${key}" value="${val}" style="width:110px"><span class="muted">${unit}</span></div></div>`;
  const vis = (o) => acc('Visibility', `${toggle('pb_vis_desktop', !o.hideDesk, `${icon('desktop', 18)}&nbsp;Show on desktop`)}${toggle('pb_vis_mobile', !o.hideMob, `${icon('mobile', 18)}&nbsp;Show on mobile`)}`);

  function drawProps() {
    const p = $('#pb_props');
    if (!p) return;
    const L = B.sel && locate(B.sel.id);
    if (!L) {
      p.innerHTML = `<div class="hd">${icon('settings', 20)}<b>Settings</b></div>
        <div class="empty" style="padding:56px 28px"><div class="faint">${icon('cursor', 40)}</div><div class="big" style="font-size:17px;margin-top:10px">Select something to edit</div>Click any element, row or section on the page to change it here.</div>`;
      return;
    }
    const mob = B.device === 'mobile';
    let html = '';
    const t = B.sel.type;
    const o = L.el || (t === 'sec' ? L.sec : t === 'row' ? L.row : L.col);
    if (t === 'sec') {
      html = acc('Section', `<div class="field"><label>Name</label><input class="input" id="pb_prop_name" data-k="name" value="${esc(L.sec.name || '')}"></div>
          <label class="bold" style="font-size:14px;color:var(--ink-2)">Width</label><div class="st-seg" style="margin:6px 0 4px">${['full', 'wide', 'medium', 'small'].map((w) => `<button id="pb_width_${w}" data-set="width" data-v="${w}" class="${L.sec.width === w ? 'on' : ''}">${w[0].toUpperCase() + w.slice(1)}</button>`).join('')}</div>`)
        + acc('Background colour', sw('bg', L.sec.bg, 'pb_bg'))
        + acc('Spacing', numIn('pb_prop_pad', 'pad', L.sec.pad, 'Padding top & bottom'))
        + vis(L.sec);
    } else if (t === 'row') {
      html = acc('Row', `<p class="muted" style="margin:0 0 12px;font-size:14px">${L.row.cols.length} column${L.row.cols.length > 1 ? 's' : ''}. On mobile, columns stack on top of each other.</p>
        <button class="btn" id="pb_row_addcol" ${L.row.cols.length >= 4 ? 'disabled' : ''}>${icon('columns', 18)} Add column</button>`);
    } else if (t === 'col') {
      html = acc('Column', `<p class="muted" style="margin:0;font-size:14px">Drag elements into this column, or click an element in the Add panel to place it here.</p>`);
    } else {
      const e = L.el;
      const isText = ['headline', 'subheadline', 'paragraph', 'bullets'].includes(e.type);
      if (isText) {
        html += acc('Text', `<p class="muted" style="margin:0;font-size:14px">${icon('edit', 15)} Click the text on the page to type straight into it.</p>`);
        html += acc(`Typography${mob ? ' · mobile' : ''}`, `<div class="field" style="margin-bottom:10px"><label>Font size${mob ? ' (mobile only)' : ''}</label><div class="row" style="gap:10px">
            <input type="range" min="12" max="80" id="pb_prop_size_range" data-k="size" value="${msz(e, mob, 17)}" style="flex:1;accent-color:#155eef">
            <input class="input" type="number" id="pb_prop_size" data-k="size" value="${msz(e, mob, 17)}" style="width:84px"></div></div>
          ${e.type !== 'bullets' ? `<div class="field"><label>Weight</label><select class="select" id="pb_prop_weight" data-k="weight">${[[400, 'Regular'], [500, 'Medium'], [600, 'Semi-bold'], [700, 'Bold'], [800, 'Extra-bold']].map(([v, l]) => `<option value="${v}" ${+e.weight === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
          <label class="bold" style="font-size:14px;color:var(--ink-2)">Alignment</label><div class="st-seg" style="margin-top:6px">${[['left', 'alignL'], ['center', 'alignC'], ['right', 'alignR']].map(([a, ic]) => `<button id="pb_align_${a}" data-set="align" data-v="${a}" class="${(e.align || 'left') === a ? 'on' : ''}">${icon(ic, 18)}</button>`).join('')}</div>` : ''}`);
        html += acc('Text colour', sw('color', e.color, 'pb_color'));
      }
      if (e.type === 'button') {
        html += acc('Button', `<div class="field"><label>Button text</label><input class="input" id="pb_prop_btntext" data-k="text" value="${esc(e.text)}"></div>
          <div class="field" style="margin:0"><label>Sub-text</label><input class="input" id="pb_prop_btnsub" data-k="sub" value="${esc(e.sub || '')}" placeholder="Optional second line"></div>`);
        const tgt = { url: ['Website URL', 'https://'], scroll: ['Element', ''], phone: ['Phone number', '+44'], email: ['Email address', ''], popup: ['Popup', ''], download: ['File URL', ''], next: null }[e.action];
        html += acc('Action', `<div class="field"><label>When clicked</label><select class="select" id="pb_prop_action" data-k="action">${ACTIONS.map(([v, l]) => `<option value="${v}" ${e.action === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
          ${tgt ? (e.action === 'scroll' ? `<div class="field" style="margin:0"><label>Element</label><select class="select" id="pb_prop_target" data-k="target">${B.page.sections.map((s) => `<option ${e.target === s.name ? 'selected' : ''}>${esc(s.name || 'Section')}</option>`).join('')}</select></div>`
            : `<div class="field" style="margin:0"><label>${tgt[0]}</label><input class="input" id="pb_prop_target" data-k="target" value="${esc(e.target || '')}" placeholder="${tgt[1]}"></div>`)
            : `<p class="muted" style="margin:0;font-size:14px">Sends visitors to the next step in this funnel.</p>`}`);
        html += acc('Button colour', sw('bg', e.bg, 'pb_bg'));
        html += acc('Corners & alignment', `<div class="field"><label>Corner radius</label><input type="range" min="0" max="40" id="pb_prop_radius" data-k="radius" value="${e.radius ?? 10}" style="width:100%;accent-color:#155eef"></div>
          <div class="st-seg">${[['left', 'alignL'], ['center', 'alignC'], ['right', 'alignR']].map(([a, ic]) => `<button id="pb_align_${a}" data-set="align" data-v="${a}" class="${(e.align || 'left') === a ? 'on' : ''}">${icon(ic, 18)}</button>`).join('')}</div>`);
      }
      if (e.type === 'image') html += acc('Image', `<div style="border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-bottom:12px">${art(e.art, e.accent)}</div>
          <button class="btn" id="pb_prop_replace" style="width:100%;justify-content:center;margin-bottom:12px">${icon('image', 18)} Replace image</button>
          <div class="field" style="margin:0"><label>Alt text (for SEO & screen readers)</label><input class="input" id="pb_prop_alt" data-k="alt" value="${esc(e.alt || '')}" placeholder="Describe the image"></div>`);
      if (e.type === 'video') html += acc('Video', `<div class="field"><label>Video URL (YouTube, Vimeo, Wistia)</label><input class="input" id="pb_prop_url" data-k="url" value="${esc(e.url || '')}" placeholder="https://youtu.be/…"></div>
          <div class="field" style="margin:0"><label>Caption</label><input class="input" id="pb_prop_caption" data-k="caption" value="${esc(e.caption || '')}"></div>${toggle('pb_prop_autoplay', false, 'Autoplay (muted)')}`);
      if (e.type === 'form') html += acc('Form', `<div class="field"><label>Choose form</label><select class="select" id="pb_prop_form" data-k="form">${D.forms.map((f) => `<option value="${f.id}" ${e.form === f.id ? 'selected' : ''}>${esc(f.name)}</option>`).join('')}</select></div>
          <a class="row" style="gap:6px;font-weight:600;cursor:pointer" id="pb_prop_editform">${icon('external', 16)} Edit this form in the Form Builder</a>`);
      if (e.type === 'survey') html += acc('Survey', `<div class="field" style="margin:0"><label>Choose survey</label><select class="select" id="pb_prop_survey" data-k="survey">${SURVEYS.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div>`);
      if (e.type === 'calendar') html += acc('Calendar', `<div class="field" style="margin:0"><label>Choose calendar</label><select class="select" id="pb_prop_calendar" data-k="calendar">${D.calendars.map((k) => `<option value="${k.id}" ${e.calendar === k.id ? 'selected' : ''}>${esc(k.name)}</option>`).join('')}</select></div>`);
      if (e.type === 'feature') html += acc('Image feature', `<div class="field"><label>Title</label><input class="input" id="pb_prop_ftitle" data-k="title" value="${esc(e.title)}"></div><div class="field" style="margin:0"><label>Text</label><textarea class="input" rows="3" id="pb_prop_ftext" data-k="text">${esc(e.text)}</textarea></div>`);
      if (e.type === 'nav') html += acc('Navigation', `<div class="field"><label>Logo text</label><input class="input" id="pb_prop_logo" data-k="logo" value="${esc(e.logo)}"></div><div class="field" style="margin:0"><label>Phone number</label><input class="input" id="pb_prop_phone" data-k="phone" value="${esc(e.phone)}"></div>`) + acc('Brand colour', sw('accent', e.accent, 'pb_bg'));
      html += acc('Spacing', `<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 12px">${numIn('pb_prop_mt', 'mt', e.mt || 0, 'Margin top')}${numIn('pb_prop_mb', 'mb', e.mb ?? 18, 'Margin bottom')}</div>`);
      html += vis(e);
    }
    const name = t === 'el' ? LABEL[L.el.type] : t === 'sec' ? 'Section' : t === 'row' ? 'Row' : 'Column';
    const chipCol = { el: 'blue', sec: 'green', row: 'blue', col: 'purple' }[t];
    p.innerHTML = `<div class="hd"><span class="chip ${chipCol}" style="font-size:14px;height:30px">${name}</span><b style="font-size:15px;color:var(--muted);font-weight:500">settings</b><span class="spacer"></span><button class="btn ghost icon sm" id="pb_props_close">${icon('x', 18)}</button></div>${html}`;

    $('#pb_props_close').onclick = () => select(null);
    const apply = (k, v) => {
      if (k === 'size' && mob) o.msize = +v; else o[k] = ['size', 'mt', 'mb', 'pad', 'radius', 'weight'].includes(k) ? +v : v;
      if (k === 'size') $$('[data-k="size"]', p).forEach((i) => { if (document.activeElement !== i) i.value = v; });
    };
    $$('input[data-k],textarea[data-k]', p).forEach((inp) => (inp.oninput = () => {
      if (!inp.__r) { remember(); inp.__r = true; }
      apply(inp.dataset.k, inp.value);
      drawCanvas();
    }));
    $$('select[data-k]', p).forEach((s) => (s.onchange = () => { remember(); apply(s.dataset.k, s.value); drawCanvas(); drawProps(); }));
    $$('[data-sw]', p).forEach((b) => (b.onclick = () => { remember(); o[b.dataset.sw] = b.dataset.v; drawCanvas(); drawProps(); }));
    $$('[data-set]', p).forEach((b) => (b.onclick = () => { remember(); o[b.dataset.set] = b.dataset.v; drawCanvas(); drawProps(); }));
    const tv = (id, key) => { const b = $(id); if (b) b.onclick = () => { remember(); o[key] = !o[key]; drawCanvas(); drawProps(); }; };
    tv('#pb_vis_desktop', 'hideDesk');
    tv('#pb_vis_mobile', 'hideMob');
    const ap = $('#pb_prop_autoplay'); if (ap) ap.onclick = () => ap.classList.toggle('on');
    const addc = $('#pb_row_addcol'); if (addc) addc.onclick = () => { remember(); L.row.cols.push(col([])); drawCanvas(); drawProps(); };
    const rep = $('#pb_prop_replace'); if (rep) rep.onclick = () => KY.menu(rep, [['aligner', 'Invisalign aligner'], ['smile', 'Bright smile'], ['team', 'Our team'], ['clinic', 'Reception'], ['guide', 'Guide cover']].map(([k, l]) => ({ label: l, icon: 'image', onClick: () => { remember(); o.art = k; drawCanvas(); drawProps(); } })));
    const ef = $('#pb_prop_editform'); if (ef) ef.onclick = () => KY.go(`#/sites/forms/${o.form}`);
  }

  function pageSettings() {
    const seo = B.page.seo || (B.page.seo = { title: '', desc: '', author: '', keywords: '', image: '' });
    let tab = 'seo';
    const box = KY.modal({ title: 'Page settings', drawer: true, body: '<div id="pb_set_body"></div>',
      actions: [{ label: 'Cancel' }, { label: 'Save', primary: true, id: 'pb_set_save', onClick: (close) => {
        if (tab === 'seo') Object.assign(seo, { title: $('#pb_seo_title').value, desc: $('#pb_seo_desc').value, author: $('#pb_seo_author').value, keywords: $('#pb_seo_keywords').value, image: $('#pb_seo_image').value });
        close(); markDirty(); KY.toast('Page settings updated');
      } }] });
    box.style.width = '600px';
    const draw = () => {
      const b = $('#pb_set_body', box);
      b.innerHTML = `<div class="st-sub" style="margin:-6px 0 18px">${[['seo', 'SEO Meta Data'], ['tracking', 'Tracking Code'], ['css', 'Custom CSS']].map(([id, l]) => `<a id="pb_set_${id}" data-st="${id}" class="${tab === id ? 'on' : ''}">${l}</a>`).join('')}</div>` + (tab === 'seo' ? `
        <div class="field"><label>Title <span class="faint" id="pb_seo_tcount" style="font-weight:500"></span></label><input class="input" id="pb_seo_title" value="${esc(seo.title)}"></div>
        <div class="field"><label>Description <span class="faint" id="pb_seo_dcount" style="font-weight:500"></span></label><textarea class="input" rows="3" id="pb_seo_desc">${esc(seo.desc)}</textarea></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Author</label><input class="input" id="pb_seo_author" value="${esc(seo.author)}"></div>
          <div class="field"><label>Keywords</label><input class="input" id="pb_seo_keywords" value="${esc(seo.keywords)}"></div></div>
        <div class="field"><label>Social image URL</label><input class="input" id="pb_seo_image" value="${esc(seo.image)}" placeholder="https://…/share-image.jpg (1200 × 630)"></div>
        <label class="bold" style="font-size:14px;color:var(--ink-2)">Search result preview</label>
        <div class="card" id="pb_seo_preview" style="box-shadow:none;padding:16px 18px;margin-top:6px;font-family:Arial,sans-serif">
          <div style="font-size:13.5px;color:#202124">${esc(BIZ.name)}<br><span style="color:#4d5156">https://${esc(urlOf(B.owner, B.step))}</span></div>
          <div id="pb_seo_ptitle" style="color:#1a0dab;font-size:20px;margin:4px 0 3px;line-height:1.3"></div><div id="pb_seo_pdesc" style="color:#4d5156;font-size:14.5px;line-height:1.5"></div></div>`
        : tab === 'tracking' ? `<div class="field"><label>Header code</label><textarea class="input" rows="6" id="pb_track_head" placeholder="<!-- Code added to the <head> of this page only -->"></textarea></div>
        <div class="field"><label>Footer code</label><textarea class="input" rows="5" id="pb_track_body" placeholder="<!-- Code added before </body> on this page only -->"></textarea></div>
        <p class="muted" style="font-size:14px">Tip: code for every page (like your Meta Pixel) belongs in the ${B.kind === 'website' ? 'website' : 'funnel'} Settings tab instead.</p>`
        : `<div class="field"><label>Custom CSS</label><textarea class="input" rows="12" id="pb_css" style="font-family:ui-monospace,monospace" placeholder=".c-button { letter-spacing: .02em; }"></textarea></div>`);
      $$('[data-st]', b).forEach((a) => (a.onclick = () => { tab = a.dataset.st; draw(); }));
      if (tab === 'seo') {
        const upd = () => {
          const ti = $('#pb_seo_title').value, de = $('#pb_seo_desc').value;
          $('#pb_seo_ptitle').textContent = ti.length > 60 ? ti.slice(0, 58) + '…' : ti;
          $('#pb_seo_pdesc').textContent = de.length > 158 ? de.slice(0, 155) + '…' : de;
          $('#pb_seo_tcount').textContent = `· ${ti.length}/60`;
          $('#pb_seo_dcount').textContent = `· ${de.length}/160`;
        };
        $('#pb_seo_title').oninput = upd; $('#pb_seo_desc').oninput = upd; upd();
      }
    };
    draw();
  }

  function mediaLibrary() {
    const L = B.sel && locate(B.sel.id);
    const box = KY.modal({ title: 'Media library', wide: true, body: `<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:14px">${['aligner', 'smile', 'team', 'clinic', 'guide'].map((k) => `<div class="card" style="padding:8px;box-shadow:none;cursor:pointer" data-art="${k}">${art(k, '#0d9488')}<div class="muted" style="font-size:13px;margin-top:6px">${k}.png</div></div>`).join('')}
      <div class="card" style="padding:8px;box-shadow:none;border-style:dashed;display:grid;place-items:center;color:var(--muted)">${icon('upload', 26)}<span style="font-size:14px">Upload</span></div></div>` });
    $$('[data-art]', box).forEach((c) => (c.onclick = () => {
      box.closest('.overlay').remove();
      if (L && L.el && L.el.type === 'image') { remember(); L.el.art = c.dataset.art; drawCanvas(); drawProps(); } else KY.toast('Select an image element first, then choose a picture', 'warn');
    }));
  }

  // ---------------------------------------------------------------- forms
  const FPAL = [
    ['Standard', [['first_name', 'First Name', 'text', 'First name'], ['last_name', 'Last Name', 'text', 'Last name'], ['full_name', 'Full Name', 'text', 'Full name'], ['phone', 'Phone', 'phone', '+44 7700 900000'], ['email', 'Email', 'email', 'you@example.com'], ['dob', 'Date of Birth', 'date', 'DD/MM/YYYY'], ['address', 'Address', 'text', 'Street address'], ['postal_code', 'Postal Code', 'text', 'Postcode'], ['organization', 'Organization', 'text', 'Company name']]],
    ['Custom fields', [['treatment', 'Treatment interest', 'dropdown', 'Select an option', ['Invisalign', 'Teeth whitening', 'Dental implants', 'Check-up']], ['last_visit', 'Last visit date', 'date', 'DD/MM/YYYY'], ['preferred_time', 'Preferred appointment time', 'radio', '', ['Morning', 'Afternoon', 'Evening']], ['heard', 'How did you hear about us?', 'dropdown', 'Select an option', ['Google', 'Facebook or Instagram', 'Friend or family']]]],
    ['Customized', [['single', 'Single Line', 'text', 'Type here'], ['multi', 'Multi Line', 'textarea', 'Type here'], ['dropdown', 'Dropdown', 'dropdown', 'Select an option'], ['radio', 'Radio', 'radio', ''], ['checkbox', 'Checkbox', 'checkbox', ''], ['date', 'Date Picker', 'date', 'DD/MM/YYYY'], ['file', 'File Upload', 'file', ''], ['signature', 'Signature', 'signature', ''], ['terms', 'Terms & Conditions', 'terms', ''], ['captcha', 'Captcha', 'captcha', ''], ['html', 'HTML / Text', 'html', ''], ['submit', 'Submit Button', 'submit', '']]],
  ];
  const FICON = { text: 'type', phone: 'phone', email: 'mail', date: 'calendar', dropdown: 'chevron', radio: 'radio', checkbox: 'task', textarea: 'alignL', file: 'upload', signature: 'signature', terms: 'check', captcha: 'shield', html: 'code', submit: 'cursor' };
  let formsSub = 'builder';

  function formsList(view) {
    const subs = [['builder', 'Builder'], ['analyze', 'Analyze'], ['submissions', 'Submissions']];
    view.innerHTML = `${pageHead('Forms', `<button class="btn primary" id="fm_new">${icon('plus', 18)} Add Form</button>`)}
      <div class="st-sub">${subs.map(([id, l]) => `<a id="fm_sub_${id}" data-fs="${id}" class="${formsSub === id ? 'on' : ''}">${l}</a>`).join('')}</div><div id="fm_body"></div>`;
    $$('[data-fs]', view).forEach((a) => (a.onclick = () => { formsSub = a.dataset.fs; formsList(view); }));
    $('#fm_new').onclick = () => {
      const box = KY.modal({ title: 'Add form', wide: true, body: `<div class="grid" style="grid-template-columns:repeat(3,1fr);gap:14px">
        ${[['blank', 'Blank form', 'Start with just a submit button.', 'plus'], ['tpl_dental', 'Dental Enquiry', 'Name, phone, email and treatment.', 'tooth'], ['tpl_contact', 'Contact Us', 'Name, email, phone and message.', 'mail']].map(([id, n, d, ic]) => `
          <div class="st-pick" id="fm_new_${id}" data-nf="${id}">${icon(ic, 26)}<div class="bold" style="margin:10px 0 4px">${n}</div><div class="muted" style="font-size:14px">${d}</div></div>`).join('')}</div>` });
      $$('[data-nf]', box).forEach((c) => (c.onclick = () => {
        const id = 'fm' + (D.forms.length + 1);
        const src = c.dataset.nf === 'tpl_dental' ? FORM_DEFS.fm1 : c.dataset.nf === 'tpl_contact' ? FORM_DEFS.fm3 : { fields: [fld('submit', 'submit', 'Submit')] };
        D.forms.unshift({ id, name: c.dataset.nf === 'blank' ? 'Untitled Form' : c.querySelector('.bold').textContent, submissions: 0, updated: 'Just now', style: { btn: '#0d9488', bg: '#ffffff', width: 560, labels: true }, opts: { onSubmit: 'message', message: 'Thank you! We have received your details.', url: '', notify: true, sticky: true, logic: [] }, ...clone(src) });
        box.closest('.overlay').remove(); KY.go(`#/sites/forms/${id}`);
      }));
    };
    const b = $('#fm_body');
    if (formsSub === 'analyze') {
      const views = { fm1: 4210, fm2: 1880, fm3: 1340 };
      b.innerHTML = `<div class="card"><table class="t"><thead><tr><th>Form</th><th>Views</th><th>Submissions</th><th>Conversion</th></tr></thead><tbody>
        ${D.forms.map((f) => `<tr><td class="bold">${esc(f.name)}</td><td class="st-num">${num(views[f.id] || 0)}</td><td class="st-num">${num(f.submissions)}</td><td class="st-num bold">${pct(f.submissions, views[f.id] || 0)}</td></tr>`).join('')}</tbody></table></div>`;
      return;
    }
    if (formsSub === 'submissions') {
      const subs2 = [['c1', 'fm1', '21 Oct 2026, 10:02'], ['c2', 'fm3', '20 Oct 2026, 16:40'], ['c5', 'fm1', '16 Oct 2026, 19:12'], ['c11', 'fm2', '9 Oct 2026, 08:55'], ['c13', 'fm3', '28 Sep 2026, 12:31']];
      b.innerHTML = `<div class="card"><table class="t"><thead><tr><th>Name</th><th>Email</th><th>Form</th><th>Submitted</th></tr></thead><tbody>
        ${subs2.map(([c, f, t]) => { const ct = D.contacts.find((x) => x.id === c); return `<tr class="click" onclick="KY.go('#/contacts/detail/${c}')"><td><div class="row">${KY.avatar(ct.name, 30)}<b>${esc(ct.name)}</b></div></td><td>${esc(ct.email)}</td><td>${esc(formById(f).name)}</td><td class="muted">${t}</td></tr>`; }).join('')}</tbody></table></div>`;
      return;
    }
    b.innerHTML = `<div class="card"><table class="t" id="fm_table"><thead><tr><th>Name</th><th>Fields</th><th>Submissions</th><th>Last updated</th><th style="width:60px"></th></tr></thead><tbody>
      ${D.forms.map((f) => `<tr class="click" id="fm_row_${f.id}" data-id="${f.id}"><td><div class="row"><span style="width:38px;height:38px;border-radius:9px;background:var(--blue-soft);color:var(--blue);display:grid;place-items:center">${icon('form', 20)}</span><b>${esc(f.name)}</b></div></td>
        <td>${f.fields.filter((x) => x.type !== 'submit').length}</td><td class="st-num">${num(f.submissions)}</td><td class="muted">${esc(f.updated)}</td><td><button class="btn ghost icon sm">${icon('more', 18)}</button></td></tr>`).join('')}</tbody></table></div>`;
    $$('tr.click', b).forEach((tr) => (tr.onclick = () => KY.go(`#/sites/forms/${tr.dataset.id}`)));
  }

  const FB = {};
  function formBuilder(view, form) {
    Object.assign(FB, { form, sel: null, tab: 'fields' });
    const root = document.createElement('div');
    root.className = 'st-full';
    root.id = 'fb_root';
    root.innerHTML = `<div class="pb-top">
        <button class="btn ghost icon" id="fb_back" title="Back">${icon('left', 22)}</button>
        <input class="input" id="fb_name" value="${esc(form.name)}" style="width:300px;font-weight:700;border-color:transparent">
        <span class="chip green" id="fb_status">All changes saved</span><span class="spacer"></span>
        <button class="btn" id="fb_preview">${icon('eye', 18)} Preview</button>
        <button class="btn" id="fb_integrate">${icon('code', 18)} Integrate</button>
        <button class="btn primary" id="fb_save">Save</button></div>
      <div class="pb-body"><div class="pb-panel" id="fb_left" style="width:350px"></div>
        <div class="pb-stage" id="fb_stage"><div class="card" id="fb_card" style="margin:0 auto;padding:30px 34px"></div></div>
        <div class="pb-props" id="fb_props"></div></div>`;
    view.appendChild(root);
    const dirty = () => { const s = $('#fb_status'); s.textContent = 'Unsaved changes'; s.className = 'chip amber'; };
    FB.dirty = dirty;
    $('#fb_back').onclick = () => KY.go('#/sites/forms');
    $('#fb_name').oninput = (e) => { form.name = e.target.value; dirty(); };
    $('#fb_save').onclick = () => { $('#fb_status').textContent = 'All changes saved'; $('#fb_status').className = 'chip green'; form.updated = 'Just now'; KY.toast('Form saved'); };
    $('#fb_preview').onclick = () => KY.modal({ title: `Preview · ${form.name}`, body: `<div class="lp" style="padding:6px">${formHtml(form.id)}</div>` });
    $('#fb_integrate').onclick = () => integrate(form);
    $('#fb_stage').onclick = (e) => { const f = e.target.closest('[data-fi]'); if (f) { FB.sel = +f.dataset.fi; drawFForm(); drawFProps(); } };
    drawFLeft(); drawFForm(); drawFProps();
  }

  function drawFLeft() {
    const form = FB.form, p = $('#fb_left');
    const tabs = [['fields', 'Fields'], ['styles', 'Styles'], ['options', 'Options']];
    let inner = '';
    if (FB.tab === 'fields') {
      inner = `<div class="search" style="margin-top:14px"><span>${icon('search', 18)}</span><input class="input" placeholder="Search fields"></div>` + FPAL.map(([g, items]) => `<div class="st-group">${g}</div><div class="grid" style="grid-template-columns:1fr 1fr;gap:8px">
        ${items.map(([k, l, t]) => `<div class="st-tile" style="flex-direction:row;justify-content:flex-start;padding:10px 12px;cursor:pointer;text-align:left" id="fb_add_${k}" data-af="${k}"><span class="faint">${icon(FICON[t] || 'type', 18)}</span>${l}</div>`).join('')}</div>`).join('');
    } else if (FB.tab === 'styles') {
      inner = `<div class="st-acc" style="padding:16px 0"><h4>Button colour</h4><div class="st-sw">${SWATCHES.slice(2).map((c, i) => `<button id="fb_btn_${i}" data-fbtn="${c}" class="${form.style.btn === c ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div></div>
        <div class="st-acc" style="padding:16px 0"><h4>Form background</h4><div class="st-sw">${['#ffffff', '#f9fafb', '#eef8f6', '#fdf2f8', '#eff6ff'].map((c, i) => `<button id="fb_bgc_${i}" data-fbg="${c}" class="${form.style.bg === c ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div></div>
        <div class="st-acc" style="padding:16px 0"><h4>Form width</h4><div class="st-seg">${[[480, 'Narrow'], [560, 'Standard'], [680, 'Wide']].map(([w, l]) => `<button id="fb_w_${w}" data-fw="${w}" class="${form.style.width === w ? 'on' : ''}">${l}</button>`).join('')}</div></div>
        <div class="st-acc" style="padding:16px 0;border:0"><h4>Labels</h4>${toggle('fb_labels', form.style.labels, 'Show field labels')}</div>`;
    } else {
      const o = form.opts;
      inner = `<div class="st-acc" style="padding:16px 0"><h4>On submit</h4><div class="st-seg" style="margin-bottom:12px">
          <button id="fb_os_message" data-os="message" class="${o.onSubmit === 'message' ? 'on' : ''}">Show message</button><button id="fb_os_url" data-os="url" class="${o.onSubmit === 'url' ? 'on' : ''}">Open URL</button></div>
          ${o.onSubmit === 'message' ? `<textarea class="input" rows="3" id="fb_os_text">${esc(o.message)}</textarea>` : `<input class="input" id="fb_os_link" value="${esc(o.url)}" placeholder="https://…">`}</div>
        <div class="st-acc" style="padding:16px 0"><h4>Conditional logic</h4><div id="fb_rules">${o.logic.map((r, i) => `<div class="card" style="box-shadow:none;padding:10px 12px;margin-bottom:8px;font-size:14px" id="fb_rule_${i}"><b>IF</b> ${esc(r.ifLabel)} <b>is</b> ${esc(r.val)}<br><b>THEN ${r.act.toUpperCase()}</b> ${esc(r.targetLabel)}</div>`).join('') || '<p class="muted" style="font-size:14px;margin:0 0 10px">Show or hide fields based on earlier answers.</p>'}</div>
          <button class="btn sm" id="fb_logic_add">${icon('plus', 16)} Add rule</button></div>
        <div class="st-acc" style="padding:16px 0"><h4>Notifications</h4>${toggle('fb_notify', o.notify, 'Email a notification on each submission')}
          <select class="select" id="fb_notify_to"><option>All users</option>${D.team.map((t) => `<option>${esc(t.name)}</option>`).join('')}</select></div>
        <div class="st-acc" style="padding:16px 0"><h4>Sticky contact</h4>${toggle('fb_sticky', o.sticky, 'Pre-fill details people already gave you')}</div>
        <div class="st-acc" style="padding:16px 0;border:0"><h4>Tags & follow-up</h4><p class="muted" style="font-size:14px;margin:0 0 10px">To tag the contact, send a text or create an opportunity, use a workflow with the <b>Form Submitted</b> trigger.</p>
          <button class="btn sm" id="fb_wf">${icon('automation', 16)} Create workflow</button></div>`;
    }
    p.innerHTML = `<div class="st-ptabs">${tabs.map(([id, l]) => `<button id="fb_tab_${id}" data-ft="${id}" class="${FB.tab === id ? 'on' : ''}">${l}</button>`).join('')}</div><div style="padding:0 18px 30px">${inner}</div>`;
    $$('[data-ft]', p).forEach((b) => (b.onclick = () => { FB.tab = b.dataset.ft; drawFLeft(); }));
    $$('[data-af]', p).forEach((t) => (t.onclick = () => addField(t.dataset.af)));
    $$('[data-fbtn]', p).forEach((b) => (b.onclick = () => { form.style.btn = b.dataset.fbtn; FB.dirty(); drawFLeft(); drawFForm(); }));
    $$('[data-fbg]', p).forEach((b) => (b.onclick = () => { form.style.bg = b.dataset.fbg; FB.dirty(); drawFLeft(); drawFForm(); }));
    $$('[data-fw]', p).forEach((b) => (b.onclick = () => { form.style.width = +b.dataset.fw; FB.dirty(); drawFLeft(); drawFForm(); }));
    $$('[data-os]', p).forEach((b) => (b.onclick = () => { form.opts.onSubmit = b.dataset.os; FB.dirty(); drawFLeft(); }));
    const on = (id, fn) => { const x = $(id, p); if (x) fn(x); };
    on('#fb_labels', (x) => (x.onclick = () => { form.style.labels = !form.style.labels; drawFLeft(); drawFForm(); }));
    on('#fb_os_text', (x) => (x.oninput = () => { form.opts.message = x.value; FB.dirty(); }));
    on('#fb_os_link', (x) => (x.oninput = () => { form.opts.url = x.value; FB.dirty(); }));
    on('#fb_notify', (x) => (x.onclick = () => { form.opts.notify = !form.opts.notify; x.classList.toggle('on'); }));
    on('#fb_sticky', (x) => (x.onclick = () => { form.opts.sticky = !form.opts.sticky; x.classList.toggle('on'); }));
    on('#fb_wf', (x) => (x.onclick = () => KY.go('#/automation')));
    on('#fb_logic_add', (x) => (x.onclick = () => logicRule()));
  }

  function addField(k) {
    const form = FB.form;
    const def = FPAL.flatMap(([, items]) => items).find((x) => x[0] === k);
    const [key, label, type, ph, options] = def;
    const std = FPAL[0][1].some((x) => x[0] === k) || FPAL[1][1].some((x) => x[0] === k);
    const exist = form.fields.findIndex((f) => f.key === key);
    if (std && exist > -1) { FB.sel = exist; drawFForm(); drawFProps(); KY.toast(`${label} is already on this form`, 'warn'); return; }
    if (type === 'submit' && form.fields.some((f) => f.type === 'submit')) { KY.toast('This form already has a submit button', 'warn'); return; }
    const labels = { radio: 'Choose one', checkbox: 'Select all that apply', dropdown: 'Choose an option', terms: 'I agree to the terms and conditions.', html: 'Add a short note or instructions here.', single: 'Your question', multi: 'Your question', file: 'Upload a file', signature: 'Signature', date: 'Pick a date', submit: 'Submit' };
    const f = fld(std ? key : `${key}_${uid++}`, type, std ? label : labels[k] || label, ph, { custom: FPAL[1][1].some((x) => x[0] === k) || !std, options: options ? [...options] : ['radio', 'checkbox', 'dropdown'].includes(type) ? ['Option 1', 'Option 2', 'Option 3'] : undefined });
    const sub = form.fields.findIndex((x) => x.type === 'submit' || (type !== 'terms' && x.type === 'terms'));
    const at = type === 'submit' || sub < 0 ? form.fields.length : sub;
    form.fields.splice(at, 0, f);
    FB.sel = at;
    FB.dirty(); drawFForm(); drawFProps();
    const n = $(`#fb_f_${f.key}`);
    if (n) { n.scrollIntoView({ block: 'center', behavior: 'smooth' }); n.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 }); }
  }

  function drawFForm() {
    const form = FB.form, c = $('#fb_card');
    c.style.width = form.style.width + 68 + 'px';
    c.style.background = form.style.bg;
    const targets = new Set(form.opts.logic.map((r) => r.target));
    c.innerHTML = `<div class="lp"><div class="lp-form" style="border:0;box-shadow:none;padding:0;background:transparent">${form.fields.map((f, i) => `
      <div class="fb-field ${FB.sel === i ? 'sel' : ''}" id="fb_f_${f.key}" data-fi="${i}" style="${f.hidden ? 'opacity:.45' : ''}">
        ${targets.has(f.key) ? '<span class="fb-badge">Conditional</span>' : f.hidden ? '<span class="fb-badge" style="background:#f2f4f7;color:#344054">Hidden</span>' : f.custom ? '<span class="fb-badge" style="background:#ecfdf3;color:#027a48">Custom field</span>' : ''}
        ${fieldHtml({ ...f, hidden: false }, form)}</div>`).join('')}</div></div>`;
  }

  function drawFProps() {
    const form = FB.form, p = $('#fb_props');
    const f = form.fields[FB.sel];
    if (!f) {
      p.innerHTML = `<div class="hd">${icon('settings', 20)}<b>Field settings</b></div><div class="empty" style="padding:56px 28px"><div class="faint">${icon('cursor', 40)}</div><div class="big" style="font-size:17px;margin-top:10px">Select a field</div>Click any field on the form to edit its label, placeholder and rules.</div>`;
      return;
    }
    const choice = ['dropdown', 'radio', 'checkbox'].includes(f.type);
    const textLike = ['text', 'phone', 'email', 'date', 'textarea', 'dropdown'].includes(f.type);
    p.innerHTML = `<div class="hd"><span class="chip blue" style="font-size:14px;height:30px">${icon(FICON[f.type] || 'type', 14)} ${f.type === 'submit' ? 'Submit button' : f.custom ? 'Custom field' : 'Standard field'}</span><span class="spacer"></span><button class="btn ghost icon sm" id="fb_prop_close">${icon('x', 18)}</button></div>
      <div class="st-acc"><div class="field"><label>${f.type === 'submit' ? 'Button text' : f.type === 'terms' || f.type === 'html' ? 'Text' : 'Label'}</label>${f.type === 'terms' || f.type === 'html' ? `<textarea class="input" rows="3" id="fb_prop_label">${esc(f.label)}</textarea>` : `<input class="input" id="fb_prop_label" value="${esc(f.label)}">`}</div>
        ${textLike ? `<div class="field"><label>Placeholder</label><input class="input" id="fb_prop_ph" value="${esc(f.ph || '')}"></div>` : ''}
        ${choice ? `<div class="field"><label>Options (one per line)</label><textarea class="input" rows="4" id="fb_prop_options">${esc((f.options || []).join('\n'))}</textarea></div>` : ''}
        ${f.type !== 'submit' && f.type !== 'html' ? `<div class="field" style="margin:0"><label>Query key</label><input class="input" id="fb_prop_qkey" value="${esc(f.qkey)}" style="font-family:ui-monospace,monospace;font-size:14px"></div>` : ''}</div>
      ${f.type !== 'submit' && f.type !== 'html' ? `<div class="st-acc"><h4>Rules</h4>${toggle('fb_prop_req', f.req, 'Required')}${toggle('fb_prop_hidden', f.hidden, 'Hidden field')}
        <p class="muted" style="font-size:13.5px;margin:6px 0 0">Hidden fields can capture values from the page URL, such as a UTM source.</p></div>` : ''}
      ${f.custom ? `<div class="st-acc"><p class="muted" style="margin:0;font-size:14px">${icon('user', 15)} Answers are saved to this custom field on the contact record.</p></div>` : ''}
      <div style="padding:16px 18px"><button class="btn" id="fb_prop_del" style="color:var(--red)">${icon('trash', 18)} Remove field</button></div>`;
    const ch = () => { FB.dirty(); drawFForm(); };
    $('#fb_prop_close').onclick = () => { FB.sel = null; drawFForm(); drawFProps(); };
    $('#fb_prop_label').oninput = (e) => { f.label = e.target.value; ch(); };
    const ph = $('#fb_prop_ph'); if (ph) ph.oninput = () => { f.ph = ph.value; ch(); };
    const op = $('#fb_prop_options'); if (op) op.oninput = () => { f.options = op.value.split('\n').filter(Boolean); ch(); };
    const qk = $('#fb_prop_qkey'); if (qk) qk.oninput = () => { f.qkey = qk.value; };
    const rq = $('#fb_prop_req'); if (rq) rq.onclick = () => { f.req = !f.req; rq.classList.toggle('on', f.req); ch(); };
    const hd = $('#fb_prop_hidden'); if (hd) hd.onclick = () => { f.hidden = !f.hidden; hd.classList.toggle('on', f.hidden); ch(); };
    $('#fb_prop_del').onclick = () => { form.fields.splice(FB.sel, 1); FB.sel = null; ch(); drawFProps(); };
  }

  function logicRule() {
    const form = FB.form;
    const srcs = form.fields.filter((f) => ['dropdown', 'radio', 'checkbox'].includes(f.type));
    const tgts = form.fields.filter((f) => !['submit'].includes(f.type));
    if (!srcs.length) return KY.toast('Add a dropdown or radio field first', 'warn');
    const lastAdded = [...tgts].reverse().find((f) => f.key !== srcs[0].key && f.type !== 'terms') || tgts[0];
    const box = KY.modal({ title: 'Add conditional rule', body: `
      <div class="field"><label>IF this field</label><select class="select" id="fb_lg_if">${srcs.map((f) => `<option value="${f.key}">${esc(f.label)}</option>`).join('')}</select></div>
      <div class="grid" style="grid-template-columns:120px 1fr;gap:0 12px"><div class="field"><label>Condition</label><select class="select"><option>is</option><option>is not</option></select></div>
        <div class="field"><label>Value</label><select class="select" id="fb_lg_val"></select></div></div>
      <div class="grid" style="grid-template-columns:120px 1fr;gap:0 12px"><div class="field"><label>THEN</label><select class="select" id="fb_lg_act"><option value="show">Show</option><option value="hide">Hide</option></select></div>
        <div class="field"><label>This field</label><select class="select" id="fb_lg_target">${tgts.map((f) => `<option value="${f.key}" ${f.key === lastAdded.key ? 'selected' : ''}>${esc(f.label)}</option>`).join('')}</select></div></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Save rule', primary: true, id: 'fb_lg_save', onClick: (close, b) => {
        const s = form.fields.find((f) => f.key === $('#fb_lg_if', b).value), t = form.fields.find((f) => f.key === $('#fb_lg_target', b).value);
        form.opts.logic.push({ ifKey: s.key, ifLabel: s.label, val: $('#fb_lg_val', b).value, act: $('#fb_lg_act', b).value, target: t.key, targetLabel: t.label });
        close(); FB.dirty(); drawFLeft(); drawFForm(); KY.toast('Conditional rule added');
      } }] });
    const fillVals = () => { const s = form.fields.find((f) => f.key === $('#fb_lg_if', box).value); $('#fb_lg_val', box).innerHTML = (s.options || []).map((o) => `<option>${esc(o)}</option>`).join(''); };
    $('#fb_lg_if', box).onchange = fillVals;
    fillVals();
  }

  function integrate(form) {
    let layout = 'inline';
    const fid = { fm1: 'Kp3vR8xT2mQ9aLw', fm2: 'Hn7cW2qZ5tB1sYe', fm3: 'Ld4mF9rJ6kP2vXa' }[form.id] || 'Qz8nT3wK1cR5mBd';
    const box = KY.modal({ title: `Integrate · ${form.name}`, wide: true, body: '<div id="fb_int_body"></div>' });
    box.style.width = '980px';
    const draw = () => {
      const L = { full: 'FULL_PAGE', popup: 'POPUP', inline: 'INLINE', polite: 'POLITE_SLIDE_IN', sticky: 'STICKY_SIDEBAR' }[layout];
      const code = `<iframe\n  src="https://link.kyntlo.ai/widget/form/${fid}"\n  style="width:100%;height:100%;border:none;border-radius:4px"\n  id="${layout}-${fid}"\n  data-layout="{'id':'${L}'}"\n  data-form-name="${form.name}"\n  data-height="620"\n  title="${form.name}">\n</iframe>\n<script src="https://link.kyntlo.ai/js/form_embed.js"></script>`;
      $('#fb_int_body', box).innerHTML = `<div style="display:grid;grid-template-columns:300px 1fr;gap:24px">
        <div><div class="bold" style="margin-bottom:10px">Choose a layout</div>${[['full', 'Embed full page', 'Fills the whole page'], ['inline', 'Inline', 'Sits inside your page content'], ['popup', 'Popup', 'Opens over the page'], ['polite', 'Polite slide-in', 'Slides in from the corner'], ['sticky', 'Sticky sidebar', 'Stays on screen as people scroll']].map(([k, l, d]) => `
          <div class="st-pick ${layout === k ? 'on' : ''}" style="padding:12px 14px;margin-bottom:8px" id="fb_int_${k}" data-lay="${k}"><div class="bold" style="font-size:15px">${l}</div><div class="muted" style="font-size:13.5px">${d}</div></div>`).join('')}</div>
        <div><div class="field"><label>Link to form</label><div class="row"><input class="input" readonly value="https://link.kyntlo.ai/widget/form/${fid}"><button class="btn" id="fb_copy_link">${icon('copy', 18)} Copy</button></div></div>
          <div class="row" style="margin-bottom:6px"><label class="bold" style="font-size:14px;color:var(--ink-2)">Embed code</label><span class="spacer"></span><button class="btn sm primary" id="fb_copy_embed">${icon('copy', 16)} Copy embed code</button></div>
          <div class="st-code" id="fb_embed_code">${esc(code)}</div>
          <p class="muted" style="font-size:14px;margin:14px 0 0">${icon('help', 15)} Using a Kyntlo funnel or website? You don't need code: add a <b>Form</b> element in the page builder and pick this form.</p></div></div>`;
      $$('[data-lay]', box).forEach((c) => (c.onclick = () => { layout = c.dataset.lay; draw(); }));
      $('#fb_copy_link', box).onclick = () => KY.toast('Form link copied');
      $('#fb_copy_embed', box).onclick = () => KY.toast('Embed code copied');
    };
    draw();
  }

  // ---------------------------------------------------------------- surveys
  function surveysList(view) {
    view.innerHTML = `${pageHead('Surveys', `<button class="btn primary" id="sv_new">${icon('plus', 18)} Add Survey</button>`, '<span class="sub">Multi-step questions, one slide at a time.</span>')}
      <div class="card"><table class="t"><thead><tr><th>Name</th><th>Slides</th><th>Submissions</th><th>Last updated</th></tr></thead><tbody>
      ${SURVEYS.map((s) => `<tr class="click" id="sv_row_${s.id}" data-id="${s.id}"><td><div class="row"><span style="width:38px;height:38px;border-radius:9px;background:#f4f3ff;color:#5925dc;display:grid;place-items:center">${icon('task', 20)}</span><b>${esc(s.name)}</b></div></td>
        <td>${s.slides.length}</td><td class="st-num">${num(s.submissions)}</td><td class="muted">${esc(s.updated)}</td></tr>`).join('')}</tbody></table></div>`;
    $$('tr.click', view).forEach((tr) => (tr.onclick = () => KY.go(`#/sites/surveys/${tr.dataset.id}`)));
    $('#sv_new').onclick = () => KY.toast('Pick "Blank survey" or a template to start', 'warn');
  }

  function surveyBuilder(view, s) {
    let cur = 0;
    const root = document.createElement('div');
    root.className = 'st-full';
    root.id = 'sv_root';
    view.appendChild(root);
    const draw = () => {
      const slide = s.slides[cur];
      root.innerHTML = `<div class="pb-top"><button class="btn ghost icon" id="sv_back">${icon('left', 22)}</button><div class="ttl"><b>${esc(s.name)}</b><small>Survey</small></div><span class="spacer"></span>
          <button class="btn" id="sv_integrate">${icon('code', 18)} Integrate</button><button class="btn primary" id="sv_save">Save</button></div>
        <div class="pb-body"><div class="pb-panel"><div class="row" style="padding:16px 18px"><b style="font-size:17px">Slides</b></div><div style="padding:0 12px">
          ${s.slides.map((sl, i) => `<div class="st-step ${i === cur ? 'on' : ''}" id="sv_slide_${i + 1}" data-sl="${i}"><span class="n">${i + 1}</span><div><div class="bold">Slide ${i + 1}</div><div class="muted" style="font-size:13px">${esc(sl.name)} · ${sl.fields.filter((f) => f.type !== 'submit').length} field${sl.fields.length > 1 ? 's' : ''}</div></div></div>`).join('')}
          <button class="btn" id="sv_add_slide" style="width:100%;justify-content:center;border-style:dashed">${icon('plus', 18)} Add slide</button></div></div>
        <div class="pb-stage"><div class="card sv-big" style="max-width:720px;margin:20px auto;padding:34px 40px"><div class="lp">
          ${s.progress ? `<div class="row" style="margin-bottom:22px"><div style="flex:1;height:8px;border-radius:4px;background:#e4e7ec"><div style="width:${((cur + 1) / s.slides.length) * 100}%;height:100%;border-radius:4px;background:#0d9488"></div></div><span class="muted" style="font-size:14px">${cur + 1} / ${s.slides.length}</span></div>` : ''}
          <div class="lp-form" style="border:0;box-shadow:none;padding:0">${slide.fields.map((f) => fieldHtml(f, { style: { btn: '#0d9488', labels: true } })).join('')}</div>
          ${slide.fields.some((f) => f.type === 'submit') ? '' : `<div class="row" style="margin-top:16px"><span class="spacer"></span><button class="btn primary" style="background:#0d9488;border-color:#0d9488">Next ${icon('right', 18)}</button></div>`}</div></div></div>
        <div class="pb-props"><div class="hd">${icon('settings', 20)}<b>Survey options</b></div>
          <div class="st-acc"><h4>Slide ${cur + 1} logic</h4>${slide.logic ? `<div class="card" style="box-shadow:none;padding:10px 12px;font-size:14px" id="sv_logic">${icon('split', 15)} ${esc(slide.logic)}</div>` : '<p class="muted" style="font-size:14px;margin:0">No rules on this slide.</p>'}
            <button class="btn sm" id="sv_logic_add" style="margin-top:10px">${icon('plus', 16)} Add jump / disqualify rule</button></div>
          <div class="st-acc"><h4>Display</h4>${toggle('sv_progress', s.progress, 'Show progress bar')}${toggle('sv_autonav', s.autoNav, 'Go to next slide automatically')}</div>
          <div class="st-acc" style="border:0"><p class="muted" style="font-size:14px;margin:0">Embed it like a form: <b>Integrate</b> gives you a link and embed code, or add a <b>Survey</b> element in the page builder.</p></div></div></div>`;
      $('#sv_back').onclick = () => KY.go('#/sites/surveys');
      $('#sv_save').onclick = () => KY.toast('Survey saved');
      $('#sv_integrate').onclick = () => integrate({ id: 'sv1', name: s.name });
      $$('[data-sl]', root).forEach((d) => (d.onclick = () => { cur = +d.dataset.sl; draw(); }));
      $('#sv_add_slide').onclick = () => { s.slides.push({ name: 'New slide', fields: [fld('q' + uid++, 'radio', 'Your question', '', { options: ['Option 1', 'Option 2'] })] }); cur = s.slides.length - 1; draw(); };
      $('#sv_progress').onclick = () => { s.progress = !s.progress; draw(); };
      $('#sv_autonav').onclick = () => { s.autoNav = !s.autoNav; draw(); };
      $('#sv_logic_add').onclick = () => KY.toast('Choose an answer, then "Jump to slide" or "Disqualify"', 'warn');
    };
    draw();
  }

  // ---------------------------------------------------------------- chat widget
  const CHAT = [{ id: 'cw1', name: 'Bloom Website Chat', type: 'live', color: '#0d9488', bubble: 'text', bubbleText: 'Chat with us', pos: 'right', header: 'Bloom Dental Studio',
    greeting: 'Hi there! Have a question about treatments or booking? Send us a message and we will reply here.', prompt: true, promptText: 'Hi! Thinking about Invisalign? Ask us anything.', delay: 5,
    fields: { name: true, phone: true, email: false, message: true }, consent: true, ai: false, thanks: 'Thanks! A member of our team will reply in a few minutes.', updated: '1 month ago', installed: false }];
  D.chatWidgets = CHAT;
  let cwOpen = 'type';

  function chatList(view) {
    view.innerHTML = `${pageHead('Chat Widget', `<button class="btn primary" id="cw_new">${icon('plus', 18)} New Chat Widget</button>`, '<span class="sub">Capture website visitors as contacts and keep the conversation going.</span>')}
      <div class="card"><table class="t"><thead><tr><th>Name</th><th>Type</th><th>Installed on</th><th>Last updated</th></tr></thead><tbody>
      ${CHAT.map((c) => `<tr class="click" id="cw_row_${c.id}" data-id="${c.id}"><td><div class="row"><span style="width:38px;height:38px;border-radius:50%;background:${c.color};color:#fff;display:grid;place-items:center">${icon('chat', 20)}</span><b>${esc(c.name)}</b></div></td>
        <td>${c.type === 'live' ? 'Live Chat' : 'SMS & Email'}</td><td class="muted">${c.installed ? 'bloomdental.co.uk' : 'Kyntlo funnels & website'}</td><td class="muted">${esc(c.updated)}</td></tr>`).join('')}</tbody></table></div>`;
    $$('tr.click', view).forEach((tr) => (tr.onclick = () => KY.go(`#/sites/chat-widget/${tr.dataset.id}`)));
    $('#cw_new').onclick = () => KY.modal({ title: 'New chat widget', body: `<div class="field"><label>Widget name</label><input class="input" id="cw_new_name" placeholder="e.g. Kensington clinic chat"></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Create', primary: true, id: 'cw_new_create', onClick: (close, b) => {
        const c = { ...clone(CHAT[0]), id: 'cw' + (CHAT.length + 1), name: $('#cw_new_name', b).value || 'New chat widget', updated: 'Just now' };
        CHAT.push(c); close(); KY.go(`#/sites/chat-widget/${c.id}`);
      } }] });
  }

  function chatBuilder(view, cw) {
    let open = true, chat = [];
    view.innerHTML = `<div class="st-crumb"><a id="cw_back">Chat Widget</a>${icon('right', 16)}<span>${esc(cw.name)}</span></div>
      <div class="page-head" style="margin-bottom:16px"><h1>${esc(cw.name)}</h1><div class="actions"><button class="btn" id="cw_getcode">${icon('code', 18)} Get Code</button><button class="btn primary" id="cw_save">Save</button></div></div>
      <div style="display:grid;grid-template-columns:600px 1fr;gap:20px;align-items:start"><div class="card" id="cw_settings"></div><div id="cw_preview_wrap" style="position:sticky;top:0"></div></div>`;
    $('#cw_back').onclick = () => KY.go('#/sites/chat-widget');
    $('#cw_save').onclick = () => { cw.updated = 'Just now'; KY.toast('Chat widget saved'); };
    $('#cw_getcode').onclick = () => getCode(cw);

    const drawSettings = () => {
      const S = (id, title, sub, html) => `<div style="border-bottom:1px solid var(--line-soft)"><div class="row" style="padding:15px 20px;cursor:pointer" id="cw_sec_${id}" data-cs="${id}">
          <div><div class="bold" style="font-size:16.5px">${title}</div><div class="muted" style="font-size:13.5px">${sub}</div></div><span class="spacer"></span>${icon(cwOpen === id ? 'up' : 'down', 20)}</div>
        ${cwOpen === id ? `<div style="padding:0 20px 20px">${html}</div>` : ''}</div>`;
      $('#cw_settings').innerHTML =
        S('type', 'Chat type', cw.type === 'live' ? 'Live Chat' : 'SMS & Email', `<div class="grid" style="grid-template-columns:1fr 1fr;gap:12px">
          <div class="st-pick ${cw.type === 'live' ? 'on' : ''}" id="cw_type_live" data-ty="live">${icon('chat', 24)}<div class="bold" style="margin:8px 0 4px">Live Chat</div><div class="muted" style="font-size:13.5px">Chat in real time inside the widget. Replies arrive in Conversations.</div></div>
          <div class="st-pick ${cw.type === 'sms' ? 'on' : ''}" id="cw_type_sms" data-ty="sms">${icon('sms', 24)}<div class="bold" style="margin:8px 0 4px">SMS & Email</div><div class="muted" style="font-size:13.5px">Visitors leave their details. You reply by text or email, so the chat follows them.</div></div></div>`)
        + S('style', 'Style & colours', 'Bubble, colour and position', `<label class="bold" style="font-size:14px;color:var(--ink-2)">Theme colour</label><div class="st-sw" style="margin:6px 0 14px">${['#0d9488', '#14324a', '#155eef', '#7c3aed', '#db2777', '#ea580c'].map((c, i) => `<button id="cw_color_${i}" data-cc="${c}" class="${cw.color === c ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 14px"><div class="field"><label>Bubble style</label><div class="st-seg"><button id="cw_bubble_text" data-bs="text" class="${cw.bubble === 'text' ? 'on' : ''}">Icon & text</button><button id="cw_bubble_icon" data-bs="icon" class="${cw.bubble === 'icon' ? 'on' : ''}">Icon only</button></div></div>
            <div class="field"><label>Position</label><div class="st-seg"><button id="cw_pos_left" data-pos="left" class="${cw.pos === 'left' ? 'on' : ''}">Left</button><button id="cw_pos_right" data-pos="right" class="${cw.pos === 'right' ? 'on' : ''}">Right</button></div></div></div>
          ${cw.bubble === 'text' ? `<div class="field" style="margin:0"><label>Bubble text</label><input class="input" id="cw_bubble_label" value="${esc(cw.bubbleText)}"></div>` : ''}`)
        + S('window', 'Chat window', 'Header, greeting and pop-up prompt', `<div class="field"><label>Header</label><input class="input" id="cw_header" value="${esc(cw.header)}"></div>
          <div class="field"><label>Greeting message</label><textarea class="input" rows="3" id="cw_greeting">${esc(cw.greeting)}</textarea></div>
          ${toggle('cw_prompt_on', cw.prompt, 'Show a pop-up prompt')}${cw.prompt ? `<div class="grid" style="grid-template-columns:1fr 130px;gap:0 12px"><div class="field" style="margin:0"><label>Prompt text</label><input class="input" id="cw_prompt" value="${esc(cw.promptText)}"></div><div class="field" style="margin:0"><label>After (seconds)</label><input class="input" type="number" id="cw_prompt_delay" value="${cw.delay}"></div></div>` : ''}`)
        + S('form', 'Contact form', 'What visitors fill in before chatting', `${[['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['message', 'Message']].map(([k, l]) => toggle(`cw_f_${k}`, cw.fields[k], l)).join('')}
          ${toggle('cw_consent', cw.consent, 'Show SMS consent text')}<p class="muted" style="font-size:13.5px;margin:4px 0 0">Every visitor who submits becomes a contact, with the chat in Conversations.</p>`)
        + S('ai', 'Conversation AI', cw.ai ? 'AI replies first, then hands over' : 'Off — your team replies', `${toggle('cw_ai', cw.ai, 'Let Conversation AI reply on this widget')}
          <p class="muted" style="font-size:13.5px;margin:4px 0 0"><span class="chip purple">Growth+</span> The bot answers questions and books appointments using what you teach it in <b>AI Agents</b>, then hands over to your team.</p>`)
        + S('thanks', 'Acknowledgement', 'Shown after someone sends a message', `<textarea class="input" rows="2" id="cw_thanks">${esc(cw.thanks)}</textarea>`);
      $$('[data-cs]').forEach((h) => (h.onclick = () => { cwOpen = cwOpen === h.dataset.cs ? '' : h.dataset.cs; drawSettings(); }));
      const set = (k, v) => { cw[k] = v; drawPreview(); };
      $$('[data-ty]').forEach((c) => (c.onclick = () => { cw.type = c.dataset.ty; chat = []; drawSettings(); drawPreview(); }));
      $$('[data-cc]').forEach((c) => (c.onclick = () => { cw.color = c.dataset.cc; drawSettings(); drawPreview(); }));
      $$('[data-bs]').forEach((c) => (c.onclick = () => { cw.bubble = c.dataset.bs; drawSettings(); drawPreview(); }));
      $$('[data-pos]').forEach((c) => (c.onclick = () => { cw.pos = c.dataset.pos; drawSettings(); drawPreview(); }));
      const inp = (id, k, nm) => { const x = $(id); if (x) x.oninput = () => set(k, nm ? +x.value : x.value); };
      inp('#cw_bubble_label', 'bubbleText'); inp('#cw_header', 'header'); inp('#cw_greeting', 'greeting'); inp('#cw_prompt', 'promptText'); inp('#cw_prompt_delay', 'delay', true); inp('#cw_thanks', 'thanks');
      const tg = (id, fn) => { const x = $(id); if (x) x.onclick = () => { fn(); drawSettings(); drawPreview(); }; };
      tg('#cw_prompt_on', () => (cw.prompt = !cw.prompt));
      ['name', 'phone', 'email', 'message'].forEach((k) => tg(`#cw_f_${k}`, () => (cw.fields[k] = !cw.fields[k])));
      tg('#cw_consent', () => (cw.consent = !cw.consent));
      tg('#cw_ai', () => (cw.ai = !cw.ai));
    };

    const drawPreview = () => {
      const side = cw.pos === 'left' ? 'left:24px' : 'right:24px';
      const team = D.team.map((t) => KY.avatar(t.name, 34)).join('');
      const live = cw.type === 'live';
      const formHtml2 = `${cw.fields.name ? '<input class="in" id="cw_prev_name" placeholder="Name">' : ''}${cw.fields.phone ? '<input class="in" id="cw_prev_phone" placeholder="Mobile phone">' : ''}${cw.fields.email ? '<input class="in" id="cw_prev_email" placeholder="Email">' : ''}
        ${cw.fields.message ? '<textarea class="in" id="cw_prev_msg" placeholder="Message" style="height:70px;padding-top:9px;resize:none;font-family:inherit"></textarea>' : ''}
        ${cw.consent ? `<div style="font-size:11.5px;color:var(--muted);margin:2px 0 10px;line-height:1.4">By submitting, you agree to receive texts from ${esc(BIZ.name)}. Msg & data rates may apply. Reply STOP to opt out.</div>` : ''}
        <button class="send" id="cw_prev_send" style="background:${cw.color}">${live ? 'Start Chat' : 'Send'}</button>`;
      $('#cw_preview_wrap').innerHTML = `<div class="row" style="margin-bottom:10px"><b>Live preview</b><span class="muted" style="font-size:14px">on bloomdental.co.uk</span><span class="spacer"></span><button class="btn sm" id="cw_prev_reset">${icon('restore', 16)} Reset</button></div>
        <div class="cw-stage" id="cw_stage"><div class="site">${renderPage(WEBSITES[0].pages[0].page)}</div><div class="dim"></div>
          ${!open && cw.prompt ? `<div class="cw-prompt" style="${side}">${esc(cw.promptText)}</div>` : ''}
          ${open ? `<div class="cw-win" id="cw_window" style="${side}"><div class="h" style="background:${cw.color}"><div class="av">${team}</div><b>${esc(cw.header)}</b><small>${live ? 'Typically replies in a few minutes' : 'We reply by text or email'}</small></div>
            <div class="b" id="cw_body"><div class="msg">${esc(cw.greeting)}</div>
              ${chat.length ? chat.map((m) => `<div class="msg ${m.me ? 'me' : ''}" style="${m.me ? `background:${cw.color}` : ''}">${m.ai ? `<div style="font-size:11.5px;font-weight:700;color:#5925dc;margin-bottom:2px">${icon('ai', 12)} AI assistant</div>` : ''}${esc(m.text)}</div>`).join('') : formHtml2}</div></div>` : ''}
          <button class="cw-bub ${cw.bubble === 'icon' || open ? 'round' : ''}" id="cw_bubble" style="${side};background:${cw.color}">${icon(open ? 'x' : 'chat', 26)}${cw.bubble === 'text' && !open ? esc(cw.bubbleText) : ''}</button></div>`;
      const st = $('#cw_stage'), site = $('.site>.lp', st);
      site.style.transform = `scale(${st.clientWidth / 1180})`;
      $('#cw_bubble').onclick = () => { open = !open; drawPreview(); };
      $('#cw_prev_reset').onclick = () => { chat = []; open = true; drawPreview(); };
      const send = $('#cw_prev_send');
      if (send) send.onclick = () => {
        const name = ($('#cw_prev_name')?.value || 'Visitor').trim(), msg = ($('#cw_prev_msg')?.value || 'Hi!').trim();
        chat = [{ me: true, text: msg }, { text: cw.thanks }];
        if (cw.ai && live) chat.push({ ai: true, text: `Hi ${name.split(' ')[0]}! Yes, we offer free Invisalign scans. Would Wednesday at 10:30 suit you?` });
        drawPreview();
        KY.toast(`New ${live ? 'live chat' : 'message'} from ${name} in Conversations`);
      };
    };
    drawSettings(); drawPreview();
  }

  function getCode(cw) {
    const code = `<script\n  src="https://widgets.kyntlo.ai/loader.js"\n  data-resources-url="https://widgets.kyntlo.ai/chat-widget/loader.js"\n  data-widget-id="6719f3a2c4e1b8d0f2a7c915">\n</script>`;
    const box = KY.modal({ title: 'Get code', wide: true, body: `
      <div class="bold" style="margin-bottom:6px">1. Copy this code</div><div class="st-code" id="cw_code">${esc(code)}</div>
      <div class="row" style="margin:10px 0 18px"><button class="btn primary" id="cw_copy">${icon('copy', 18)} Copy code</button><button class="btn" id="cw_email_dev">${icon('mail', 18)} Email to my developer</button></div>
      <div class="bold" style="margin-bottom:6px">2. Paste it on your website</div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:12px">
        <div class="card" style="box-shadow:none;padding:14px 16px" id="cw_where_external"><div class="bold">${icon('globe', 18)} Any other website</div><div class="muted" style="font-size:14px;margin-top:4px">Paste it just before the closing &lt;/body&gt; tag, or in the footer / custom code setting of WordPress, Wix or Squarespace.</div></div>
        <div class="card" style="box-shadow:none;padding:14px 16px;background:#f5f8ff;border-color:#b2ccff" id="cw_where_kyntlo"><div class="bold">${icon('layers', 18)} Kyntlo funnels & websites</div><div class="muted" style="font-size:14px;margin-top:4px">No code needed: choose this widget under <b>Settings → Chat widget</b> in your funnel or website.</div></div></div>` });
    $('#cw_copy', box).onclick = () => { cw.installed = true; KY.toast('Code copied to clipboard'); };
    $('#cw_email_dev', box).onclick = () => KY.toast('Install instructions sent');
  }

  // ---------------------------------------------------------------- QR codes
  function qrSvg(text, color = '#101828', size = 160, logo = false) {
    const N = 25;
    let h = 2166136261;
    for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
    const finder = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="${color}"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="${color}"/>`;
    const inF = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    const inL = (x, y) => logo && x > 9 && x < 15 && y > 9 && y < 15;
    let mods = '';
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inF(x, y) && !inL(x, y) && rnd() > 0.52) mods += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${color}"/>`;
    return `<svg viewBox="-2 -2 ${N + 4} ${N + 4}" width="${size}" height="${size}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${N + 4}" height="${N + 4}" fill="#fff"/>${mods}${finder(0, 0)}${finder(N - 7, 0)}${finder(0, N - 7)}
      ${logo ? `<rect x="10" y="10" width="5" height="5" rx="1.2" fill="${color}"/><g transform="translate(10.6 10.6) scale(.16)" stroke="#fff" fill="none" stroke-width="2.2">${window.KY_ICONS.tooth}</g>` : ''}</svg>`;
  }
  const QRS = [
    { id: 'q1', name: 'Window poster — Invisalign', type: 'URL', url: 'bloomdental.co.uk/invisalign-free-scan?utm_source=qr&utm_medium=print&utm_campaign=window-poster', created: '2 Oct 2026', color: '#14324a' },
    { id: 'q2', name: 'Business card — Book online', type: 'Calendar', url: 'bloomdental.co.uk/book/check-up-and-clean', created: '18 Sep 2026', color: '#0d9488' },
    { id: 'q3', name: 'Reception desk — Leave a review', type: 'URL', url: 'g.page/r/bloom-dental-studio/review', created: '4 Sep 2026', color: '#101828' },
  ];
  function qrView(view) {
    view.innerHTML = `${pageHead('QR Codes', `<button class="btn primary" id="qr_new">${icon('plus', 18)} Create QR Code</button>`, '<span class="sub">Bring people from posters, leaflets and cards to your pages.</span>')}
      <div class="card"><table class="t" id="qr_table"><thead><tr><th style="width:80px">QR</th><th>Name</th><th>Type</th><th>Destination</th><th>Created</th><th style="width:130px"></th></tr></thead><tbody>
      ${QRS.map((q) => `<tr id="qr_row_${q.id}"><td><div class="qr">${qrSvg(q.url, q.color, 54, q.logo)}</div></td><td class="bold">${esc(q.name)}</td><td><span class="chip">${esc(q.type)}</span></td>
        <td class="muted" style="max-width:520px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(q.url)}</td><td class="muted">${esc(q.created)}</td>
        <td><button class="btn sm" id="qr_dl_${q.id}" data-dl="${q.id}">${icon('download', 16)} Download</button></td></tr>`).join('')}</tbody></table></div>`;
    $$('[data-dl]', view).forEach((b) => (b.onclick = () => KY.menu(b, [{ label: 'PNG (for print & web)', icon: 'image', onClick: () => KY.toast('QR code downloaded as PNG') }, { label: 'SVG (scales to any size)', icon: 'image', onClick: () => KY.toast('QR code downloaded as SVG') }])));
    $('#qr_new').onclick = () => createQr(view);
  }
  function createQr(view) {
    const st = { name: '', type: 'Funnel / Website page', page: 'f1/s1', url: '', utm: true, campaign: 'leaflet', color: '#14324a', logo: true };
    const pages = [...D.funnels, ...WEBSITES].flatMap((o) => o.pages.map((s) => [`${o.id}/${s.id}`, `${o.name} — ${s.name}`, urlOf(o, s)]));
    const box = KY.modal({ title: 'Create QR code', wide: true, body: '<div id="qr_body"></div>', actions: [{ label: 'Cancel' }, { label: 'Create QR Code', primary: true, id: 'qr_create', onClick: (close) => {
      QRS.unshift({ id: 'q' + (QRS.length + 1), name: st.name || 'New QR code', type: st.type === 'URL' ? 'URL' : st.type.split(' ')[0], url: dest(), created: '21 Oct 2026', color: st.color, logo: st.logo });
      close(); qrView(view); KY.toast('QR code created');
    } }] });
    box.style.width = '940px';
    const dest = () => {
      const b = st.type === 'URL' ? st.url || 'https://' : st.type === 'Calendar' ? 'bloomdental.co.uk/book/invisalign-free-scan' : (pages.find((p) => p[0] === st.page) || pages[0])[2];
      return b + (st.utm ? `?utm_source=qr&utm_medium=print&utm_campaign=${st.campaign}` : '');
    };
    const draw = () => {
      $('#qr_body', box).innerHTML = `<div style="display:grid;grid-template-columns:1fr 300px;gap:26px">
        <div><div class="field"><label>Name</label><input class="input" id="qr_name" value="${esc(st.name)}" placeholder="e.g. Leaflet — Whitening offer"></div>
          <div class="field"><label>QR code type</label><select class="select" id="qr_type">${['Funnel / Website page', 'URL', 'Calendar', 'Form', 'Survey'].map((t) => `<option ${st.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
          ${st.type === 'URL' ? `<div class="field"><label>URL</label><input class="input" id="qr_url" value="${esc(st.url)}" placeholder="https://"></div>`
            : st.type === 'Funnel / Website page' ? `<div class="field"><label>Page</label><select class="select" id="qr_page">${pages.map(([v, l]) => `<option value="${v}" ${st.page === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></div>`
            : `<div class="field"><label>${st.type}</label><select class="select"><option>${st.type === 'Calendar' ? 'Invisalign Free Scan' : st.type === 'Form' ? 'Invisalign Enquiry' : 'Smile Assessment Quiz'}</option></select></div>`}
          ${toggle('qr_utm', st.utm, 'Add tracking (UTM) parameters')}
          ${st.utm ? `<div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:0 10px"><div class="field"><label>Source</label><input class="input" value="qr" readonly></div><div class="field"><label>Medium</label><input class="input" value="print" readonly></div><div class="field"><label>Campaign</label><input class="input" id="qr_campaign" value="${esc(st.campaign)}"></div></div>` : ''}
          <label class="bold" style="font-size:14px;color:var(--ink-2)">Design</label><div class="row" style="margin-top:6px"><div class="st-sw">${['#101828', '#14324a', '#0d9488', '#155eef', '#7c3aed', '#db2777'].map((c, i) => `<button id="qr_col_${i}" data-qc="${c}" class="${st.color === c ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div>
            <span class="spacer"></span><button class="toggle ${st.logo ? 'on' : ''}" id="qr_logo"></button><span>Logo in centre</span></div></div>
        <div style="text-align:center"><div class="card qr" id="qr_preview" style="box-shadow:none;padding:16px;display:inline-block">${qrSvg(dest(), st.color, 240, st.logo)}</div>
          <div class="muted" style="font-size:13px;margin-top:10px;word-break:break-all" id="qr_dest">${esc(dest())}</div></div></div>`;
      const on = (id, ev, fn) => { const x = $(id, box); if (x) x[ev] = () => fn(x); };
      on('#qr_name', 'oninput', (x) => (st.name = x.value));
      on('#qr_type', 'onchange', (x) => { st.type = x.value; draw(); });
      on('#qr_page', 'onchange', (x) => { st.page = x.value; draw(); });
      on('#qr_url', 'onchange', (x) => { st.url = x.value; draw(); });
      on('#qr_campaign', 'onchange', (x) => { st.campaign = x.value.toLowerCase().replace(/\s+/g, '-'); draw(); });
      on('#qr_utm', 'onclick', () => { st.utm = !st.utm; draw(); });
      on('#qr_logo', 'onclick', () => { st.logo = !st.logo; draw(); });
      $$('[data-qc]', box).forEach((b) => (b.onclick = () => { st.color = b.dataset.qc; draw(); }));
    };
    draw();
  }

  // ---------------------------------------------------------------- blogs
  const POSTS = [
    { id: 'p1', title: 'How much does Invisalign cost in London?', status: 'Published', cat: 'Invisalign', author: 'Sarah Mitchell', date: '14 Oct 2026', art: 'aligner', slug: 'invisalign-cost-london', desc: 'Invisalign prices in London explained: what affects the cost, finance options, and what is included at Bloom Dental Studio.' },
    { id: 'p2', title: '5 ways to keep your teeth white after whitening', status: 'Published', cat: 'Whitening', author: 'Priya Shah', date: '2 Oct 2026', art: 'smile', slug: 'keep-teeth-white', desc: 'Simple habits that keep your whitening results bright for longer.' },
    { id: 'p3', title: 'Dental implants vs. bridges: which is right for you?', status: 'Scheduled', cat: 'Implants', author: 'Sarah Mitchell', date: '30 Oct 2026', art: 'smile', slug: 'implants-vs-bridges', desc: '' },
    { id: 'p4', title: 'What happens at your first check-up?', status: 'Draft', cat: 'Patient guides', author: 'James Okafor', date: '—', art: 'team', slug: 'first-check-up', desc: '' },
  ];
  const CATS = ['Invisalign', 'Whitening', 'Implants', 'Patient guides'];
  let blogSub = 'posts';
  function blogList(view) {
    const chip = (s) => `<span class="chip ${s === 'Published' ? 'green' : s === 'Scheduled' ? 'blue' : 'amber'}">${s}</span>`;
    view.innerHTML = `${pageHead('Blogs', `<button class="btn" id="bl_site">${icon('globe', 18)} Bloom Smile Journal ${icon('chevron', 16)}</button><button class="btn primary" id="bl_new">${icon('plus', 18)} New Blog Post</button>`, '<span class="sub">bloomdental.co.uk/blog</span>')}
      <div class="st-sub">${[['posts', 'Posts'], ['categories', 'Categories'], ['authors', 'Authors']].map(([id, l]) => `<a id="bl_sub_${id}" data-bs="${id}" class="${blogSub === id ? 'on' : ''}">${l}</a>`).join('')}</div>
      <div class="card">${blogSub === 'posts' ? `<table class="t" id="bl_table"><thead><tr><th>Title</th><th>Status</th><th>Category</th><th>Author</th><th>Publish date</th></tr></thead><tbody>
        ${POSTS.map((p) => `<tr class="click" id="bl_row_${p.id}" data-id="${p.id}"><td><div class="row"><span style="width:64px;flex:none;border-radius:6px;overflow:hidden">${art(p.art, '#0d9488')}</span><b>${esc(p.title)}</b></div></td><td>${chip(p.status)}</td><td>${esc(p.cat)}</td><td>${esc(p.author)}</td><td class="muted">${esc(p.date)}</td></tr>`).join('')}</tbody></table>`
        : blogSub === 'categories' ? `<table class="t"><thead><tr><th>Category</th><th>URL</th><th>Posts</th></tr></thead><tbody>${CATS.map((c) => `<tr><td class="bold">${c}</td><td class="muted">/blog/category/${c.toLowerCase().replace(/\s+/g, '-')}</td><td>${POSTS.filter((p) => p.cat === c).length}</td></tr>`).join('')}</tbody></table>`
        : `<table class="t"><thead><tr><th>Author</th><th>Posts</th></tr></thead><tbody>${D.team.map((t) => `<tr><td><div class="row">${KY.avatar(t.name, 30)}<b>${esc(t.name)}</b></div></td><td>${POSTS.filter((p) => p.author === t.name).length}</td></tr>`).join('')}</tbody></table>`}</div>`;
    $$('[data-bs]', view).forEach((a) => (a.onclick = () => { blogSub = a.dataset.bs; blogList(view); }));
    $$('tr.click', view).forEach((tr) => (tr.onclick = () => KY.go(`#/sites/blogs/post/${tr.dataset.id}`)));
    $('#bl_new').onclick = () => KY.go('#/sites/blogs/post/new');
  }

  const AI_POST = `<p>Choosing between Invisalign and traditional braces is one of the most common questions we hear at Bloom Dental Studio. Both straighten teeth very well. The right choice depends on your teeth, your lifestyle and your budget.</p>
    <h2>How Invisalign works</h2><p>Invisalign uses a series of clear, removable aligners made from a 3D scan of your teeth. You switch to a new set every one to two weeks, and each set moves your teeth a little closer to their final position.</p>
    <h2>When braces are the better option</h2><p>Fixed braces can handle very complex cases and do not rely on you wearing them 22 hours a day. For some patients, that makes them the more predictable choice.</p>
    <h2>Cost and comfort</h2><p>Invisalign at Bloom starts from £3,200, with 0% finance available. Most patients find aligners more comfortable and far less noticeable than metal braces.</p>
    <h2>The best way to decide</h2><p>Book a free 3D scan. In about 30 minutes you will see a preview of your new smile and get a clear treatment plan and price.</p>`;
  function blogEditor(view, id) {
    const isNew = id === 'new';
    const p = isNew ? { id: 'p' + (POSTS.length + 1), title: '', status: 'Draft', cat: 'Invisalign', author: D.me.name, date: '—', art: 'aligner', slug: '', desc: '', body: '' } : POSTS.find((x) => x.id === id);
    if (!p) return KY.go('#/sites/blogs');
    let slugTouched = !!p.slug;
    view.innerHTML = `<div class="st-crumb"><a id="bl_back">Blogs</a>${icon('right', 16)}<span>${isNew ? 'New post' : esc(p.title)}</span></div>
      <div class="page-head" style="margin-bottom:16px"><h1>${isNew ? 'New blog post' : 'Edit blog post'}</h1><span class="chip ${p.status === 'Published' ? 'green' : 'amber'}" id="bl_status">${p.status}</span>
        <div class="actions"><button class="btn" id="bl_preview">${icon('eye', 18)} Preview</button><button class="btn" id="bl_save">Save draft</button><button class="btn primary" id="bl_publish">Publish ${icon('chevron', 16)}</button></div></div>
      <div style="display:grid;grid-template-columns:1fr 400px;gap:20px;align-items:start">
        <div class="bl-doc"><input class="ttl" id="bl_title" placeholder="Blog post title" value="${esc(p.title)}">
          <div class="bl-tool"><span>B</span><span style="font-style:italic">I</span><span style="text-decoration:underline">U</span><span>H2</span><span>${icon('list', 18)}</span><span>${icon('link', 18)}</span><span>${icon('image', 18)}</span><span>${icon('video', 18)}</span>
            <span class="spacer"></span><button class="btn sm" id="bl_ai" style="color:#5925dc;border-color:#d9d6fe;background:#f4f3ff">${icon('ai', 16)} Content AI</button></div>
          <div class="body" id="bl_body" contenteditable="true" data-ph="Start writing…">${p.body || (isNew ? '<p class="faint">Start writing, or use Content AI to draft this post…</p>' : `<p>${esc(p.desc || 'Write your post here.')}</p>`)}</div></div>
        <div class="card"><div class="card-h"><h3>Post settings</h3></div><div class="card-b">
          <div class="field"><label>URL slug</label><div class="row" style="gap:0"><span class="btn" style="border-radius:8px 0 0 8px;background:#f9fafb;cursor:default;font-weight:500;padding:0 10px">/blog/</span><input class="input" id="bl_slug" style="border-radius:0 8px 8px 0;border-left:0" value="${esc(p.slug)}"></div></div>
          <div class="field"><label>Meta description <span class="faint" id="bl_desc_count" style="font-weight:500">· ${p.desc.length}/160</span></label><textarea class="input" rows="3" id="bl_desc" placeholder="One or two sentences shown in Google results">${esc(p.desc)}</textarea></div>
          <div class="field"><label>Featured image</label><div style="border-radius:10px;overflow:hidden;border:1px solid var(--line);width:220px">${art(p.art, '#0d9488')}</div></div>
          <div class="field"><label>Image alt text</label><input class="input" id="bl_alt" placeholder="Describe the image"></div>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 12px"><div class="field"><label>Category</label><select class="select" id="bl_cat">${CATS.map((c) => `<option ${p.cat === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
            <div class="field"><label>Author</label><select class="select" id="bl_author">${D.team.map((t) => `<option ${p.author === t.name ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></div></div>
          <div class="field" style="margin:0"><label>Tags</label><input class="input" id="bl_tags" placeholder="e.g. invisalign, braces"></div></div></div></div>`;
    const title = $('#bl_title'), slug = $('#bl_slug'), desc = $('#bl_desc');
    title.oninput = () => { p.title = title.value; if (!slugTouched) slug.value = title.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
    slug.oninput = () => { slugTouched = true; };
    desc.oninput = () => { $('#bl_desc_count').textContent = `· ${desc.value.length}/160`; };
    $('#bl_body').onfocus = (e) => { const f = $('.faint', e.target); if (f) f.remove(); };
    const keep = () => Object.assign(p, { title: title.value, slug: slug.value, desc: desc.value, body: $('#bl_body').innerHTML, cat: $('#bl_cat').value, author: $('#bl_author').value });
    const store = () => { keep(); if (isNew && !POSTS.includes(p)) POSTS.unshift(p); };
    $('#bl_back').onclick = () => KY.go('#/sites/blogs');
    $('#bl_save').onclick = () => { store(); KY.toast('Draft saved'); };
    $('#bl_preview').onclick = () => KY.modal({ title: 'Preview', wide: true, body: `<div style="max-width:680px;margin:0 auto"><h1 style="font-size:32px;margin:0 0 8px">${esc(title.value)}</h1><div class="muted" style="margin-bottom:16px">${esc($('#bl_author').value)} · ${esc($('#bl_cat').value)}</div><div style="border-radius:12px;overflow:hidden;margin-bottom:18px">${art(p.art, '#0d9488')}</div><div style="font-size:17px;line-height:1.7">${$('#bl_body').innerHTML}</div></div>` });
    $('#bl_publish').onclick = (e) => KY.menu(e.currentTarget, [
      { label: 'Publish now', icon: 'send', onClick: () => { store(); p.status = 'Published'; p.date = '21 Oct 2026'; KY.toast(`Published at bloomdental.co.uk/blog/${p.slug}`); KY.go('#/sites/blogs'); } },
      { label: 'Schedule for later', icon: 'calendar', onClick: () => KY.modal({ title: 'Schedule post', body: '<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 12px"><div class="field"><label>Date</label><input class="input" value="Tue 27 Oct 2026"></div><div class="field"><label>Time</label><input class="input" value="09:00"></div></div>',
        actions: [{ label: 'Cancel' }, { label: 'Schedule', primary: true, id: 'bl_sched_ok', onClick: (c) => { store(); p.status = 'Scheduled'; p.date = '27 Oct 2026'; c(); KY.toast('Post scheduled for 27 Oct, 09:00'); KY.go('#/sites/blogs'); } }] }) },
    ]);
    $('#bl_ai').onclick = () => {
      const box = KY.modal({ title: 'Content AI · Write a blog post', body: `
        <div class="field"><label>What should the post be about?</label><textarea class="input" rows="3" id="bl_ai_prompt">${esc(title.value ? `A friendly post for patients: ${title.value}` : '')}</textarea></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:0 12px"><div class="field"><label>Tone</label><select class="select"><option>Friendly & reassuring</option><option>Professional</option><option>Casual</option></select></div>
          <div class="field"><label>Length</label><select class="select"><option>Medium (~500 words)</option><option>Short (~300 words)</option><option>Long (~900 words)</option></select></div></div>
        <p class="muted" style="font-size:13.5px;margin:0">${icon('ai', 14)} Content AI is billed by usage on Starter and Growth, and included on Pro.</p>`,
        actions: [{ label: 'Cancel' }, { label: 'Generate', primary: true, id: 'bl_ai_generate', onClick: (close) => {
          close(); $('#bl_body').innerHTML = AI_POST;
          if (!desc.value) { desc.value = 'Invisalign or braces? Compare how they work, comfort and cost, and find out which is right for you. Book a free 3D scan at Bloom Dental Studio.'; desc.oninput(); }
          KY.toast('Draft written by Content AI — review it before publishing');
        } }] });
      setTimeout(() => $('#bl_ai_prompt', box)?.focus(), 50);
    };
  }

  // ---------------------------------------------------------------- domains
  const DOMAINS = [{ name: 'bloomdental.co.uk', linked: 'Website · Bloom Dental Website', def: 'Home', ssl: 'Issued', status: 'Connected' }];
  function domainsView(view) {
    view.innerHTML = `${pageHead('Domains', `<button class="btn primary" id="dm_add">${icon('plus', 18)} Add Domain</button>`, '<span class="sub">Connect your own web address to funnels, websites and blogs.</span>')}
      <div class="card" style="margin-bottom:20px"><table class="t" id="dm_table"><thead><tr><th>Domain</th><th>Linked to</th><th>Default page</th><th>SSL</th><th>Status</th><th style="width:60px"></th></tr></thead><tbody>
      ${DOMAINS.map((d, i) => `<tr id="dm_row_${i}"><td><div class="row">${icon('globe', 20)}<b>${esc(d.name)}</b></div></td><td>${esc(d.linked)}</td><td>${esc(d.def)}</td>
        <td>${d.ssl === 'Issued' ? `<span class="chip green">${icon('lock', 14)} Issued</span>` : `<span class="chip amber"><span class="st-spin" style="width:13px;height:13px;border-width:2px"></span> Issuing…</span>`}</td>
        <td>${d.status === 'Connected' ? '<span class="chip green">Connected</span>' : `<span class="chip amber">${esc(d.status)}</span>`}</td><td><button class="btn ghost icon sm">${icon('more', 18)}</button></td></tr>`).join('')}</tbody></table></div>
      <div class="card" id="dm_redirects"><div class="card-h"><h3>URL redirects</h3><span class="spacer"></span><button class="btn sm">${icon('plus', 16)} Add redirect</button></div>
        <table class="t"><thead><tr><th>Domain</th><th>Path</th><th>Redirects to</th><th>Type</th></tr></thead><tbody><tr><td>bloomdental.co.uk</td><td>/invisalign-offer</td><td>/invisalign-free-scan</td><td><span class="chip">301 Permanent</span></td></tr></tbody></table></div>`;
    $('#dm_add').onclick = () => addDomain(view);
  }

  function addDomain(view) {
    const st = { step: 0, name: '', verified: false, type: 'Funnel', product: 'f1', def: '' };
    const box = KY.modal({ title: 'Add domain', wide: true, body: '<div id="dm_body"></div>', actions: [{ label: 'Cancel' }, { label: 'Continue', primary: true, id: 'dm_next', onClick: () => next() }] });
    box.style.width = '880px';
    const isSub = () => st.name.split('.').length > (st.name.endsWith('.co.uk') ? 3 : 2);
    const host = () => (isSub() ? st.name.split('.')[0] : '@');
    const records = () => (isSub() ? [['CNAME', host(), 'sites.ludicrous.cloud']] : [['A', '@', '162.159.140.166'], ['CNAME', 'www', 'sites.ludicrous.cloud']]);
    const draw = () => {
      const b = $('#dm_body', box);
      const steps = ['Domain', 'DNS records', 'Link domain'];
      const bar = `<div class="row" style="gap:8px;margin-bottom:20px">${steps.map((s, i) => `<span class="chip ${i < st.step || (i === 0 && st.step > 0) ? 'green' : i === st.step ? 'blue' : ''}">${i < st.step ? icon('check', 13) : i + 1} ${s}</span>${i < 2 ? `<span class="faint">${icon('right', 16)}</span>` : ''}`).join('')}</div>`;
      const nb = $('#dm_next', box);
      if (st.step === 0) {
        nb.textContent = 'Continue';
        b.innerHTML = `${bar}<div class="grid" style="grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px">
          <div class="st-pick on" id="dm_own">${icon('link', 24)}<div class="bold" style="margin:8px 0 4px">Connect a domain you own</div><div class="muted" style="font-size:14px">Bought from GoDaddy, Namecheap, 123-reg or similar.</div></div>
          <div class="st-pick" id="dm_buy">${icon('globe', 24)}<div class="bold" style="margin:8px 0 4px">Buy a new domain <span class="chip purple" style="height:22px">Usage-based</span></div><div class="muted" style="font-size:14px">Search, buy and connect in one go. DNS is set up for you.</div></div></div>
          <div class="field"><label>Domain or subdomain</label><input class="input" id="dm_input" placeholder="e.g. offers.bloomdental.co.uk" value="${esc(st.name)}"></div>
          <p class="muted" style="font-size:14px;margin:0">${icon('help', 15)} Main website hosted somewhere else? Use a subdomain, like <b>offers.</b>yourbusiness.com, so your existing site keeps working.</p>`;
        $('#dm_buy', box).onclick = () => KY.toast('Domain purchase is billed to your Kyntlo wallet', 'warn');
        const inp = $('#dm_input', box);
        inp.oninput = () => { st.name = inp.value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*/, ''); };
      } else if (st.step === 1) {
        nb.textContent = st.verified ? 'Continue' : 'Verify Records';
        b.innerHTML = `${bar}<p style="margin:0 0 6px">Log in to where you bought <b>${esc(st.name)}</b>, open its DNS settings, and add ${records().length === 1 ? 'this record' : 'these records'}:</p>
          <div class="card" style="box-shadow:none;margin:12px 0"><table class="t dns" id="dm_records"><thead><tr><th>Type</th><th>Host / Name</th><th>Value / Points to</th><th style="width:60px"></th></tr></thead><tbody>
            ${records().map(([t, h, v], i) => `<tr id="dm_rec_${i}"><td><b>${t}</b></td><td>${esc(h)}</td><td>${esc(v)}</td><td><button class="btn ghost icon sm" data-cp>${icon('copy', 16)}</button></td></tr>`).join('')}</tbody></table></div>
          <p class="muted" style="font-size:14px;margin:0 0 12px">${isSub() ? 'A subdomain only needs a CNAME record.' : 'A root domain needs an A record, plus a CNAME for www.'} Remove any other A or CNAME records for the same host. Changes usually work in minutes but can take up to 24–48 hours.</p>
          <div id="dm_verify_state">${st.verified ? `<span class="chip green" style="height:32px;font-size:14px">${icon('check', 15)} DNS records verified</span>` : ''}</div>`;
        $$('[data-cp]', b).forEach((x) => (x.onclick = () => KY.toast('Copied')));
      } else {
        const owners = st.type === 'Website' ? WEBSITES : D.funnels;
        const own = owners.find((o) => o.id === st.product) || owners[0];
        st.product = own.id;
        nb.textContent = 'Add Domain';
        b.innerHTML = `${bar}<div class="grid" style="grid-template-columns:1fr 1fr;gap:0 16px">
          <div class="field"><label>Link this domain to</label><select class="select" id="dm_type">${['Funnel', 'Website', 'Blog', 'Client portal'].map((t) => `<option ${st.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
          <div class="field"><label>Which ${st.type.toLowerCase()}</label><select class="select" id="dm_product">${owners.map((o) => `<option value="${o.id}" ${o.id === own.id ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}</select></div></div>
          <div class="field"><label>Default ${st.type === 'Website' ? 'page' : 'step'} (shown at https://${esc(st.name)})</label><select class="select" id="dm_default">${own.pages.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div>
          <div class="field"><label>404 page (optional)</label><select class="select" id="dm_404"><option>Default "page not found"</option>${own.pages.map((s) => `<option>${esc(s.name)}</option>`).join('')}</select></div>
          <p class="muted" style="font-size:14px;margin:0">${icon('shield', 15)} We'll issue a free SSL certificate automatically, so your pages load securely over https.</p>`;
        $('#dm_type', box).onchange = (e) => { st.type = e.target.value; st.product = ''; draw(); };
        $('#dm_product', box).onchange = (e) => { st.product = e.target.value; draw(); };
      }
    };
    const next = () => {
      if (st.step === 0) { if (!st.name) { st.name = 'offers.bloomdental.co.uk'; } st.step = 1; return draw(); }
      if (st.step === 1 && !st.verified) {
        st.verified = true; draw();
        $('#dm_verify_state', box).innerHTML = `<span class="chip blue" style="height:32px;font-size:14px"><span class="st-spin" style="width:14px;height:14px;border-width:2px"></span> Checking DNS…</span>`;
        setTimeout(() => { const v = $('#dm_verify_state', box); if (v) v.innerHTML = `<span class="chip green" style="height:32px;font-size:14px">${icon('check', 15)} DNS records verified</span>`; }, 700);
        return;
      }
      if (st.step === 1) { st.step = 2; return draw(); }
      const owners = st.type === 'Website' ? WEBSITES : D.funnels;
      const own = owners.find((o) => o.id === st.product) || owners[0];
      const def = own.pages.find((s) => s.id === $('#dm_default', box).value) || own.pages[0];
      own.domain = st.name;
      const d = { name: st.name, linked: `${st.type} · ${own.name}`, def: def.name, ssl: 'Pending', status: 'Connected' };
      DOMAINS.push(d);
      box.closest('.overlay').remove();
      domainsView(view);
      KY.toast(`${st.name} connected — SSL certificate is being issued`);
      setTimeout(() => { d.ssl = 'Issued'; if ($('#dm_table')) domainsView(view); }, 4000);
    };
    draw();
  }

  // ---------------------------------------------------------------- screen
  addEventListener('hashchange', () => $('#pv_root')?.remove());
  KY.screen('sites', {
    tabs: [{ id: 'funnels', label: 'Funnels' }, { id: 'websites', label: 'Websites' }, { id: 'forms', label: 'Forms' }, { id: 'surveys', label: 'Surveys' }, { id: 'chat-widget', label: 'Chat Widget' }, { id: 'qr-codes', label: 'QR Codes' }, { id: 'blogs', label: 'Blogs' }, { id: 'domains', label: 'Domains' }],
    render(view, { tab, params }) {
      $('#pv_root')?.remove();
      $('#pb_ghost')?.remove(); $('#pb_dropline')?.remove();
      B.drag = null;
      if (tab === 'funnels' || tab === 'websites') {
        const kind = tab === 'websites' ? 'website' : 'funnel';
        if (!params[0]) return listView(view, kind);
        const owner = ownerOf(kind, params[0]);
        if (!owner) return KY.go(base(kind));
        if (params[1] === 'builder') {
          const step = owner.pages.find((s) => s.id === params[2]) || owner.pages[0];
          detailView(view, kind, owner, 'steps', step.id);
          return builderView(view, kind, owner, step, params[3]);
        }
        const isStep = !params[1] || params[1] === 'steps' || params[1] === 'pages';
        return detailView(view, kind, owner, isStep ? 'steps' : params[1], isStep ? params[2] : null);
      }
      if (tab === 'forms') {
        if (params[0]) { formsList(view); const f = D.forms.find((x) => x.id === params[0]); return f ? formBuilder(view, f) : KY.go('#/sites/forms'); }
        return formsList(view);
      }
      if (tab === 'surveys') {
        surveysList(view);
        if (params[0]) { const s = SURVEYS.find((x) => x.id === params[0]); if (s) surveyBuilder(view, s); }
        return;
      }
      if (tab === 'chat-widget') {
        const c = params[0] && CHAT.find((x) => x.id === params[0]);
        return c ? chatBuilder(view, c) : chatList(view);
      }
      if (tab === 'qr-codes') return qrView(view);
      if (tab === 'blogs') return params[0] === 'post' ? blogEditor(view, params[1]) : blogList(view);
      if (tab === 'domains') return domainsView(view);
      return listView(view, 'funnel');
    },
  });
})();
