# MeetingMind — AI-Powered Action Plan Generator

> Turn messy meeting transcripts into clear tasks, owners, and exec reports — powered by Claude + Genspark.

---

## The Problem

Inside every company:
- Meetings happen constantly
- People talk a lot
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
- Prompt-ready handoff into Genspark AI Docs / Super Agent
- Clean project tracker doc, team update, or leadership memo

---

## Demo

**Input:**
```text
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
git clone https://github.com/veesesh/push-to-prod
cd push-to-prod
npm install
cp .env.local.example .env.local
```

Add your `ANTHROPIC_API_KEY` to `.env.local`, then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Next.js 16 Note

This repo explicitly sets `turbopack.root` in `next.config.ts` to `process.cwd()`.

That avoids a Next.js 16 workspace-root detection issue when multiple lockfiles exist above this app, which can otherwise break module resolution during local development.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your key from [console.anthropic.com](https://console.anthropic.com) |

---

## Genspark Integration

This repo now uses a prompt-based Genspark handoff instead of relying on an undocumented deep link.

### Why

Based on Genspark's public help center and product pages, the stable documented workflow is:

- Open the Genspark workspace
- Start in **AI Docs** or **Super Agent**
- Paste a detailed prompt

That is the integration this app supports directly.

### Current Flow

1. User pastes a transcript into MeetingMind
2. Claude returns:
   - summary
   - task list
   - blockers / risks
   - follow-up email draft
3. MeetingMind builds a polished Genspark brief
4. User clicks `Open Genspark`
5. The brief is copied to clipboard and pasted into Genspark

### Where The Logic Lives

- `lib/genspark.ts`
  Builds the structured prompt sent to Genspark
- `components/GensparkButton.tsx`
  Handles copy-to-clipboard + open-workspace UX

### Recommended Prompt Target In Genspark

- **AI Docs** for a formatted status report or leadership memo
- **Super Agent** for a broader workspace task like "turn this into a board update and refine the layout"

### If Genspark Ships A Public API Later

Replace the current prompt handoff with:

1. A new server route such as `app/api/genspark/route.ts`
2. Secret storage for Genspark credentials in `.env.local`
3. A POST from the frontend to your server route
4. Server-side creation of docs/reports
5. Returning a report URL or report ID back to the UI

Until Genspark publishes an official API contract for this workflow, the clipboard + workspace handoff is the lowest-risk integration path.

---

## File Structure

```text
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── analyze/
│           └── route.ts
├── components/
│   ├── TranscriptInput.tsx
│   ├── OutputCards.tsx
│   └── GensparkButton.tsx
├── lib/
│   ├── claude.ts
│   └── genspark.ts
├── .env.local.example
└── README.md
```

---

## Architecture

```text
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
  Genspark Prompt Builder (lib/genspark.ts)
        │
        ▼
  Open Genspark + paste prompt
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 16 + Tailwind CSS 4 |
| AI | Claude API (`claude-sonnet-4-6`) |
| Reports | Genspark.ai |
| Deploy | Vercel |

---

## Roadmap

- [ ] Slack OAuth — auto-import channel threads
- [ ] Recurring weekly digest
- [ ] Direct Notion/Linear task creation
- [ ] Team dashboard with history
- [ ] Direct Genspark API integration, if and when an official API is published

---

## Built With

- [Claude API](https://docs.anthropic.com)
- [Genspark](https://www.genspark.ai)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
