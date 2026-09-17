"use client";

type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected";

export default function StatusIndicator({
  status,
}: {
  status: ConnectionStatus;
}) {
  const text = {
    connecting: "Connecting...",
    connected: "Connected",
    disconnected: "Offline",
  };

  return <span>● {text[status]}</span>;
}