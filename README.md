# AI App Builder

A full-stack web app that helps beginner developers discover and track essential tools (Vercel, GitHub, Supabase, VS Code, Node.js) — with auth, an onboarding checklist, a shareable profile page, and an AI chatbot powered by Claude.

## What you get

- **Dashboard** — Track which dev tools you've connected
- **Onboarding checklist** — Step-by-step guide to set up your environment
- **Add services** — Add custom tools to your dashboard
- **Share link** — A public `/u/[username]` page to share with others
- **AI Chat** — Ask Claude anything about Vercel, GitHub, Supabase, and more

---

## Before you start

You'll need:
1. [Node.js 18+](https://nodejs.org) installed on your computer
2. A free [Supabase](https://supabase.com) account
3. An [Anthropic API key](https://console.anthropic.com/keys)
4. A [Vercel](https://vercel.com) account (for deployment, optional for local dev)

---

## Local Setup (Step by Step)

### Step 1 — Download the project

If you have Git installed:
```bash
git clone <your-repo-url>
cd ai-app-builder
```

Or download the ZIP and extract it, then open a terminal in the folder.

### Step 2 — Install dependencies

```bash
npm install
```

This downloads all the packages the app needs. It may take 1-2 minutes.

### Step 3 — Create your Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New project** and fill in a name and password
3. Wait for the project to be created (~1 minute)
4. Go to **Settings -> API** in the left sidebar
5. Copy the **Project URL** and **anon/public** key — you'll need these in the next step

### Step 4 — Set up the database

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `supabase/schema.sql` from this project in a text editor
4. Copy all the contents and paste them into the SQL Editor
5. Click **Run** (the green button)

You should see "Success. No rows returned." — that means the tables were created.

### Step 5 — Configure environment variables

1. In the project folder, copy `.env.example` to a new file called `.env.local`:
   - Mac/Linux: `cp .env.example .env.local`
   - Windows: right-click `.env.example`, Copy, paste and rename to `.env.local`

2. Open `.env.local` in a text editor and fill in your values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ANTHROPIC_API_KEY=sk-ant-...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Save the file. **Never share or commit this file** — it contains your secret keys.

### Step 6 — Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see a login page!

---

## Deploying to Vercel

### Step 1 — Push your code to GitHub

1. Create a new repository at [github.com/new](https://github.com/new)
2. Follow GitHub's instructions to push your code

### Step 2 — Import in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New -> Project**
3. Connect your GitHub account and import your repository

### Step 3 — Add environment variables in Vercel

Before deploying, add these in **Settings -> Environment Variables**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL (e.g. `https://my-app.vercel.app`) |

### Step 4 — Deploy

Click **Deploy**. After it finishes, your app is live!

### Step 5 — Update Supabase auth settings

1. In Supabase, go to **Authentication -> URL Configuration**
2. Set **Site URL** to your Vercel URL
3. Add your Vercel URL to **Redirect URLs**: `https://your-app.vercel.app/api/auth/callback`

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login and signup pages (no sidebar)
│   ├── (app)/            # Protected pages: dashboard, onboarding, chat, add-service
│   ├── u/[username]/     # Public shareable profile page
│   └── api/              # API routes: chat endpoint, auth callback
├── components/
│   ├── auth/             # LoginForm, SignupForm
│   ├── dashboard/        # ServiceCard, ServiceToggleButton
│   ├── onboarding/       # OnboardingStep
│   ├── chat/             # ChatWindow, ChatMessage
│   ├── share/            # PublicDashboard, PublicOnboarding
│   ├── layout/           # Sidebar, MobileHeader
│   └── ui/               # Button, Input, Badge, Spinner
├── lib/
│   ├── supabase/         # Server and browser Supabase clients
│   ├── constants.ts      # BUILT_IN_SERVICES, ONBOARDING_STEPS
│   └── utils.ts          # cn() helper
├── actions/              # Server actions: auth, services, onboarding
└── types/                # TypeScript types
supabase/
└── schema.sql            # Run this in Supabase SQL Editor
```

---

## Troubleshooting

**"Invalid login credentials"** — Make sure you signed up first. Check your email if Supabase email confirmation is enabled.

**"Missing Supabase env vars"** — Check your `.env.local` file. No extra spaces around the `=` sign.

**"ANTHROPIC_API_KEY is not set"** — The AI Chat tab won't work without this. Get one at [console.anthropic.com](https://console.anthropic.com).

**Tables don't exist** — Re-run the `supabase/schema.sql` file in the Supabase SQL Editor.

**Auth not working on Vercel** — Make sure `NEXT_PUBLIC_APP_URL` is set to your actual Vercel URL, not `localhost`.
