# Real-Time Collaborative Document Editor

## Overview

A web-based collaborative rich text editor built for the SYNORA Full Stack Engineering challenge. Multiple users can edit the same document in real time, with formatting and cursor positions synchronized between connected clients.

The editor uses Yjs for conflict-free replicated editing and Liveblocks for real-time synchronization and document persistence.

**Deployed application:** https://hackathonfileeditor-gray.vercel.app/

## Tech Stack

* Next.js
* TypeScript
* TipTap
* Yjs
* Liveblocks
* Tailwind CSS
* Vercel

## Running Locally

Install dependencies:

```bash
npm install
```

Create `.env.local` and add the Liveblocks public key:

```env
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

To test collaboration, open the same document URL in two browser windows or on two devices and sign in with different demo accounts.
