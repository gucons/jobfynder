import MainHeader from "@/components/header/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-accent">
      <MainHeader />
      {children}
    </main>
  );
}
