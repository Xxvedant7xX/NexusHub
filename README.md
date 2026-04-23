# NexusHub

Student Team Members Management Application built with React, Node.js, Express, and MongoDB.

```
 ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗██╗  ██╗██╗   ██╗██████╗
 ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝██║  ██║██║   ██║██╔══██╗
 ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗███████║██║   ██║██████╔╝
 ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║██╔══██║██║   ██║██╔══██╗
 ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║██║  ██║╚██████╔╝██████╔╝
 ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝
```

> Course: 21CSS301T – Full Stack Development | Assessment: CLAT-2 | Batch: 2023

---

## Features

- **4 Pages** — Home, Add Member, View Team, Member Details
- **Liquid Glass UI** — Gold-accent dark/light design system with `backdrop-filter` blur cards
- **Bebas Neue** display font · **DM Sans** body · **JetBrains Mono** labels
- **Dark / Light Mode** — Persistent via `localStorage` + `data-theme` attribute
- **Image Upload** — Multipart form upload stored in `backend/uploads/`
- **Form Validation** — Required fields, real-time error display
- **Auto-seed** — 7 NexusHub team members seeded automatically on first launch
- **Horizontal roster scroll** — Members strip on home page scrolls left/right
- **Responsive** — Works on mobile, tablet, and desktop

---

## Team

| # | Name | Role |
|---|------|------|
| 1 | Aryan Mehta | Creative Director |
| 2 | Priya Sharma | Community Strategist |
| 3 | Rohan Iyer | Systems Architect |
| 4 | Ananya Patel | Performance Lead |
| 5 | Karan Verma | Product Visionary |
| 6 | Neha Joshi | Experience Curator |
| 7 | Vikram Nair | Visual Experience Lead |

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | React 18, React Router v6, Axios, Vite |
| Styling | Custom CSS — Bebas Neue, DM Sans, JetBrains Mono, gold accent design system |
| Backend | Node.js, Express, Multer |
| Database | MongoDB + Mongoose (with JSON fallback for zero-setup demo) |
| Dev tooling | Concurrently, Nodemon, ESLint |

---

## Project Structure

```text
FSD_assignment/
├── backend/
│   ├── data/                   # JSON fallback storage
│   ├── src/
│   │   ├── controllers/        # listMembers, getMemberDetails, addMember
│   │   ├── data/               # sampleMembers.js (seed data)
│   │   ├── models/             # Mongoose Member schema
│   │   ├── routes/             # /api/members routes
│   │   ├── store/              # memberStore.js (JSON + MongoDB)
│   │   └── utils/              # serialization, validation, paths
│   ├── uploads/                # Seeded SVG avatars
│   │   └── runtime/            # User-uploaded images
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/         # AppLayout, MemberCard, ThemeToggle, etc.
│   │   ├── context/            # ThemeContext
│   │   ├── data/               # team.js (constants)
│   │   ├── lib/                # api.js (Axios)
│   │   ├── pages/              # Home, AddMember, ViewMembers, MemberDetails, NotFound
│   │   └── styles/             # app.css (complete design system)
│   ├── index.html
│   └── vite.config.js
├── package.json                # Root scripts (concurrently)
└── README.md
```

---

## API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check — returns `"NexusHub backend is healthy."` |
| `GET` | `/api/members` | List all members |
| `GET` | `/api/members/:id` | Get one member by ID |
| `POST` | `/api/members` | Create a member (multipart/form-data) |
| `GET` | `/uploads/:filename` | Serve uploaded profile images |

### Sample POST body (form-data)

```
name         → Aryan Mehta
rollNumber   → NXH-001
year         → 2026
degree       → B.Tech - Experience Design
role         → Creative Director
email        → aryan@nexushub.team
phone        → +91 90000 11001
aboutProject → Shapes the visual language for NexusHub.
hobbies      → UI design, typography, concept sketches
certificate  → Creative Strategy Lab
internship   → Zeta Design Studio
aboutAim     → Merge bold design with unforgettable branding.
image        → [file upload]
```

### Sample JSON response

```json
{
  "id": "demo-xxxxxxxx",
  "name": "Aryan Mehta",
  "role": "Creative Director",
  "email": "aryan@nexushub.team",
  "rollNumber": "NXH-001",
  "year": "2026",
  "degree": "B.Tech - Experience Design",
  "imageUrl": "http://localhost:5000/uploads/aryan-mehta.svg",
  "hobbies": ["UI design", "typography", "concept sketches"],
  "createdAt": "2026-04-24T00:00:00.000Z"
}
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (optional — app works without it using JSON fallback)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd FSD_assignment
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure backend

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
HOST=127.0.0.1
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexushub
CLIENT_URL=http://127.0.0.1:5173
AUTO_SEED=true
```

> Leave `MONGO_URI` blank or remove it to use the zero-setup JSON fallback mode.

### 3. Run

```bash
# Both servers together (recommended)
npm run dev

# Or separately
npm run dev:backend
npm run dev:frontend
```

### 4. Open

| Service | URL |
|---------|-----|
| Frontend | http://127.0.0.1:5173 |
| Backend API | http://127.0.0.1:5000 |
| Health check | http://127.0.0.1:5000/api/health |
| Members JSON | http://127.0.0.1:5000/api/members |

---

## Storage Modes

| Mode | When | Notes |
|------|------|-------|
| **Demo JSON** | No MongoDB URI set, or MongoDB unreachable | Saves to `backend/data/demo-members.json`. Zero setup needed. |
| **MongoDB** | Valid `MONGO_URI` in `.env` and MongoDB running | Full persistence via Mongoose |

---

## Seed Data

Members are seeded automatically on first launch when `AUTO_SEED=true` (default).

To force-reseed at any time:

```bash
npm run seed --prefix backend
```

To reset the JSON demo data, delete `backend/data/demo-members.json` — it will be recreated on next server start.

---

## Notes

- Uploaded images are stored in `backend/uploads/runtime/`
- Seed SVG avatars are stored in `backend/uploads/`
- Theme persists via `localStorage` key `nexushub-theme`
- URL query `?theme=light` or `?theme=dark` forces a theme for screenshots
- Frontend proxies `/api` requests to the backend via Vite proxy config

---

## Checklist

- [x] Public GitHub repository
- [x] `.gitignore` included
- [x] `README.md` updated
- [x] Frontend + backend folders present
- [x] All 4 required pages implemented
- [x] API routes working (list, detail, create)
- [x] Image upload working (multipart/form-data → `uploads/`)
- [x] Auto-seed with 7 NexusHub members
- [x] Dark / Light mode toggle
- [x] Responsive layout
