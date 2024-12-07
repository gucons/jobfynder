export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-svh w-svw items-center justify-center bg-accent p-2 py-10">
      {children}
    </div>
  );
}
