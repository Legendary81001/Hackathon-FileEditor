"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
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

      immediatelyRender: false,
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
    <main className="min-h-screen bg-[#f7f8f3] p-8">
      <div className="tiptap mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <EditorContent editor={editor} />
      </div>
    </main>
  );
}