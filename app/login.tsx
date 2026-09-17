"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const users = [
  { username: "testuser", password: "testpass" },
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
  { username: "user3", password: "pass3" },
];

function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="22"
      viewBox="0 0 24 24"
      width="22"
    >
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
}

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const user = users.find(
      (account) =>
        account.username === username.trim() &&
        account.password === password
    );

    if (!user) {
      setError("Invalid username or password.");
      return;
    }

    // Hackathon-only login state.
    localStorage.setItem("synora_user", user.username);

    router.push("/documents");
  }

  return (
    <main className="min-h-screen bg-[#f7f8f3] text-[#17211b]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <Link
            className="text-lg font-semibold tracking-tight"
            href="/"
          >
            synora<span className="text-[#db5a3c]">.</span>
          </Link>

          <span className="rounded-full border border-[#cad4c8] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#5d6b61]">
            Early access
          </span>
        </header>

        <section className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17211b] text-[#fffdf8] shadow-sm">
                <FileIcon />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#db5a3c]">
                Welcome back
              </p>

              <h1 className="text-4xl font-semibold tracking-[-0.05em]">
                Sign in to Synora
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#718075]">
                Enter your account details to open your collaborative
                workspace.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="rounded-[1.5rem] border border-[#dfe5dc] bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(32,53,39,0.08)] sm:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-[#304833]"
                    htmlFor="username"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter username"
                    autoComplete="username"
                    className="h-12 w-full rounded-xl border border-[#d5ded3] bg-[#f9faf6] px-4 text-sm text-[#17211b] outline-none transition placeholder:text-[#9aa59b] focus:border-[#86a889] focus:ring-2 focus:ring-[#cbdaca]"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-[#304833]"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-[#d5ded3] bg-[#f9faf6] px-4 text-sm text-[#17211b] outline-none transition placeholder:text-[#9aa59b] focus:border-[#86a889] focus:ring-2 focus:ring-[#cbdaca]"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-5 rounded-xl bg-[#fce9e4] px-4 py-3 text-sm text-[#b64028]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-[#db5a3c] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(219,90,60,0.18)] transition hover:bg-[#c84d31] focus:outline-none focus:ring-2 focus:ring-[#db5a3c] focus:ring-offset-2"
              >
                Sign in
              </button>

              <div className="mt-6 border-t border-[#e4e8df] pt-5">
                <p className="text-center text-xs leading-5 text-[#8a968b]">
                  Hackathon demo accounts are available for testing.
                </p>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-[#718075]">
              <Link
                href="/"
                className="font-medium text-[#db5a3c] hover:underline"
              >
                ← Back to home
              </Link>
            </p>
          </div>
        </section>

        <footer className="border-t border-[#dfe5dc] pt-5 text-center text-xs text-[#8a968b]">
          For teams who think out loud.
        </footer>
      </div>
    </main>
  );
}
