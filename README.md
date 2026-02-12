# SpecFlow — Feature Planning Tool

A mini planning tool that helps product and engineering teams translate feature ideas into actionable user stories and engineering tasks.

🔗 **Live Demo**: [https://spec-flow-navy.vercel.app/](https://spec-flow-navy.vercel.app/)
📦 **GitHub Repo**: [https://github.com/Prakashsuriya/SpecFlow](https://github.com/Prakashsuriya/SpecFlow)

## Tech Stack

- **Frontend**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4
- **Storage**: Browser LocalStorage (no backend required)
- **Hosting**: Vercel
- **Containerization**: Docker (nginx)

## How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Prakashsuriya/SpecFlow.git
cd SpecFlow

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
#    → http://localhost:5173/
```

### Production Build

```bash
npm run build     # Build for production
npm run preview   # Preview the production build locally
```

### Run with Docker

```bash
docker build -t specflow .
docker run -p 3000:80 specflow
# → Open http://localhost:3000/
```

## Deployment

The app is deployed on **Vercel** via GitHub integration:
- Every push to the `main` branch triggers an automatic build and deployment
- Vercel auto-detects the Vite framework — zero configuration required
- Live at: [https://spec-flow-navy.vercel.app/](https://spec-flow-navy.vercel.app/)

## Features

- ✅ **Spec Input Form** — Capture feature goal, target users, constraints
- ✅ **Template Selector** — Web, Mobile, Internal Tool, Custom (each adds template-specific tasks)
- ✅ **User Story Generation** — Format: `"As a [user], I want [feature] so that [benefit]"`
- ✅ **Engineering Task Generation** — Format: `"[Component]: [Action] [Description]"`
- ✅ **Risks & Unknowns** — Auto-generated blockers, unknowns, and assumptions
- ✅ **Inline Editing** — Click any title, description, or priority to edit in-place
- ✅ **Drag-and-Drop Reordering** — Reorder tasks via native drag-and-drop
- ✅ **Grouping** — Toggle between type, priority, component, or phase
- ✅ **Export** — Markdown and plain text with grouping preserved, copy or download
- ✅ **History** — Last 5 specs saved in LocalStorage with metadata in sidebar
- ✅ **Dark Glassmorphism Theme** — Premium UI with gradient accents and animations
