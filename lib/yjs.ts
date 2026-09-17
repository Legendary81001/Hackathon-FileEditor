import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export function createYjsProvider(roomId: string) {
  const ydoc = new Y.Doc();

  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    roomId,
    ydoc
  );

  return {
    ydoc,
    provider,
  };
}
