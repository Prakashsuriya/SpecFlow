# AI Notes

## What AI Was Used For

- **Project scaffolding** — Generating the initial Vite + React + Tailwind CSS project structure
- **Component architecture** — Designing the React component hierarchy (App, SpecForm, Sidebar, ResultsPanel, TaskCard, ExportModal)
- **Task generation engine** — Writing the deterministic `generator.js` module that produces user stories, engineering tasks, template-specific enhancements, and risk assessments from structured input
- **Export module** — Building text and markdown export with dynamic grouping support
- **Tailwind styling** — Writing all component styling with Tailwind CSS v4 utility classes and custom theme tokens
- **Bug fix** — Diagnosing and fixing the export modal positioning issue (caused by `backdrop-filter` creating a CSS containing block; resolved with `createPortal`)

## What I Checked Myself

- Verified the dev server runs without errors
- Verified the production build compiles cleanly (37 modules, 234KB)
- Tested the export modal fix after applying the `createPortal` solution
- Reviewed generated user story and engineering task formats match the specified patterns
- Confirmed LocalStorage persistence works (specs survive page reload)

## LLM / Provider

**This app does not use any LLM or external AI API at runtime.**

Task/story generation is entirely **deterministic and client-side**. The `generator.js` module uses keyword extraction, pattern matching, and template-based generation to produce structured outputs from the user's input. This was a deliberate design choice:

1. **No API key required** — The app works immediately, offline, with zero configuration
2. **Predictable outputs** — Deterministic generation means consistent, reproducible results
3. **No cost** — No per-request LLM charges
4. **Privacy** — User input never leaves the browser

The development itself was assisted by **Claude (Anthropic)** via the Antigravity coding assistant.
