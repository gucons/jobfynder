import FeedHeader from "@/components/header/header";
import ProfileSidebar from "@/components/feed/profilePanel";
import SuggestionsPanel from "@/components/feed/suggestionPanel";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto grid max-w-screen-xl grid-cols-12 gap-6 py-8">
      <ProfileSidebar />
      <div className="col-span-full px-6 md:col-span-6 md:p-0">{children}</div>
      <SuggestionsPanel />
    </div>
  );
}
