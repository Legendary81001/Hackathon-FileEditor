import Link from "next/link";

type IconName =
	| "arrow-left"
	| "bold"
	| "check"
	| "chevron-down"
	| "file"
	| "image"
	| "italic"
	| "link"
	| "list"
	| "more"
	| "redo"
	| "share"
	| "undo"
	| "underline";

type EditorPageProps = {
	params: Promise<{ id: string }>;
};

const collaborators = [
	{ initials: "AM", color: "bg-[#f0b18f]" },
	{ initials: "JK", color: "bg-[#b8cfb7]" },
	{ initials: "TR", color: "bg-[#e7ba58]" },
];

const toolbarGroups: { label: string; icon: IconName; active?: boolean }[][] = [
	[
		{ label: "Undo", icon: "undo" },
		{ label: "Redo", icon: "redo" },
	],
	[
		{ label: "Text style", icon: "chevron-down" },
	],
	[
		{ label: "Bold", icon: "bold" },
		{ label: "Italic", icon: "italic" },
		{ label: "Underline", icon: "underline" },
	],
	[
		{ label: "Bulleted list", icon: "list" },
		{ label: "Insert link", icon: "link" },
		{ label: "Insert image", icon: "image" },
	],
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
		case "undo":
			return <svg {...common}><path d="M9 8 4 12l5 4M5 12h8a6 6 0 0 1 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "redo":
			return <svg {...common}><path d="m15 8 5 4-5 4M19 12h-8a6 6 0 0 0-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "bold":
			return <svg {...common}><path d="M8 5h5a3 3 0 0 1 0 6H8V5Zm0 6h6a3.5 3.5 0 0 1 0 7H8v-7ZM8 5v13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
		case "italic":
			return <svg {...common}><path d="M14 5h-3M13 19h-3M14 5l-4 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
		case "underline":
			return <svg {...common}><path d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
		case "list":
			return <svg {...common}><path d="M9 6h10M9 12h10M9 18h10M5 6h.01M5 12h.01M5 18h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>;
		case "link":
			return <svg {...common}><path d="m10 13.5 4-4M8 16l-1 1a3 3 0 0 1-4-4l3-3a3 3 0 0 1 4 0M16 8l1-1a3 3 0 0 1 4 4l-3 3a3 3 0 0 1-4 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "image":
			return <svg {...common}><rect height="14" rx="2" stroke="currentColor" strokeWidth="1.7" width="16" x="4" y="5" /><circle cx="9" cy="10" r="1.2" stroke="currentColor" strokeWidth="1.5" /><path d="m5 17 4-4 3 3 2-2 5 4" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "check":
			return <svg {...common}><path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
		case "more":
			return <svg {...common}><circle cx="5" cy="12" fill="currentColor" r="1.4" /><circle cx="12" cy="12" fill="currentColor" r="1.4" /><circle cx="19" cy="12" fill="currentColor" r="1.4" /></svg>;
		case "chevron-down":
			return <svg {...common}><path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
	}
}

function ToolbarButton({ label, icon, active = false }: { label: string; icon: IconName; active?: boolean }) {
	return <button aria-label={label} className={`flex h-8 items-center justify-center rounded-md px-2 text-[#627267] transition hover:bg-[#e8eee5] hover:text-[#17211b] focus:outline-none focus:ring-2 focus:ring-[#db5a3c] ${active ? "bg-[#e1ebe0] text-[#17211b]" : ""}`} title={label} type="button"><Icon name={icon} /></button>;
}

function CollaboratorAvatars() {
	return <div aria-label="Three collaborators viewing this document" className="flex items-center">{collaborators.map((collaborator, index) => <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fffdf8] text-[10px] font-bold text-[#17211b] ${collaborator.color} ${index > 0 ? "-ml-2" : ""}`} key={collaborator.initials} title={collaborator.initials}>{collaborator.initials}</span>)}<span className="ml-2 text-xs text-[#718075]">3 here</span></div>;
}

function EditorToolbar() {
	return <div aria-label="Formatting toolbar" className="flex min-h-[58px] items-center gap-1 overflow-x-auto border-b border-[#dfe5dc] bg-[#f9faf6] px-4 py-2 sm:px-8">{toolbarGroups.map((group, groupIndex) => <div className="flex shrink-0 items-center gap-0.5" key={groupIndex}>{group.map((control) => <ToolbarButton key={control.label} {...control} />)}{groupIndex < toolbarGroups.length - 1 && <span className="mx-2 h-6 w-px bg-[#dfe5dc]" />}</div>)}</div>;
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
