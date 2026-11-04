<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:agent-memory-rules -->
# Agent Memory Protocol

- This project keeps a memory file at the repository root: `memory.md`.
- Before starting any task, read `memory.md` to know the current state, completed fixes and pending work.
- After completing or changing any task, update `memory.md` accordingly:
  - Mark the task/phase as done with `[x]`.
  - Add newly discovered pending fixes/tasks with `- [ ]`.
  - Record key context, decisions and commit hashes when relevant.
- Keep `memory.md` concise; do not store bulk information, only current actionable state.
- Keep `memory.md` under a maximum of ~100 lines; trim completed sections when it grows beyond that limit.
- When ALL pending tasks are finished, clean `memory.md` (reset the completed/pending lists) before finishing.
- Always follow this protocol so context is not lost between sessions or agents.
<!-- END:agent-memory-rules -->
