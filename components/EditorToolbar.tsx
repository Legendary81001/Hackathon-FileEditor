type ToolbarIcon = "bold" | "bullet-list" | "heading-1" | "heading-2" | "italic" | "numbered-list" | "redo" | "underline" | "undo";

type ToolbarControl = {
	label: string;
	icon: ToolbarIcon;
};

const toolbarGroups: ToolbarControl[][] = [
	[
		{ label: "Undo", icon: "undo" },
		{ label: "Redo", icon: "redo" },
	],
	[
		{ label: "Heading 1", icon: "heading-1" },
		{ label: "Heading 2", icon: "heading-2" },
	],
	[
		{ label: "Bold", icon: "bold" },
		{ label: "Italic", icon: "italic" },
		{ label: "Underline", icon: "underline" },
	],
	[
		{ label: "Bullet list", icon: "bullet-list" },
		{ label: "Numbered list", icon: "numbered-list" },
	],
];

function ToolbarIcon({ name }: { name: ToolbarIcon }) {
	const iconProps = { fill: "none", height: 18, viewBox: "0 0 24 24", width: 18 };

	switch (name) {
		case "undo":
			return <svg {...iconProps}><path d="M9 8 4 12l5 4M5 12h8a6 6 0 0 1 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "redo":
			return <svg {...iconProps}><path d="m15 8 5 4-5 4M19 12h-8a6 6 0 0 0-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "heading-1":
			return <svg {...iconProps}><path d="M5 6v12M5 12h8M13 6v12M18 8v10M16.5 9.5 18 8l1.5 1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "heading-2":
			return <svg {...iconProps}><path d="M5 6v12M5 12h8M13 6v12M16 10a2 2 0 1 1 3.5 1.3L16 18h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
		case "bold":
			return <svg {...iconProps}><path d="M8 5h5a3 3 0 0 1 0 6H8V5Zm0 6h6a3.5 3.5 0 0 1 0 7H8v-7ZM8 5v13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
		case "italic":
			return <svg {...iconProps}><path d="M14 5h-3M13 19h-3M14 5l-4 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
		case "underline":
			return <svg {...iconProps}><path d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
		case "bullet-list":
			return <svg {...iconProps}><path d="M9 6h10M9 12h10M9 18h10M5 6h.01M5 12h.01M5 18h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>;
		case "numbered-list":
			return <svg {...iconProps}><path d="M10 6h9M10 12h9M10 18h9M5 7h1V5M5 5h1M5 11v3l2-3M5 14h2M5 17h2l-2 3h2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
	}
}

function ToolbarButton({ control }: { control: ToolbarControl }) {
	return <button aria-label={control.label} className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[#627267] transition hover:bg-[#e8eee5] hover:text-[#17211b] focus:outline-none focus:ring-2 focus:ring-[#db5a3c] focus:ring-offset-1 focus:ring-offset-[#f9faf6]" title={control.label} type="button"><ToolbarIcon name={control.icon} /></button>;
}

export default function EditorToolbar() {
	return <div aria-label="Formatting toolbar" className="flex min-h-[58px] items-center gap-1 overflow-x-auto border-b border-[#dfe5dc] bg-[#f9faf6] px-4 py-2 sm:px-8">{toolbarGroups.map((group, groupIndex) => <div className="flex shrink-0 items-center gap-0.5" key={groupIndex}>{group.map((control) => <ToolbarButton control={control} key={control.label} />)}{groupIndex < toolbarGroups.length - 1 && <span aria-hidden="true" className="mx-2 h-6 w-px bg-[#dfe5dc]" />}</div>)}</div>;
}
