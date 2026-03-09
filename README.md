# DTI Case Study Dashboard

> Interactive dashboards and AI-powered analysis for MBA/MEM case studies — because understanding a case shouldn't end when class does.

**Live:** [oracle-salesforce-dashboard.vercel.app](https://oracle-salesforce-dashboard.vercel.app) · **Repo:** [github.com/nishtobehonest/oracle-salesforce-dashboard](https://github.com/nishtobehonest/oracle-salesforce-dashboard)

---

## Why This Exists

Case study discussions happen once. You walk into class with a PDF, spend 80 minutes on a whiteboard, and the insight evaporates. What stays is a general sense of what happened — Oracle acquired Siebel, Salesforce bet on SaaS, one won the CRM market — but not the *texture* of why.

The harder question is rarely "what happened." It's: what does a decade of actual financial data show? When exactly did the margin story flip? Which acquisition moved the needle and which didn't? What would I ask if I could interrogate the data in real time, after class, when I've had time to think?

This project is an attempt to answer that. Not to replace the case discussion, but to extend it — to make the analysis interactive, persistent, and worth returning to.

It's also a personal reminder that the question *what to build* is harder than *how to build it*, and *why build it at all* is harder still. This is my attempt to answer all three for at least one case.

---

## What It Does

Each case study is a self-contained dashboard with:

- **Data visualizations** across 4 lenses: Financials, Market Share, Product Strategy, Business Model
- **AI chat** powered by Gemini 2.5 Flash, grounded in the case data — ask analyst-level questions and get answers tied to actual numbers
- **Tab-aware context** — the AI knows what you're currently looking at, so "what does this show?" is a valid question

---

## Case Studies

| Case | Status | Lens |
|---|---|---|
| Oracle vs Salesforce | ✅ Live | Competitive strategy · SaaS vs on-premise · 10 years of financial data |
| *(next case)* | 🔜 Planned | TBD based on DTI curriculum |

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, Recharts |
| Backend | Express (local dev proxy) |
| AI | Google Gemini 2.5 Flash |
| Deployment | Vercel (frontend + serverless function) |

---

## Running Locally

```bash
git clone https://github.com/nishtobehonest/oracle-salesforce-dashboard.git
cd oracle-salesforce-dashboard
npm install

# Add your Gemini API key (get one free at aistudio.google.com)
echo "GEMINI_API_KEY=your-key-here" > .env

# Start both the Express proxy and Vite dev server
npm run dev:full
```

Open `http://localhost:5173`.

---

## Deploying to Vercel

1. Import the repo at [vercel.com](https://vercel.com) — it auto-detects Vite
2. Add `GEMINI_API_KEY` under **Settings → Environment Variables**
3. Deploy — the `/api/chat` route runs as a serverless function; everything else is static

Re-deploys automatically on every `git push`.

---

## Context

Built during the **Digital Technology Innovation** course at Cornell (MEM, Class of 2026) as a companion to in-class case study discussions. The goal is a living repository — one dashboard per major case — that makes the analysis explorable beyond the classroom.
