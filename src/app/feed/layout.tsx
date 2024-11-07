import Header from "@/components/feed/header";
import SocialLayout from "@/components/feed/socialLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      <SocialLayout >{children}</SocialLayout>
    </div>
  );
}
