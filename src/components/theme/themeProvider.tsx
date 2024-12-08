"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // If we are on the server, just return the children
  if (typeof window === "undefined") return <>{children}</>;
  else
    return (
      <NextThemesProvider
        {...props}
        defaultTheme="light"
        attribute="class"
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    );
}
