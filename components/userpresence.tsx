"use client";

import { useEffect, useState } from "react";

const ALL_COLLABORATORS = [
  { username: "testuser", initials: "TU", color: "bg-[#f0b18f]" },
  { username: "user1",    initials: "U1", color: "bg-[#b8cfb7]" },
  { username: "user2",    initials: "U2", color: "bg-[#e7ba58]" },
  { username: "user3",    initials: "U3", color: "bg-[#a8c4e0]" },
];

export default function UserPresence() {
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("synora_user");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setLoggedInUsername(parsed.username ?? null);
      } catch {
        setLoggedInUsername(null);
      }
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      {ALL_COLLABORATORS.map((user) => {
        const isOnline = user.username === loggedInUsername;
        return (
          <div key={user.username} className="flex items-center gap-1.5">
            <div className="relative">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-[#17211b] ${user.color}`}
                title={user.username}
              >
                {user.initials}
              </span>
              <span
                className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#fffdf8] ${
                  isOnline ? "bg-[#86a889]" : "bg-[#c5cdc6]"
                }`}
              />
            </div>
            <span className="text-xs text-[#718075]">{user.username}</span>
          </div>
        );
      })}
    </div>
  );
}