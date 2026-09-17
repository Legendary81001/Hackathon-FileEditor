"use client";

type User = {
  name: string;
};

export default function UserPresence({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((user) => (
        <span key={user.name}>
          {user.name}
        </span>
      ))}
    </div>
  );
}