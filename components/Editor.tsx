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

const users = [
  {
    username: "testuser",
    initials: "TU",
    color: "#f0b18f",
  },
  {
    username: "user1",
    initials: "U1",
    color: "#b8cfb7",
  },
  {
    username: "user2",
    initials: "U2",
    color: "#e7ba58",
  },
  {
    username: "user3",
    initials: "U3",
    color: "#a8c4e0",
  },
];

export default function Editor({ roomId }: EditorProps) {
  const [collaboration] = useState(() => createYjsProvider(roomId));

  const [synced, setSynced] = useState(
    collaboration.provider.synced
  );

  const [currentUser, setCurrentUser] = useState(users[0]);

  useEffect(() => {
    const username = localStorage.getItem("synora_user");

    const user = users.find(
      (user) => user.username === username
    );

    if (user) {
      setCurrentUser(user);
    }
  }, []);

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
            name: currentUser.username,
            color: currentUser.color,
          },
        }),
      ],

      immediatelyRender: false,
    },
    [synced, currentUser]
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