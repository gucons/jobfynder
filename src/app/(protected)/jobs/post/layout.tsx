export default function PostJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-1 py-4 w-full">{children}</main>;
}
