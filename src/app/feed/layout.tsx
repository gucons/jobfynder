import FeedHeader from "@/components/feed/header";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <FeedHeader />
      {children}
    </div>
  );
}
