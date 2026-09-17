import { createClient } from "@liveblocks/client";
import { getYjsProviderForRoom } from "@liveblocks/yjs";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

export function createYjsProvider(roomId: string) {
  const { room, leave } = client.enterRoom(roomId);

  const provider = getYjsProviderForRoom(room);

  return {
    provider,
    ydoc: provider.getYDoc(),
    leave,
  };
}