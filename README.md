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

**Claude** (`claude-sonnet-4-6`) handles the intelligence:
- Summary
- Action items with owners + deadlines
- Blockers & risks
- Follow-up email draft

**Genspark** handles the presentation:
- Opens with a pre-filled executive update prompt
- Clean project tracker doc, team update

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
> Team, here are today's action items: Rahul to finalize pricing by Friday, Aditi to connect with vendor by tomorrow. Note: legal approval is delayed — escalate if needed.

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/veesesh/push-to-prod
cd push-to-prod

# 2. Install dependencies
npm install

# 3. Set your API key
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 4. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your key from [console.anthropic.com](https://console.anthropic.com) |

---

## File Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout + page metadata
│   ├── page.tsx                # Main single-page UI (state management)
│   ├── globals.css             # Tailwind CSS import
│   └── api/
│       └── analyze/
│           └── route.ts        # POST /api/analyze → Claude API
├── components/
│   ├── TranscriptInput.tsx     # Textarea + submit button
│   ├── OutputCards.tsx         # Summary / Tasks / Risks / Email cards
│   └── GensparkButton.tsx      # Opens Genspark with pre-filled prompt
├── lib/
│   └── claude.ts               # Anthropic SDK client, AnalysisResult type
├── .env.local.example          # API key template
└── README.md
```

---

## Architecture

```
User Input (transcript/notes)
        │
        ▼
   Next.js Frontend (app/page.tsx)
        │
        ▼
  POST /api/analyze (app/api/analyze/route.ts)
        │
        ▼
  Claude API — claude-sonnet-4-6 (lib/claude.ts)
        │
    Returns JSON:
    - summary
    - tasks[]  { owner, task, deadline }
    - risks[]
    - email_draft
        │
        ▼
  Output Cards (components/OutputCards.tsx)
        │
        ▼
  "Generate Report" → Genspark (components/GensparkButton.tsx)
  (opens new tab with pre-filled executive update prompt)
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 15 + Tailwind CSS |
| AI | Claude API (`claude-sonnet-4-6`) |
| Reports | Genspark.ai |
| Deploy | Vercel |

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
