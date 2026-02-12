# SpecFlow — Feature Planning Tool

A mini planning tool that helps product and engineering teams translate feature ideas into actionable user stories and engineering tasks.

## Tech Stack

- **Frontend**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4
- **Storage**: Browser LocalStorage (no backend required)

## How to Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → Opens at http://localhost:5173/

# Production build
npm run build
npm run preview
```

## What's Done

- ✅ **Spec Input Form** — Capture feature goal, target users, constraints
- ✅ **Template Selector** — Web, Mobile, Internal Tool, Custom (each adds template-specific tasks)
- ✅ **Task Generation** — Deterministic client-side generation of user stories (`As a [user], I want...`) and engineering tasks (`[Component]: [Action]...`)
- ✅ **Risks & Unknowns** — Auto-generated section identifying blockers, unknowns, and assumptions
- ✅ **Inline Editing** — Click any title, description, or priority to edit in-place
- ✅ **Drag-and-Drop Reordering** — Native HTML5 drag-and-drop for task reordering
- ✅ **Grouping** — Toggle between grouping by type, priority, component, or phase
- ✅ **Export** — Markdown and plain text export with grouping preserved, copy to clipboard or download
- ✅ **History** — Last 5 specs saved in LocalStorage with metadata (date, name, template) shown in sidebar
- ✅ **Dark Glassmorphism Theme** — Premium dark UI with gradient accents, animations, and responsive layout
