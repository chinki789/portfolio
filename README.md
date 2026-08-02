# Chinki — Full-Stack Portfolio

A real full-stack portfolio: an **Express.js backend** serving your profile, projects, skills, and
education from a JSON data store via a REST API, plus a **working contact form** that saves messages
on the server. The frontend fetches everything dynamically — nothing is hard-coded in the HTML.

## How it's built

```
portfolio-fullstack/
├── server/
│   ├── index.js      # Express app + all API routes
│   └── db.js          # tiny file-based "database" (reads/writes db.json)
├── public/
│   ├── index.html     # page skeleton (containers filled in by JS)
│   ├── style.css      # all styling
│   └── script.js       # fetches API data, renders the page, handles the contact form
├── db.json             # your portfolio data + stored contact messages
├── package.json
├── .env.example
└── .gitignore
```

**No database server to install** — data lives in `db.json` and is read/written directly, so this runs
anywhere Node.js runs, with zero external services.

### API endpoints
| Method | Route                | What it does                                      |
|--------|-----------------------|----------------------------------------------------|
| GET    | `/api/portfolio`       | everything at once (profile, projects, skills…)    |
| GET    | `/api/profile`         | name, tagline, stats, links                        |
| GET    | `/api/experience`      | work experience                                    |
| GET    | `/api/projects`        | project list                                       |
| GET    | `/api/skills`          | skill bars + skill groups                          |
| GET    | `/api/education`       | education timeline                                 |
| GET    | `/api/leadership`      | leadership/extracurricular list                     |
| GET    | `/api/certifications`  | certifications list                                 |
| POST   | `/api/contact`         | submit the contact form (validated + rate-limited) |
| GET    | `/api/messages`        | view submitted messages (needs `x-admin-key` header)|
| GET    | `/api/health`          | health check                                        |

## Run it locally

1. Make sure [Node.js](https://nodejs.org) (v18+) is installed.
2. In the project folder:
   ```bash
   npm install
   cp .env.example .env
   npm start
   ```
3. Open **http://localhost:3000** — the whole site loads, and the contact form actually works
   (submissions get saved into `db.json`).

To view submitted messages:
```bash
curl http://localhost:3000/api/messages -H "x-admin-key: <the ADMIN_KEY from your .env>"
```

## Editing your content

Everything on the page — projects, skills, education, stats — comes from **`db.json`**. Edit that file
and refresh the page; no HTML editing required. Want a new project? Add an object to the `projects`
array (use `"graphic": "bars"` or `"graphic": "chain"` for the built-in visuals, or add a new one in
`public/script.js`'s `GRAPHICS` object).

## Push it to GitHub

```bash
cd portfolio-fullstack
git init
git add .
git commit -m "Full-stack portfolio: Express API + dynamic frontend"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`.env` is git-ignored on purpose — never commit real secrets. Set `ADMIN_KEY` directly in your hosting
platform's environment variables instead (see below).

## Deploy it live (so it's a real, working site)

This app needs a Node server running, so **GitHub Pages alone won't work** (it only serves static files).
Use a free Node-friendly host instead:

### Render (recommended, free tier)
1. Push your repo to GitHub (above).
2. Go to [render.com](https://render.com) → **New** → **Web Service** → connect your repo.
3. Build command: `npm install` · Start command: `npm start`.
4. Add an environment variable `ADMIN_KEY` with your own secret value.
5. Deploy — Render gives you a live URL like `https://your-portfolio.onrender.com`.

### Railway
1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
2. It auto-detects Node and runs `npm start`. Add `ADMIN_KEY` under Variables.

### Notes on the free tiers
- Free instances on Render/Railway typically **sleep after inactivity** and take a few seconds to wake
  up on the next visit — that's normal and fine for a portfolio.
- `db.json` is written to local disk, so on some hosts (like Render's free tier) it **resets on redeploy**.
  For a portfolio contact form that's usually fine; if you want messages to persist long-term, swap
  `server/db.js` for a hosted database later (e.g. Postgres via Supabase/Neon) without touching the
  routes or frontend — only `db.js` would need to change.

## Before you go live — personalize these
- Replace the placeholder `github`/`linkedin`/`leetcode` URLs and project `link` URLs in `db.json`.
- Change `ADMIN_KEY` in `.env` (and in your hosting platform) to something private.
- Optional: add a real profile photo or favicon.
