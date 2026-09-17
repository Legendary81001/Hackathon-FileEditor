"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Editor from "../../../components/Editor";
import ShareModal from "../../../components/ShareModal";

type IconName = "arrow-left" | "file" | "share" | "more";

const collaborators = [
  { initials: "AM", color: "bg-[#f0b18f]" },
  { initials: "JK", color: "bg-[#b8cfb7]" },
  { initials: "TR", color: "bg-[#e7ba58]" },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    fill: "none",
    height: size,
    viewBox: "0 0 24 24",
    width: size,
  };

  switch (name) {
    case "arrow-left":
      return (
        <svg {...common}>
          <path
            d="M19 12H5M11 18l-6-6 6-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <path
            d="M6.5 3.75h7l4 4v12.5h-11V3.75Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
          <path
            d="M13.5 3.75v4h4M9.5 12h5M9.5 15.5h5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
        </svg>
      );

    case "share":
      return (
        <svg {...common}>
          <path
            d="M8 12h8M14 6l6 6-6 6M4 5h4v4M4 19h4v-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      );

    case "more":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" fill="currentColor" r="1.4" />
          <circle cx="12" cy="12" fill="currentColor" r="1.4" />
          <circle cx="19" cy="12" fill="currentColor" r="1.4" />
        </svg>
      );
  }
}

function CollaboratorAvatars() {
  return (
    <div className="flex items-center">
      {collaborators.map((collaborator, index) => (
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fffdf8] text-[10px] font-bold text-[#17211b] ${collaborator.color} ${
            index > 0 ? "-ml-2" : ""
          }`}
          key={collaborator.initials}
        >
          {collaborator.initials}
        </span>
      ))}

      <span className="ml-2 text-xs text-[#718075]">3 here</span>
    </div>
  );
}

export default function EditorPage() {
  const params = useParams<{ id: string }>();
  const roomId = params.id;

  const [shareOpen, setShareOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f8f3] text-[#17211b]">
      <header className="border-b border-[#dfe5dc] bg-[#fffdf8]">
        <div className="mx-auto flex min-h-[72px] max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              aria-label="Back to documents"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#718075] transition hover:bg-[#eef3eb] hover:text-[#17211b]"
              href="/documents"
            >
              <Icon name="arrow-left" />
            </Link>

            <Link
              className="hidden items-center gap-2.5 border-r border-[#dfe5dc] pr-5 sm:flex"
              href="/"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17211b] text-[#fffdf8]">
                <Icon name="file" size={18} />
              </span>

              <span className="text-[15px] font-semibold">
                Debugger&apos;s{" "}
                <span className="text-[#db5a3c]">File Editor</span>
              </span>
            </Link>

            <div className="min-w-0">
              <input
                aria-label="Document title"
                className="block w-full max-w-[360px] bg-transparent px-1 py-0.5 text-[16px] font-semibold text-[#17211b] outline-none sm:text-[17px]"
                defaultValue="Project Architecture & Roadmap"
                readOnly
              />

              <p className="px-1 text-[11px] text-[#8a968b]">
                Collaborative document
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden items-center gap-2 text-xs text-[#718075] md:flex">
              <span className="h-2 w-2 rounded-full bg-[#86a889]" />
              Connected
            </div>

            <CollaboratorAvatars />

            <button
              className="flex h-9 items-center gap-2 rounded-full bg-[#db5a3c] px-4 text-sm font-semibold text-white hover:bg-[#c84d31]"
              onClick={() => setShareOpen(true)}
              type="button"
            >
              <Icon name="share" size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              aria-label="More document actions"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-[#718075] hover:bg-[#eef3eb] sm:flex"
              type="button"
            >
              <Icon name="more" size={19} />
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1600px] px-3 py-4 sm:px-8 sm:py-7">
        <div className="overflow-hidden rounded-xl border border-[#dfe5dc] bg-[#f9faf6]">
          <Editor roomId={roomId} />
        </div>
      </section>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </main>
  );
}