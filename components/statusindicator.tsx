"use client";

type ConnectionStatus = "connecting" | "connected" | "disconnected";

const config: Record<ConnectionStatus, { label: string; dot: string; text: string }> = {
  connecting:   { label: "Connecting...", dot: "bg-[#e7ba58]", text: "text-[#9a7c2a]" },
  connected:    { label: "Connected",    dot: "bg-[#86a889]", text: "text-[#718075]" },
  disconnected: { label: "Offline",      dot: "bg-[#c5cdc6]", text: "text-[#9aa59b]" },
};

export default function StatusIndicator({ status }: { status: ConnectionStatus }) {
  const { label, dot, text } = config[status];
  return (
    <div className={`flex items-center gap-1.5 text-xs ${text}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </div>
  );
}
