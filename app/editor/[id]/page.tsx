import Link from "next/link";

import EditorToolbar from "../../../components/EditorToolbar";

type IconName =
	| "arrow-left"
	| "bold"
	| "check"
	| "file"
	| "more"
	| "share"
	;

type EditorPageProps = {
	params: Promise<{ id: string }>;
};

const collaborators = [
	{ initials: "AM", color: "bg-[#f0b18f]" },
	{ initials: "JK", color: "bg-[#b8cfb7]" },
	{ initials: "TR", color: "bg-[#e7ba58]" },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
	const common = { fill: "none", height: size, viewBox: "0 0 24 24", width: size };

	switch (name) {
		case "arrow-left":
			return <svg {...common}><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
		case "file":
			return <svg {...common}><path d="M6.5 3.75h7l4 4v12.5h-11V3.75Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="M13.5 3.75v4h4M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
		case "share":
			return <svg {...common}><path d="M8 12h8M14 6l6 6-6 6M4 5h4v4M4 19h4v-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "check":
			return <svg {...common}><path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
		case "more":
			return <svg {...common}><circle cx="5" cy="12" fill="currentColor" r="1.4" /><circle cx="12" cy="12" fill="currentColor" r="1.4" /><circle cx="19" cy="12" fill="currentColor" r="1.4" /></svg>;
	}
}

function CollaboratorAvatars() {
	return <div aria-label="Three collaborators viewing this document" className="flex items-center">{collaborators.map((collaborator, index) => <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fffdf8] text-[10px] font-bold text-[#17211b] ${collaborator.color} ${index > 0 ? "-ml-2" : ""}`} key={collaborator.initials} title={collaborator.initials}>{collaborator.initials}</span>)}<span className="ml-2 text-xs text-[#718075]">3 here</span></div>;
}

export default async function EditorPage({ params }: EditorPageProps) {
	await params;

	return <main className="min-h-screen bg-[#f7f8f3] text-[#17211b]">
		<header className="border-b border-[#dfe5dc] bg-[#fffdf8]">
			<div className="mx-auto flex min-h-[72px] max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8">
				<div className="flex min-w-0 items-center gap-3">
					<Link aria-label="Back to documents" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#718075] transition hover:bg-[#eef3eb] hover:text-[#17211b] focus:outline-none focus:ring-2 focus:ring-[#db5a3c]" href="/documents"><Icon name="arrow-left" /></Link>
					<Link className="hidden items-center gap-2.5 border-r border-[#dfe5dc] pr-5 sm:flex" href="/"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17211b] text-[#fffdf8]"><Icon name="file" size={18} /></span><span className="text-[15px] font-semibold tracking-[-0.02em]">Debugger&apos;s <span className="text-[#db5a3c]">File Editor</span></span></Link>
					<div className="min-w-0"><input aria-label="Document title" className="block w-full max-w-[360px] truncate border-0 bg-transparent px-1 py-0.5 text-[16px] font-semibold tracking-[-0.02em] text-[#17211b] outline-none ring-0 placeholder:text-[#8a968b] focus:bg-[#f3f6f0] sm:text-[17px]" defaultValue="Project Architecture & Roadmap" readOnly /><p className="px-1 text-[11px] text-[#8a968b]">Last edited a few moments ago</p></div>
				</div>
				<div className="flex shrink-0 items-center gap-3"><div className="hidden items-center gap-2 text-xs text-[#718075] md:flex"><span className="flex h-2 w-2 rounded-full bg-[#86a889]" />Connected</div><CollaboratorAvatars /><button className="flex h-9 items-center gap-2 rounded-full bg-[#db5a3c] px-4 text-sm font-semibold text-white shadow-[0_5px_14px_rgba(219,90,60,0.18)] transition hover:bg-[#c84d31] focus:outline-none focus:ring-2 focus:ring-[#db5a3c] focus:ring-offset-2" type="button"><Icon name="share" size={16} /> <span className="hidden sm:inline">Share</span></button><button aria-label="More document actions" className="hidden h-9 w-9 items-center justify-center rounded-full text-[#718075] transition hover:bg-[#eef3eb] hover:text-[#17211b] focus:outline-none focus:ring-2 focus:ring-[#db5a3c] sm:flex" title="More actions" type="button"><Icon name="more" size={19} /></button></div>
			</div>
		</header>

		<section className="mx-auto max-w-[1600px] px-3 py-4 sm:px-8 sm:py-7">
			<div className="overflow-hidden rounded-xl border border-[#dfe5dc] bg-[#f9faf6] shadow-[0_12px_35px_rgba(32,53,39,0.06)]">
				<EditorToolbar />
				<div className="min-h-[calc(100vh-180px)] overflow-x-auto bg-[#edf2eb] px-3 py-7 sm:px-8 sm:py-10 lg:px-16">
					<article aria-label="Document editor placeholder" className="mx-auto min-h-[720px] w-full max-w-[850px] bg-[#fffdf8] px-7 py-12 shadow-[0_6px_22px_rgba(32,53,39,0.08)] sm:px-16 sm:py-16 lg:px-24 lg:py-20">
						<div className="mx-auto max-w-[640px]">
							<div className="mb-12 border-b border-[#e8ece5] pb-8"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#db5a3c]">Product notes</p><h1 className="text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#17211b] sm:text-[38px]">Project Architecture &amp; Roadmap</h1><p className="mt-4 text-sm leading-6 text-[#8a968b]">A shared view of the foundations we are building and where they take us next.</p></div>
							<div className="space-y-7 text-[16px] leading-8 text-[#405246]"><p><span className="font-semibold text-[#17211b]">The simple version:</span> make it easy for a team to move from an early thought to a clear, shared plan.</p><div><h2 className="mb-2 text-xl font-semibold tracking-[-0.025em] text-[#17211b]">What we are building</h2><p>One calm place for documents, decisions, and the conversations around them. The workspace should stay quiet while the work gets interesting.</p></div><ul className="space-y-3 pl-6"><li className="pl-2 marker:text-[#db5a3c]">A focused document surface that keeps ideas readable.</li><li className="pl-2 marker:text-[#db5a3c]">Lightweight presence so the team can work together naturally.</li><li className="pl-2 marker:text-[#db5a3c]">A flexible foundation for the next iteration.</li></ul><p className="rounded-lg border-l-2 border-[#db5a3c] bg-[#f6eee8] px-5 py-4 text-[15px] leading-7 text-[#58685c]">This area is a visual placeholder. The real collaborative editor will be mounted here when the document engine is connected.</p><p className="text-[#9aa59b]">Start writing here...</p></div>
						</div>
					</article>
				</div>
			</div>
		</section>
	</main>;
}
