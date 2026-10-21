// Track A · Module 9 · Lesson 3 — If/Else, waits & goals.
// Extends the draft "6-Month Recall Reactivation" workflow on the demo workspace.
// Scenes share state after the first `goto`: new steps get ids n1, n2, … in the order added.
const opt = (text) => `.menu button:has-text("${text}")`;

export default {
  id: 'A-9.3',
  title: 'Kyntlo Academy 9.3 — If/Else, waits & goals',
  description:
    'Make your workflows react to what people do: use Wait steps, split contacts with If/Else branches, and use Goal Events to stop chasing people who already did what you wanted.',
  tags: ['Kyntlo', 'Kyntlo Academy', 'Workflows', 'If/Else', 'Marketing automation'],
  plan: 'GROWTH+',
  thumbnail: { kicker: 'Module 9 · Lesson 3', title: 'If/Else, *waits* & goals' },
  scenes: [
    {
      chapter: 'Intro',
      card: { type: 'intro', kicker: 'Module 9 · Lesson 3', title: 'If/Else, *waits* & goals', sub: 'Workflows that react to what people actually do.' },
      say: "So far, our workflows send the same steps to everyone. In this lesson, you'll make them react to what people do. We'll use waits to give people time, If/Else to send them down different paths, and goals to stop chasing anyone who's already said yes.",
    },
    {
      chapter: 'The starting point',
      goto: '{demo}#/automation/workflows/w6',
      settle: 1,
      say: "Here's Bloom's recall workflow, still a draft. When a contact gets the reactivation tag, it sends one text inviting them back for a check-up. Then it simply ends. Let's turn it into something smarter.",
      actions: [
        { at: 0.4, highlight: '#wf_trigger_0', label: 'Tag added: reactivation', for: 3.6 },
        { at: 4.4, hover: '#wf_node_s1' },
        { at: 4.6, highlight: '#wf_node_s1', label: 'One text…', for: 3 },
        { at: 8.0, highlight: '.wf-end', label: '…then nothing', for: 2.6 },
      ],
    },
    {
      chapter: 'Wait options',
      say: "First, give people time to answer. Add a Wait step. Open the Wait for menu, and you'll see the options. A time delay, a time relative to an appointment, a condition, a reply, a link click, or an email event.",
      actions: [
        { at: 0.4, click: '#wf_plus_end' },
        { at: 2.0, click: '#wfa_wait' },
        { at: 3.8, click: '#wfa_wait_type' },
        { at: 4.6, highlight: '.menu', label: 'Ways to wait', for: 6 },
        { at: 4.8, zoom: '.menu', scale: 1.5, for: 6 },
      ],
    },
    {
      chapter: 'A simple time delay',
      say: "A simple time delay works well here. Choose Time Delay, set it to two days, and save. Two days is long enough to feel relaxed, and short enough that they still remember your message.",
      actions: [
        { at: 0.4, click: opt('Time Delay') },
        { at: 1.8, click: '#wfa_wait_amount' },
        { at: 2.2, press: 'Control+a' },
        { at: 2.4, type: '2' },
        { at: 3.0, click: '#wfa_wait_unit' },
        { at: 4.0, click: opt('Days') },
        { at: 4.6, zoom: '.drawer .modal-b', scale: 1.5, for: 3.6 },
        { at: 9.0, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Add an If/Else',
      say: "Now the decision. Add an If/Else step. Name the first branch Replied, then set the condition: contact replied is yes. Anyone who doesn't match goes down the None branch automatically.",
      actions: [
        { at: 0.3, click: '#wf_plus_end' },
        { at: 1.6, type: 'if', into: '#wfa_search' },
        { at: 2.6, click: '#wfa_if_else' },
        { at: 4.2, click: '#wfa_branch_name' },
        { at: 4.6, press: 'Control+a' },
        { at: 4.8, type: 'Replied' },
        { at: 6.4, click: '#wfa_cond_field' },
        { at: 7.4, click: opt('Contact replied') },
        { at: 8.4, click: '#wfa_cond_value' },
        { at: 9.2, click: opt('Yes') },
        { at: 9.6, zoom: '.drawer .modal-b', scale: 1.4, for: 3 },
        { at: 13.0, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Two lanes',
      say: "And there they are: two lanes. Every contact is checked at this point, and goes down exactly one path. Each lane has its own plus buttons, so you can give each group different actions.",
      actions: [
        { at: 0.4, highlight: '#wf_node_n2', label: 'The question', for: 2.8 },
        { at: 3.4, hover: '#wf_branch_n2_0' },
        { at: 3.6, highlight: '#wf_branch_n2_0', label: 'Replied', for: 2.6 },
        { at: 6.4, hover: '#wf_branch_n2_1' },
        { at: 6.6, highlight: '#wf_branch_n2_1', label: 'Everyone else', for: 2.6 },
      ],
    },
    {
      chapter: 'The Replied branch',
      say: "People who replied are interested, so they deserve a human. In the Replied lane, add a task for the front desk: call to book a check-up. The team will see it in their task list.",
      actions: [
        { at: 0.4, click: '#wf_plus_n2_0_end' },
        { at: 2.0, click: '#wfa_add_task' },
        { at: 3.4, type: 'Call to book check-up', into: '#wfa_task_title', delay: 40 },
        { at: 6.4, highlight: '#wfa_assign', label: 'Who does it', for: 2.6 },
        { at: 9.4, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'The None branch',
      say: "People who didn't reply get a different nudge, through a different channel. In the None lane, add an email. Some people ignore texts but read every email, so a second channel often wins them back.",
      actions: [
        { at: 0.4, click: '#wf_plus_n2_1_end' },
        { at: 2.0, click: '#wfa_send_email' },
        { at: 3.6, type: "We'd love to see you again", into: '#wfa_subject', delay: 40 },
        { at: 9.4, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'Goal events',
      say: "Finally, a goal. A Goal Event watches for the result you want, here, the consultation booked tag. The moment a contact gets it, from anywhere in the workflow, they jump straight to the goal and skip the steps in between. No more reminders for people who've already booked.",
      actions: [
        { at: 0.4, click: '#wf_plus_n2_1_end' },
        { at: 1.8, click: '#wfa_goal_event' },
        { at: 3.6, highlight: '#wfa_goal_tag', label: 'The result you want', for: 3.4 },
        { at: 7.4, hover: '.drawer .wf-box' },
        { at: 7.6, zoom: '.drawer .wf-box', scale: 1.6, for: 5.6 },
      ],
    },
    {
      chapter: 'If the goal is not met',
      say: "You also decide what happens if someone reaches the goal without meeting it. They can carry on, wait until the goal is met, or leave. Here, choose End this workflow, then save.",
      actions: [
        { at: 0.4, click: '#wfa_goal_else' },
        { at: 1.6, highlight: '.menu', label: 'Your choice', for: 4 },
        { at: 6.0, click: opt('End this workflow') },
        { at: 8.2, click: '#wfa_save' },
      ],
    },
    {
      chapter: 'The whole picture',
      say: "Zoom out to see the whole workflow. One text, a two-day wait, then a branch: a phone call for people who replied, and an email for everyone else, with a goal to stop as soon as they book. Save it as a draft until you've tested it.",
      actions: [
        { at: 0.4, click: '#wf_zoom_out' },
        { at: 1.0, click: '#wf_zoom_out' },
        { at: 2.0, highlight: '#wf_flow', label: 'Branching recall workflow', for: 5 },
        { at: 12.6, click: '#wf_save' },
      ],
    },
    {
      chapter: 'Pro tip',
      card: { type: 'chapter', kicker: 'Pro tip', title: 'Give every path an *ending*', sub: 'Every lane should end with a person, a goal, or a clear stop.' },
      say: "Here's a pro tip. Follow each lane to its end, and ask: what happens to this person now? Every path should finish with a human follow-up, a goal, or a clear stop, so nobody gets forgotten, and nobody gets chased forever.",
    },
    {
      card: { type: 'outro', kicker: 'Up next · Lesson 9.4', title: '*Appointment* workflows', sub: 'Confirmations, reminders and no-show recovery.', cta: 'Kyntlo [Academy]' },
      say: "You can now build workflows that think for themselves. Next, we'll put this to work on appointments, with confirmations, reminders, and a no-show recovery workflow. See you there!",
    },
  ],
};
