import Connections from "@/components/Connections";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List */}
      <Connections />
      {children}
    </div>
  );
}
