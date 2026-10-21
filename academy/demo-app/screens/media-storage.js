// Media Storage — the account's file library (images, videos, documents) used in
// emails, funnels, websites and messages.
(() => {
  const { esc, icon, $, $$ } = KY;
  const ms = (KY.data.media = KY.data.media || {
    folder: null,
    folders: ['Logos & branding', 'Before & after', 'Team photos', 'Email images', 'Documents'],
    files: [
      { n: 'bloom-logo.png', f: 'Logos & branding', k: 'img', c: '#f472b6', size: '42 KB', d: '2 Sep 2026' },
      { n: 'bloom-logo-white.png', f: 'Logos & branding', k: 'img', c: '#7f56d9', size: '38 KB', d: '2 Sep 2026' },
      { n: 'invisalign-before-after-01.jpg', f: 'Before & after', k: 'img', c: '#53b1fd', size: '1.2 MB', d: '14 Oct 2026' },
      { n: 'whitening-results-02.jpg', f: 'Before & after', k: 'img', c: '#fdb022', size: '980 KB', d: '12 Oct 2026' },
      { n: 'laura.jpg', f: 'Team photos', k: 'photo', src: '../../assets/avatars/laura.jpg', size: '210 KB', d: '5 Sep 2026' },
      { n: 'sofia.jpg', f: 'Team photos', k: 'photo', src: '../../assets/avatars/sofia.jpg', size: '198 KB', d: '5 Sep 2026' },
      { n: 'october-newsletter-header.png', f: 'Email images', k: 'img', c: '#12b76a', size: '320 KB', d: '15 Oct 2026' },
      { n: 'practice-tour.mp4', f: null, k: 'video', c: '#101828', size: '24.6 MB', d: '20 Sep 2026' },
      { n: 'new-patient-form.pdf', f: 'Documents', k: 'pdf', c: '#f04438', size: '180 KB', d: '9 Sep 2026' },
      { n: 'price-list-2026.pdf', f: 'Documents', k: 'pdf', c: '#f04438', size: '96 KB', d: '1 Oct 2026' },
    ],
  });

  if (!document.getElementById('css-media-storage')) {
    const st = document.createElement('style');
    st.id = 'css-media-storage';
    st.textContent = `
      .md-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; padding: 18px; }
      .md-tile { border: 1px solid var(--line-soft); border-radius: 10px; overflow: hidden; background: #fff; cursor: pointer; }
      .md-tile:hover { border-color: #84adff; box-shadow: 0 0 0 3px #d1e0ff; }
      .md-thumb { height: 140px; display: grid; place-items: center; color: #fff; position: relative; overflow: hidden; }
      .md-thumb img { width: 100%; height: 100%; object-fit: cover; }
      .md-meta { padding: 10px 12px; }
      .md-meta b { display: block; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .md-meta span { font-size: 12.5px; color: var(--muted); }
      .md-folder .md-thumb { background: #eff4ff; color: var(--blue); }
    `;
    document.head.appendChild(st);
  }

  const thumb = (f) => {
    if (f.k === 'photo') return `<div class="md-thumb"><img src="${f.src}" alt=""></div>`;
    if (f.k === 'pdf') return `<div class="md-thumb" style="background:#fef3f2;color:#f04438">${icon('note', 44)}<span style="position:absolute;bottom:12px;font-weight:800;font-size:13px">PDF</span></div>`;
    if (f.k === 'video') return `<div class="md-thumb" style="background:linear-gradient(135deg,#1d2939,#475467)">${icon('play', 40)}</div>`;
    return `<div class="md-thumb" style="background:linear-gradient(135deg,${f.c},${f.c}99)">${icon('image', 44)}</div>`;
  };

  function render(view) {
    const files = ms.files.filter((f) => (ms.folder ? f.f === ms.folder : !f.f));
    view.innerHTML = `
      <div class="page-head"><div><h1>Media Storage</h1><div class="sub">Images, videos and documents you use in emails, funnels, websites and messages.</div></div>
        <div class="actions"><button class="btn" id="md_new_folder">${icon('folder', 18)} New Folder</button><button class="btn primary" id="md_upload">${icon('upload', 18)} Upload</button></div></div>
      <div class="card">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line-soft)">
          <span class="row" style="gap:6px;font-weight:600"><a id="md_home" style="cursor:pointer">All files</a>${ms.folder ? `${icon('right', 16)}<span>${esc(ms.folder)}</span>` : ''}</span>
          <span class="spacer"></span><div class="search" style="width:280px"><span>${icon('search', 18)}</span><input class="input" placeholder="Search files"></div>
          <span class="muted" style="font-size:14px">1.4 GB of 10 GB used</span></div>
        <div class="md-grid" id="md_grid">
          ${ms.folder ? '' : ms.folders.map((f, i) => `<div class="md-tile md-folder" data-folder="${esc(f)}" id="md_folder_${i}"><div class="md-thumb">${icon('folder', 48)}</div>
            <div class="md-meta"><b>${esc(f)}</b><span>${((n) => n + (n === 1 ? ' file' : ' files'))(ms.files.filter((x) => x.f === f).length)}</span></div></div>`).join('')}
          ${files.map((f) => `<div class="md-tile" data-file="${esc(f.n)}">${thumb(f)}<div class="md-meta"><b>${esc(f.n)}</b><span>${f.size} · ${f.d}</span></div></div>`).join('')}
        </div>
      </div>`;
    $('#md_home').onclick = () => { ms.folder = null; render(view); };
    $$('[data-folder]', view).forEach((t) => (t.onclick = () => { ms.folder = t.dataset.folder; render(view); }));
    $$('[data-file]', view).forEach((t) => (t.onclick = () => KY.toast('Link copied: ' + t.dataset.file)));
    $('#md_upload').onclick = () => {
      ms.files.unshift({ n: 'reception-photo.jpg', f: ms.folder, k: 'img', c: '#06aed4', size: '640 KB', d: '21 Oct 2026' });
      render(view); KY.toast('reception-photo.jpg uploaded');
    };
    $('#md_new_folder').onclick = () => KY.modal({ title: 'New Folder', body: `<div class="field"><label>Folder name</label><input class="input" id="md_folder_name" placeholder="e.g. Social media"></div>`,
      actions: [{ label: 'Cancel' }, { label: 'Create', primary: true, id: 'md_folder_save', onClick: (close, box) => {
        ms.folders.push($('#md_folder_name', box).value || 'New folder'); close(); render(view); KY.toast('Folder created');
      } }] });
  }

  KY.screen('media-storage', { tabs: [], render });
})();
