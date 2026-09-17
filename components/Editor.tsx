"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import EditorToolbar from "./EditorToolbar";
import { createYjsProvider } from "../lib/yjs";

type EditorProps = {
  roomId: string;
};

export default function Editor({ roomId }: EditorProps) {
  const [collaboration] = useState(() => createYjsProvider(roomId));

  const [synced, setSynced] = useState(
    collaboration.provider.synced
  );

  useEffect(() => {
    if (collaboration.provider.synced) {
      setSynced(true);
      return;
    }

    const handleSync = (isSynced: boolean) => {
      if (isSynced) {
        setSynced(true);
      }
    };

    collaboration.provider.on("sync", handleSync);

    return () => {
      collaboration.provider.off("sync", handleSync);
      collaboration.leave();
    };
  }, [collaboration]);

  const editor = useEditor(
    {
      immediatelyRender: false,

      extensions: [
        StarterKit.configure({
          undoRedo: false,
        }),

        Collaboration.configure({
          document: collaboration.ydoc,
        }),

        CollaborationCaret.configure({
          provider: collaboration.provider,
          user: {
            name: `User ${Math.floor(Math.random() * 1000)}`,
            color: "#7c3aed",
          },
        }),
      ],
      content: "<p>Start writing...</p>",
    },
    [synced]
  );

  if (!synced || !editor) {
    return (
      <main className="min-h-screen bg-[#f7f8f3] p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
          <p>Loading document...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f3]">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-sm">

        {/* Formatting toolbar */}
        <EditorToolbar editor={editor} />

        {/* Document */}
        <div className="min-h-[650px] p-8 sm:p-10">
          <div className="editor-content">
            <EditorContent editor={editor} />
          </div>
        </div>

      </div>
    </main>
  );
}