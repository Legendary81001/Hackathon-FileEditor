"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import DocumentCard, { type DocumentItem } from "../../components/DocumentCard";

const documents: DocumentItem[] = [
	{ id: "1", title: "Project Architecture & Roadmap", description: "A shared view of the product foundations and what comes next.", edited: "Edited 18 minutes ago", section: "Product", accent: "bg-[#dce6d9]", collaborators: ["AM", "JK", "TR"] },
	{ id: "2", title: "Hackathon Ideas", description: "Loose thoughts, useful sparks, and the ideas worth prototyping.", edited: "Edited yesterday", section: "Planning", accent: "bg-[#f2e4c9]", collaborators: ["AM", "LS"] },
	{ id: "3", title: "Research Notes", description: "Patterns from user conversations and observations in the wild.", edited: "Edited 3 days ago", section: "Research", accent: "bg-[#d8e5e2]", collaborators: ["JK", "TR", "NP", "AM"] },
	{ id: "4", title: "Team Meeting — September", description: "Decisions, open questions, and a short list of next actions.", edited: "Edited Sep 12", section: "Team", accent: "bg-[#e9dedb]", collaborators: ["LS", "NP"] },
];

function SearchIcon() {
	return <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
}

function FileIcon() {
	return <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22"><path d="M6.5 3.75h7l4 4v12.5h-11V3.75Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="M13.5 3.75v4h4M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function PlusIcon() {
	return <svg aria-hidden="true" fill="none" height="17" viewBox="0 0 24 24" width="17"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>;
}

function ArrowIcon() {
	return <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

export default function DocumentsPage() {
	const [query, setQuery] = useState("");
	const filteredDocuments = useMemo(() => documents.filter((document) => document.title.toLowerCase().includes(query.toLowerCase()) || document.section.toLowerCase().includes(query.toLowerCase())), [query]);

	return <main className="min-h-screen bg-[#f7f8f3] text-[#17211b]">
		<header className="border-b border-[#dfe5dc] bg-[#f9faf6]/90"><div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16"><Link className="flex items-center gap-3" href="/"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17211b] text-[#fffdf8] shadow-sm"><FileIcon /></span><span className="text-[17px] font-semibold tracking-[-0.025em]">Debugger&apos;s <span className="text-[#db5a3c]">File Editor</span></span></Link><div className="hidden items-center gap-5 text-xs text-[#718075] sm:flex"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#86a889]" /> All changes saved</span><span className="h-7 w-px bg-[#dfe5dc]" /><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7ba58] text-[10px] font-bold text-[#17211b]">AM</span></div></div></header>
		<div className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-10 lg:px-16 lg:pt-16"><div className="flex flex-col justify-between gap-8 border-b border-[#dfe5dc] pb-9 md:flex-row md:items-end"><div><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#db5a3c]">Your workspace</p><h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Your Documents</h1><p className="mt-3 max-w-lg text-[15px] leading-6 text-[#718075]">A calm home for the files your team is shaping together.</p></div><button className="flex w-fit items-center gap-2 rounded-full bg-[#db5a3c] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(219,90,60,0.18)] transition hover:bg-[#c84d31] focus:outline-none focus:ring-2 focus:ring-[#db5a3c] focus:ring-offset-2 focus:ring-offset-[#f7f8f3]"><PlusIcon /> New document</button></div>
			<div className="flex flex-col justify-between gap-5 py-7 sm:flex-row sm:items-center"><div className="relative w-full sm:max-w-[340px]"><label className="sr-only" htmlFor="document-search">Search documents</label><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a968b]"><SearchIcon /></span><input className="h-11 w-full rounded-full border border-[#d5ded3] bg-[#fffdf8] pl-11 pr-5 text-sm text-[#17211b] outline-none transition placeholder:text-[#9aa59b] focus:border-[#86a889] focus:ring-2 focus:ring-[#cbdaca]" id="document-search" onChange={(event) => setQuery(event.target.value)} placeholder="Search your documents" type="search" value={query} /></div><p className="text-xs text-[#8a968b]">{filteredDocuments.length} {filteredDocuments.length === 1 ? "document" : "documents"}</p></div>
			{filteredDocuments.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredDocuments.map((document) => <DocumentCard document={document} key={document.id} />)}</div> : <div className="rounded-[1.15rem] border border-dashed border-[#cbd7c8] bg-[#eef3eb] px-6 py-16 text-center"><p className="font-semibold text-[#304833]">No documents found</p><p className="mt-2 text-sm text-[#718075]">Try a different title or section.</p></div>}
			<div className="mt-12 flex items-center gap-3 text-xs text-[#8a968b]"><span className="h-px flex-1 bg-[#dfe5dc]" /><span>Shared spaces, thoughtful work.</span><span className="h-px flex-1 bg-[#dfe5dc]" /></div>
		</div>
	</main>;
}
