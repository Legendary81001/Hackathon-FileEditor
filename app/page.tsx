export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f3] text-[#17211b]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <a className="text-lg font-semibold tracking-tight" href="/">
            synora<span className="text-[#db5a3c]">.</span>
          </a>
          <span className="rounded-full border border-[#cad4c8] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#5d6b61]">
            Early access
          </span>
        </header>

        <section className="flex flex-1 items-center py-20 lg:py-28">
          <div className="grid w-full gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-7 text-sm font-medium uppercase tracking-[0.22em] text-[#db5a3c]">
                Make space for the good work
              </p>
              <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[5.8rem]">
                Synora
                <br />
                Collaborative Editor
              </h1>
              <p className="mt-8 max-w-md text-lg leading-8 text-[#5d6b61]">
                A calm, focused place for teams to shape ideas together. Built
                for the moment before the work gets complicated.
              </p>
              <button className="mt-10 rounded-full bg-[#17211b] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#db5a3c]">
                Coming soon
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
              <div className="aspect-square rounded-[2.5rem] bg-[#dce6d9] p-5 shadow-[0_24px_70px_rgba(32,53,39,0.12)] sm:p-8">
                <div className="flex h-full flex-col rounded-[1.75rem] bg-[#fffdf8] p-6 shadow-sm sm:p-8">
                  <div className="flex items-center justify-between border-b border-[#e4e8df] pb-5">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#db5a3c]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#e7ba58]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#86a889]" />
                    </div>
                    <span className="text-xs text-[#8a968b]">Untitled draft</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-4">
                    <div className="h-3 w-2/3 rounded-full bg-[#17211b]" />
                    <div className="h-2 w-full rounded-full bg-[#dce6d9]" />
                    <div className="h-2 w-5/6 rounded-full bg-[#dce6d9]" />
                    <div className="mt-5 h-2 w-1/2 rounded-full bg-[#e8eee5]" />
                    <div className="h-2 w-4/5 rounded-full bg-[#e8eee5]" />
                  </div>
                  <div className="flex items-center gap-2 border-t border-[#e4e8df] pt-5">
                    <span className="h-7 w-7 rounded-full bg-[#db5a3c]" />
                    <span className="h-2 w-20 rounded-full bg-[#dce6d9]" />
                  </div>
                </div>
              </div>
              <span className="absolute -bottom-5 -left-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#e7ba58] text-center text-xs font-medium leading-4 text-[#17211b] shadow-lg sm:-left-10">
                Ideas,
                <br />
                in sync.
              </span>
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-[#dfe5dc] pt-5 text-xs text-[#8a968b]">
          <span>For teams who think out loud.</span>
          <span>2026</span>
        </footer>
      </div>
    </main>
  );
}