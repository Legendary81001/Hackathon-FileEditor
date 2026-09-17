"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

type EditorProps = {
  roomId: string;
};

export default function Editor({ roomId }: EditorProps) {
  const [ydoc] = useState(() => new Y.Doc());
  const [provider] = useState(
    () => new WebsocketProvider("wss://demos.yjs.dev", roomId, ydoc)
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        undoRedo: false,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    content: "<p>Start writing...</p>",
  });

  useEffect(() => {
    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [provider, ydoc]);

  if (!editor) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f8f3] p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <EditorContent editor={editor} />
      </div>
    </main>
  );
}