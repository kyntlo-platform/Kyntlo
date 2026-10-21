# Kyntlo short-form videos: batch 2

Five 9:16 videos (1080×1920, 30 fps, 27–31 s, with sound) for Reels, TikTok, Shorts, Facebook and LinkedIn.
Each video is an HTML animation in `scenes/`, rendered frame by frame by `render/render.cjs`.
The music bed and sound effects are synthesized by `render/audio.py`, so there is nothing to license.

## What was wrong with batch 1

Every post from 11 to 19 October used the same template:

> Hook question → "With Kyntlo, …" → four emoji bullets → a stat → punchline → "💬 Comment WORD" → "Kyntlo. Own Tomorrow."

Problems with that template:

- **One format, five times.** Once a viewer has seen one, they have seen them all, so they scroll past.
- **It's a feature list.** The bullets describe the software when they should show a moment the viewer recognises.
- **The product shows up too early.** "With Kyntlo…" arrives at about second 3, before there is any tension.
- **Unsupported numbers** ("94% completed before arrival", "$14,600 from $1,400"). `docs/02-content-and-claims-audit.md` says claims like these need evidence, and they read like ad copy.
- **The same caption on five platforms**, including LinkedIn and Google.

## What batch 2 does differently

| | Batch 1 | Batch 2 |
|---|---|---|
| Format | One template for every post | Five formats people already watch: group-chat comedy, time-split drama, true-crime file, gaming speedrun, printed receipt |
| Hook | A question asked in text | A situation shown in the first second: a group chat, a 2:47 AM text, a case file, a countdown, a printer |
| Story | Feature list | Problem → twist → Kyntlo as the payoff, about 60% of the way through |
| Product | Says what it does | Shows the outcome: the booking, the text-back, the calendar entry |
| Numbers | Unverified stats | No performance claims. The speedrun is labelled "illustrative" on screen |
| Sound | (n/a) | Each video has its own music and sound effects (message pops, typewriter, printer, stamps) |
| Rewatch / share | Low | Built-in reasons to share: "this is literally our tools", "tag the person who replies at 9" |

## The five videos

### 1. The Group Chat · `kyntlo-01-group-chat.mp4`
**Format:** group-chat comedy. **Sells:** all-in-one / one record per customer.
The Form Builder, CRM, Connector, Calendar App and Email Tool argue in a group chat while Sarah, the lead, falls through the gaps and books with a competitor. Then Kyntlo joins, everyone else leaves the chat, and Kyntlo asks "was it something i said".

Caption:
```
Your software has a group chat. Sarah fell through it. 💀

Form Builder got the lead. The CRM never did. The connector hit its limit. The calendar found out last.

Kyntlo puts the form, the DMs, the texts and the calendar on one record, in one inbox.

Tag the person who has 6 logins. 👇
💬 Comment STACK and we'll show you what yours looks like in one place.

#Kyntlo #SmallBusiness #CRM #BusinessOwner #Automation
```

### 2. 2:47 AM · `kyntlo-02-two-forty-seven.mp4`
**Format:** time-split drama ("two ways this goes"). **Sells:** AI conversations + booking.
A customer texts at 2:47 AM. In timeline A you reply at 8:31 and lose the job "to whoever was awake". Then a VHS rewind to timeline B, where Kyntlo's AI replies at 2:47, offers slots, books 08:00 and says "go back to sleep 😴".

Caption:
```
A customer texted at 2:47 AM. You replied at 8:31.

Someone else replied at 2:48. 🫠

Kyntlo's AI answers, offers your real slots and books it straight into your calendar while you sleep.

💬 Comment 2AM and we'll show you how it's set up.

#Kyntlo #Trades #ServiceBusiness #AIReceptionist #NeverMissALead
```

### 3. Case File #0412 · `kyntlo-03-case-file.mp4`
**Format:** true-crime / noir case file. **Sells:** missed-call text-back (+ Voice AI).
A typewritten timeline of a lost lead: the phone rings while you're up a ladder, there's no voicemail, they call the next business on Google. Stamp: *CAUSE OF DEATH: NOBODY PICKED UP*. Then the case is reopened: Kyntlo texts back instantly, they reply, and the job is booked. Stamp: *CASE CLOSED.*

Caption:
```
Case #0412: the call nobody answered. 🕵️

You were up a ladder. They didn't leave a voicemail (nobody does). Eight minutes later they'd booked someone else.

With Kyntlo, a missed call gets an instant text back, so the conversation keeps going while your hands are full.

💬 Comment CALL and we'll send you the walkthrough.

#Kyntlo #Plumber #Electrician #MissedCalls #SmallBusinessTips
```

### 4. Speedrun · `kyntlo-04-speedrun.mp4`
**Format:** gaming speedrun HUD (timer, splits, live chat, NEW RECORD). **Sells:** speed-to-lead, start to finish.
Splits: form → text-back → reply → AI qualifies → slot booked → reminder → review request. A fake Twitch-style chat reacts ("zero human inputs 💀", "i'm still looking for my phone"). Final: 1:48 vs a "by hand" best of 2d 04:17, labelled *illustrative run* on screen.

Caption:
```
Any% speedrun: lead → booked job. ⏱️

1:48 from form to calendar, with zero human inputs. Text-back, qualifying, booking, reminder, and the review request is already queued.

Your leads book whoever replies first. Be first.

💬 Comment SPEEDRUN to see the run on your own setup.
(Illustrative run. Times depend on your setup and your customer.)

#Kyntlo #SpeedToLead #SalesAutomation #SmallBusiness #Speedrun
```

### 5. The Receipt · `kyntlo-05-receipt.mp4`
**Format:** printed receipt (ASMR printer). **Sells:** follow-up, reminders, reviews, social, one platform.
A thermal printer prints *what last month really cost*: "1x Lead who called at lunch: GONE", "12x 'I'll post tomorrow': 0 POSTS", "TOTAL: MORE THAN YOU THINK. NO REFUNDS". It gets crumpled and tossed. A Kyntlo receipt for the same month prints with ✓ on every line, and TOTAL: ONE PLATFORM is highlighted.

Caption:
```
We printed what last month actually cost you. 🧾

The lead who called at lunch. 3 no-shows nobody reminded. The happy client you never asked for a review. 12 "I'll post tomorrow"s.

Same month with Kyntlo: texted back, reminded, review asked, month of posts scheduled. One platform, one invoice.

💬 Comment RECEIPT and we'll print yours.

#Kyntlo #SmallBusiness #BusinessOwner #CustomerFollowUp #Reviews
```

## Platform notes
- **LinkedIn:** lead with videos 4 and 5, and swap the emoji-heavy caption opener for a plain first line (e.g. "Most service businesses lose the job in the first hour, not the first meeting.").
- **TikTok / Reels:** post videos 1 and 2 first. They have the strongest hooks in the first second.
- **Cover frames:** use 1.5 s (V1), 2 s (V2), 11.5 s (V3, the stamp), 13 s (V4, NEW RECORD) and 9.5 s (V5, full receipt).
- Key text stays inside the safe area (about y 120 to 1560), clear of the Reels/TikTok UI.

## Re-rendering
```bash
cd marketing/videos/render
NODE_PATH=$(npm root -g) node render.cjs ../scenes/01-group-chat.html ../out/kyntlo-01-group-chat.mp4
# quick stills for review:
./preview.sh ../scenes/01-group-chat.html /tmp/v1 1.5,9,19
```
Requires Node with Playwright (Chromium), ffmpeg, and Python 3 with numpy.
