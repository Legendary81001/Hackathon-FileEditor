"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import { createYjsProvider } from "../lib/yjs";
import EditorToolbar from "./EditorToolbar";

type EditorProps = {
roomId: string;
};

type User = {
username: string;
initials: string;
color: string;
};

const users: User[] = [
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
const [currentUser, setCurrentUser] = useState<User | null>(null);

const [collaboration] = useState(() =>
createYjsProvider(roomId)
);

const [synced, setSynced] = useState(
collaboration.provider.synced
);

useEffect(() => {
const storedUser = localStorage.getItem("synora_user");

if (!storedUser) {
  setCurrentUser(users[0]);
  return;
}

try {
  const parsedUser = JSON.parse(storedUser);

  if (
    parsedUser &&
    typeof parsedUser === "object" &&
    typeof parsedUser.username === "string"
  ) {
    const matchingUser = users.find(
      (user) => user.username === parsedUser.username
    );

    if (matchingUser) {
      setCurrentUser(matchingUser);
      return;
    }
  }

  if (typeof parsedUser === "string") {
    const matchingUser = users.find(
      (user) => user.username === parsedUser
    );

    if (matchingUser) {
      setCurrentUser(matchingUser);
      return;
    }
  }
} catch {
  const matchingUser = users.find(
    (user) => user.username === storedUser
  );

  if (matchingUser) {
    setCurrentUser(matchingUser);
    return;
  }
}

setCurrentUser(users[0]);

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

    Underline,

    Collaboration.configure({
      document: collaboration.ydoc,
    }),

    ...(currentUser
      ? [
          CollaborationCaret.configure({
            provider: collaboration.provider,
            user: {
              name: currentUser.username,
              color: currentUser.color,
            },
          }),
        ]
      : []),
  ],

  immediatelyRender: false,
},
[synced, currentUser]

);

if (!synced || !editor || !currentUser) {
return ( <main className="min-h-screen bg-[#f7f8f3] p-8"> <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm"> <p>Loading document...</p> </div> </main>
);
}

return ( <main className="min-h-screen bg-[#f7f8f3] p-8"> <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-sm"> <EditorToolbar editor={editor} />

    <div className="tiptap p-8">
      <EditorContent editor={editor} />
    </div>
  </div>
</main>

);
}
