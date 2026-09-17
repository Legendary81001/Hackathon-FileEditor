import Link from "next/link";
//e
export type DocumentItem = {
	id: string;
	title: string;
	description: string;
	edited: string;
	section: string;
	accent: string;
	collaborators: string[];
};

function FileIcon() {
	return <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22"><path d="M6.5 3.75h7l4 4v12.5h-11V3.75Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="M13.5 3.75v4h4M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function ArrowIcon() {
	return <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

function AvatarStack({ collaborators }: { collaborators: string[] }) {
	return <div aria-label={`${collaborators.length} collaborators`} className="flex items-center">{collaborators.map((initials, index) => <span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#fffdf8] text-[9px] font-semibold tracking-tight text-[#17211b] ${index === 0 ? "bg-[#f0b18f]" : index === 1 ? "bg-[#b8cfb7]" : index === 2 ? "bg-[#e7ba58]" : "bg-[#c8d8d6]"} ${index > 0 ? "-ml-2" : ""}`} key={initials} title={initials}>{initials}</span>)}</div>;
}

export default function DocumentCard({ document }: { document: DocumentItem }) {
	return <Link className="group flex min-h-[246px] flex-col overflow-hidden rounded-[1.15rem] border border-[#dfe5dc] bg-[#fffdf8] shadow-[0_5px_20px_rgba(32,53,39,0.035)] transition duration-200 hover:-translate-y-1 hover:border-[#b7c8b4] hover:shadow-[0_15px_30px_rgba(32,53,39,0.09)] focus:outline-none focus:ring-2 focus:ring-[#db5a3c] focus:ring-offset-2 focus:ring-offset-[#f7f8f3]" href={`/editor/${document.id}`}>
		<div className={`relative h-[106px] overflow-hidden ${document.accent}`}><div className="absolute -right-5 -top-8 h-32 w-32 rounded-full border-[16px] border-white/25" /><div className="absolute bottom-[-30px] left-7 h-24 w-40 rotate-[-8deg] rounded-t-lg border border-[#fffdf8]/60 bg-[#fffdf8]/70 p-4 shadow-sm transition duration-300 group-hover:translate-y-[-4px]"><div className="h-1.5 w-3/5 rounded-full bg-[#9aac99]/70" /><div className="mt-3 h-1 w-full rounded-full bg-[#c6d5c3]" /><div className="mt-2 h-1 w-4/5 rounded-full bg-[#c6d5c3]" /></div><span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#fffdf8]/75 text-[#49634e] shadow-sm"><FileIcon /></span></div>
		<div className="flex flex-1 flex-col p-5"><div className="mb-3 flex items-center justify-between gap-3"><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a968b]">{document.section}</span><span className="text-[#9aa59b] transition-transform duration-200 group-hover:translate-x-1"><ArrowIcon /></span></div><h2 className="text-[17px] font-semibold leading-6 tracking-[-0.02em] text-[#17211b]">{document.title}</h2><p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-[#718075]">{document.description}</p><div className="mt-auto flex items-center justify-between border-t border-[#edf0e9] pt-4"><span className="text-[11px] text-[#8a968b]">{document.edited}</span><AvatarStack collaborators={document.collaborators} /></div></div>
	</Link>;
}
