// Ask AI — the in-app AI assistant. Ask about the account or how to do something;
// answers here are scripted from the demo data.
(() => {
  const { esc, icon, $, $$ } = KY;
  const data = KY.data;
  const chat = (KY.data.askAi = KY.data.askAi || { messages: [] });

  if (!document.getElementById('css-ask-ai')) {
    const st = document.createElement('style');
    st.id = 'css-ask-ai';
    st.textContent = `
      .ai-wrap { display: grid; grid-template-columns: 290px 1fr; height: 100%; }
      .ai-side { background: #fff; border-right: 1px solid var(--line-soft); padding: 16px; display: flex; flex-direction: column; gap: 6px; }
      .ai-side h6 { margin: 14px 6px 4px; font-size: 12px; letter-spacing: .08em; color: var(--muted); }
      .ai-side .h { padding: 9px 10px; border-radius: 8px; font-size: 14.5px; color: var(--ink-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ai-side .h:hover { background: #f2f4f7; }
      .ai-main { display: flex; flex-direction: column; min-width: 0; background: linear-gradient(180deg, #faf8ff, var(--bg) 40%); }
      .ai-scroll { flex: 1; overflow: auto; padding: 30px 0; }
      .ai-col { max-width: 900px; margin: 0 auto; padding: 0 24px; }
      .ai-hello { text-align: center; padding: 70px 0 30px; }
      .ai-hello .orb { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 18px; display: grid; place-items: center; color: #fff; background: radial-gradient(circle at 30% 30%, #c084fc, #4b21a9 70%); box-shadow: 0 12px 30px rgba(75,33,169,.35); }
      .ai-hello h1 { margin: 0; font-size: 32px; }
      .ai-hello p { color: var(--muted); font-size: 17px; margin: 8px 0 0; }
      .ai-sugs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 26px; }
      .ai-sug { text-align: left; padding: 14px 16px; border: 1px solid var(--line); border-radius: 12px; background: #fff; display: flex; gap: 12px; align-items: flex-start; color: var(--ink-2); font-weight: 500; }
      .ai-sug:hover { border-color: #b692f6; background: #faf5ff; }
      .ai-sug svg { color: var(--purple); margin-top: 2px; }
      .ai-msg { display: flex; gap: 12px; margin-bottom: 22px; }
      .ai-msg.me { justify-content: flex-end; }
      .ai-msg.me .b { background: var(--purple); color: #fff; border-radius: 16px 16px 4px 16px; max-width: 70%; padding: 12px 16px; }
      .ai-msg.bot .av { width: 36px; height: 36px; border-radius: 50%; flex: none; display: grid; place-items: center; color: #fff; background: radial-gradient(circle at 30% 30%, #c084fc, #4b21a9 70%); }
      .ai-msg.bot .b { background: #fff; border: 1px solid var(--line-soft); border-radius: 4px 16px 16px 16px; padding: 14px 18px; max-width: 82%; box-shadow: var(--shadow); }
      .ai-msg.bot .b ul, .ai-msg.bot .b ol { margin: 8px 0 0; padding-left: 22px; }
      .ai-msg.bot .b li { margin: 4px 0; }
      .ai-typing span { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #b692f6; margin-right: 4px; animation: aiDot 1s infinite; }
      .ai-typing span:nth-child(2) { animation-delay: .15s; } .ai-typing span:nth-child(3) { animation-delay: .3s; }
      @keyframes aiDot { 50% { opacity: .3; transform: translateY(-3px); } }
      .ai-input { padding: 16px 24px 22px; }
      .ai-box { max-width: 900px; margin: 0 auto; background: #fff; border: 1px solid var(--line); border-radius: 16px; box-shadow: 0 8px 24px rgba(16,24,40,.08); padding: 10px 10px 10px 18px; display: flex; align-items: center; gap: 10px; }
      .ai-box input { flex: 1; border: 0; outline: none; font-size: 16.5px; height: 44px; }
      .ai-send { width: 44px; height: 44px; border-radius: 12px; border: 0; background: var(--purple); color: #fff; display: grid; place-items: center; }
      .ai-note { text-align: center; color: var(--faint); font-size: 13px; margin-top: 8px; }
    `;
    document.head.appendChild(st);
  }

  const SUGGESTIONS = [
    ['chart', 'How many new leads did we get this week?'],
    ['calendar', "What appointments do we have tomorrow?"],
    ['chat', 'Summarise my unread conversations'],
    ['users', 'How do I add a team member?'],
  ];

  function answer(q) {
    const s = q.toLowerCase();
    const newLeads = data.contacts.filter((c) => /(1[5-9]|2[0-1]) Oct/.test(c.created));
    if (s.includes('lead')) return `You've had <b>${newLeads.length} new leads</b> in the last 7 days. The top sources were:
      <ul><li><b>Facebook Ad</b> and <b>Google Ad</b>: Invisalign enquiries (Olivia Bennett, Sophie Turner)</li><li><b>Website Form</b>: Daniel Hughes, booked a check-up</li><li><b>Google Business</b>: Emma Clarke</li></ul>
      Olivia Bennett hasn't been booked yet. Would you like me to draft a follow-up message to her?`;
    if (s.includes('appointment') || s.includes('tomorrow') || s.includes('booking')) return `You have <b>2 appointments tomorrow</b> (Tue 27 Oct):
      <ul><li><b>09:00</b> Check-up &amp; Clean with Daniel Hughes (James Okafor)</li><li><b>11:00</b> New Patient Consultation with Liam Patel (Sarah Mitchell)</li></ul>
      Both are confirmed, and reminders will go out automatically the evening before.`;
    if (s.includes('unread') || s.includes('conversation')) return `You have <b>4 unread messages</b> across 3 conversations:
      <ol><li><b>Olivia Bennett</b> (SMS): wants an Invisalign consultation on Thursday. <i>Needs a reply.</i></li><li><b>Daniel Hughes</b> (Email): asking to move his check-up to next week.</li><li><b>Ava Robinson</b> (Instagram): asking about whitening for sensitive teeth.</li></ol>
      Olivia is the most urgent: she's ready to book.`;
    if (s.includes('team') || s.includes('staff') || s.includes('user')) return `To add a team member:
      <ol><li>Go to <b>Settings → My Staff</b>.</li><li>Click <b>Add Employee</b> and enter their name, email and phone.</li><li>Under <b>User Permissions</b>, switch on only what they need.</li><li>Choose their <b>User Role</b> (Admin or User) and click <b>Save</b>.</li></ol>
      They'll get an email invitation to set their password.`;
    if (s.includes('draft') || s.includes('follow')) return `Here's a follow-up you could send Olivia by SMS:<br><br><i>"Hi Olivia, it's Sarah from Bloom Dental. We have a free Invisalign scan slot this Thursday at 10:00. Would that suit you? Just reply YES and I'll book you in."</i>`;
    return `Here's what I found in your account. Try asking about your leads, appointments, conversations, pipelines, or how to set something up, like "How do I connect my Google Business Profile?"`;
  }

  function render(view) {
    view.style.padding = '0';
    view.innerHTML = `
      <div class="ai-wrap">
        <aside class="ai-side">
          <button class="btn primary" id="ai_new" style="justify-content:center">${icon('plus', 18)} New chat</button>
          <h6>RECENT</h6>
          ${['Invisalign leads this month', 'No-show rate last 30 days', 'Draft review reply for Henry', 'Set up missed-call text-back'].map((h) => `<div class="h">${icon('chat', 15)} ${esc(h)}</div>`).join('')}
        </aside>
        <section class="ai-main">
          <div class="ai-scroll" id="ai_scroll"><div class="ai-col" id="ai_thread"></div></div>
          <div class="ai-input"><div class="ai-box" id="ai_box">
            <span style="color:var(--purple)">${icon('ai', 22)}</span>
            <input id="ai_input" placeholder="Ask anything about your business or how to use Kyntlo…" autocomplete="off">
            <button class="ai-send" id="ai_send">${icon('send', 20)}</button></div>
            <div class="ai-note">Ask AI can make mistakes. Check important information.</div></div>
        </section>
      </div>`;
    const thread = $('#ai_thread');
    const draw = () => {
      if (!chat.messages.length) {
        thread.innerHTML = `<div class="ai-hello"><div class="orb">${icon('ai', 34)}</div><h1>Hi ${esc(data.me.name.split(' ')[0])}, how can I help?</h1>
          <p>Ask me about your contacts, conversations, appointments and pipeline, or how to do anything in Kyntlo.</p>
          <div class="ai-sugs">${SUGGESTIONS.map(([ic, t], i) => `<button class="ai-sug" id="ai_sug_${i}" data-q="${esc(t)}">${icon(ic, 18)}<span>${esc(t)}</span></button>`).join('')}</div></div>`;
        $$('[data-q]', thread).forEach((b) => (b.onclick = () => ask(b.dataset.q)));
        return;
      }
      thread.innerHTML = chat.messages.map((m) => m.me
        ? `<div class="ai-msg me"><div class="b">${esc(m.text)}</div></div>`
        : `<div class="ai-msg bot"><span class="av">${icon('ai', 18)}</span><div class="b">${m.typing ? '<span class="ai-typing"><span></span><span></span><span></span></span>' : m.html}</div></div>`).join('');
      const sc = $('#ai_scroll'); sc.scrollTop = sc.scrollHeight;
    };
    const ask = (q) => {
      q = q.trim();
      if (!q) return;
      chat.messages.push({ me: true, text: q });
      const bot = { typing: true };
      chat.messages.push(bot);
      $('#ai_input').value = '';
      draw();
      setTimeout(() => { bot.typing = false; bot.html = answer(q); if ($('#ai_thread')) draw(); }, 900);
    };
    $('#ai_send').onclick = () => ask($('#ai_input').value);
    $('#ai_input').onkeydown = (e) => { if (e.key === 'Enter') ask(e.target.value); };
    $('#ai_new').onclick = () => { chat.messages = []; draw(); };
    draw();
  }

  KY.screen('ask-ai', { tabs: [], render });
})();
