import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--background) text-(--text-primary) transition-colors duration-300">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="mb-8 inline-flex w-fit items-center rounded-full border border-(--primary)/30 bg-(--surface) px-4 py-2 text-sm uppercase tracking-[0.3em] text-(--primary) shadow-[0_0_30px_rgba(217,4,41,0.16)]">
          FERRO.OS / foundation
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A cinematic operating system foundation for the future of the portfolio.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-(--text-secondary)">
              The foundation layer is now prepared with a typed theme system, global design tokens,
              and a modular structure aligned with the blueprint.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-(--surface) p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-(--muted)">
                  system status
                </p>
                <p className="mt-2 text-xl font-medium text-(--text-primary)">
                  Foundation ready
                </p>
              </div>
              <ThemeToggle />
            </div>

            <div className="space-y-3 text-sm text-(--text-secondary)">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <span>Theme engine</span>
                <span className="text-(--success)">Ready</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <span>Global tokens</span>
                <span className="text-(--success)">Ready</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <span>Architecture shell</span>
                <span className="text-(--success)">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
