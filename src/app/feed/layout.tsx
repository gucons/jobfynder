import FeedHeader from "@/components/feed/header";
import ProfileSidebar from "@/components/feed/profilePanel";
import SuggestionsPanel from "@/components/feed/suggestionPanel";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-accent">
      <FeedHeader />
      <div className="container mx-auto grid max-w-screen-xl grid-cols-12 gap-6 py-8">
        <ProfileSidebar />
        <div className="col-span-6">{children}</div>
        <SuggestionsPanel />
      </div>
    </div>
  );
}
