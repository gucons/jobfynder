export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-svh w-svw items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}
