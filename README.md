# MeetingMind — AI-Powered Action Plan Generator

> Turn messy meeting transcripts into clear tasks, owners, and exec reports — powered by Claude + Genspark.

---

## The Problem

Inside every company:
- Meetings happen constantly
- People talk — a lot
- Nobody knows the next steps
- Follow-ups get missed
- Projects stall

## The Solution

Paste any internal communication — Slack thread, meeting notes, WhatsApp messages, transcript — and get back a structured action plan in seconds.

**Claude** handles the intelligence:
- Summary
- Action items with owners
- Deadlines
- Blockers & risks
- Follow-up email draft

**Genspark** handles the presentation:
- Pretty weekly report
- Project tracker doc
- Polished team update

---

## Demo

**Input:**
```
Rahul will finalize pricing by Friday.
Aditi to talk to vendor.
Delay in legal approval.
Need investor update Monday.
```

**Output:**

**Summary:** Launch blocked by vendor + legal delays. Two key deadlines this week.

**Tasks:**
| Owner | Task | Deadline |
|-------|------|----------|
| Rahul | Finalize pricing | Friday |
| Aditi | Vendor call | Tomorrow |

**Risks:**
- Legal approval delay blocking launch timeline
- Investor update due Monday — no owner assigned

**Follow-up Email:**
> Team, here are today's action items: Rahul to finalize pricing by Friday, Aditi to connect with vendor by tomorrow. Note: legal approval is delayed — escalate if needed. Investor update required by Monday.

---

## Architecture

```
User Input (transcript/notes)
        │
        ▼
   Next.js Frontend
        │
        ▼
  Claude API (claude-sonnet-4-6)
        │
    Returns JSON:
    - summary
    - tasks[]
    - risks[]
    - email_draft
        │
        ▼
  Display Output Cards
        │
        ▼
  "Generate Report" → Genspark
  (opens with pre-filled prompt)
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js + Tailwind CSS |
| AI | Claude API (`claude-sonnet-4-6`) |
| Reports | Genspark.ai |
| Deploy | Vercel |

---

## Claude Prompt

```
Analyze this internal meeting transcript or team conversation.

Return a JSON object with:
1. summary: 2-3 sentence overview
2. tasks: array of { owner, task, deadline }
3. risks: array of blockers or missed items
4. email_draft: short follow-up email to the team

Keep everything concise. If information is missing, flag it.

Transcript:
{{transcript}}
```

---

## Genspark Integration

After Claude returns the structured data, clicking **"Generate Report"** opens Genspark with a pre-filled prompt:

```
Create an executive team update document from this meeting summary:

{{summary}}

Tasks:
{{tasks}}

Risks:
{{risks}}

Format as a clean project tracker with sections for this week's progress, action items, and blockers.
```

---

## MVP File Structure

```
/
├── app/
│   ├── page.tsx          # Main single-page UI
│   └── api/
│       └── analyze/
│           └── route.ts  # Claude API call
├── components/
│   ├── TranscriptInput.tsx
│   ├── OutputCards.tsx
│   └── GensparkButton.tsx
├── lib/
│   └── claude.ts         # Claude client + prompt
└── README.md
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/veesesh/push-to-prod
cd push-to-prod

# 2. Install dependencies
npm install

# 3. Add your API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# 4. Run locally
npm run dev
```

---

## Roadmap

- [ ] Slack OAuth — auto-import channel threads
- [ ] Recurring weekly digest (cron-triggered Claude call)
- [ ] Direct Notion/Linear task creation
- [ ] Team dashboard with history
- [ ] Genspark API integration (when available)

---

## Built With

- [Claude API](https://docs.anthropic.com) — Anthropic's claude-sonnet-4-6
- [Genspark](https://www.genspark.ai) — AI-generated reports and docs
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
