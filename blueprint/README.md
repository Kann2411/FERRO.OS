# FERRO.OS

> An immersive operating system built as the interactive portfolio of Kristian Kamilo Ferrin.

FERRO.OS is not a traditional portfolio.

It is an interactive operating system where visitors become Explorers, unlocking modules, discovering projects, music, technical skills and hidden experiences through exploration.

---

# Tech Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- TanStack Query
- GSAP (advanced animations)
- Three.js / React Three Fiber (3D experiences)
- Shadcn UI
- Lucide Icons

---

# Requirements

- Node.js 22+
- pnpm 10+

---

# Installation

Clone the repository.

```bash
git clone https://github.com/your-user/FERRO.OS.git
```

Go into the project.

```bash
cd FERRO.OS
```

Install dependencies.

```bash
pnpm install
```

---

# Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

# Run Development Server

```bash
pnpm dev
```

---

# Build

```bash
pnpm build
```

---

# Start Production

```bash
pnpm start
```

---

# Project Structure

```
FERRO.OS/

app/
components/
hooks/
lib/
services/
store/
types/
public/
blueprint/
```

---

# Blueprint

All project documentation lives inside:

```
blueprint/
```

Read the Blueprint before contributing to the project.

---

# Development Philosophy

FERRO.OS follows a Blueprint-First workflow.

Documentation defines the architecture before implementation.

Every feature must respect the project's vision, exploration system and design principles.

---

# Related Repository

The backend for FERRO.OS is maintained in a separate repository.

The frontend communicates with it through a REST API.

---

# License

MIT License

---

Made with ❤️ by Kristian Kamilo Ferrin