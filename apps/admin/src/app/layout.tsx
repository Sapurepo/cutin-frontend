import "@/styles/globals.css";

import type { Metadata } from "next";
import { geist, pretendard } from "@cutin/ui/font";
import { AppProviders } from "@/providers/appProviders";

export const metadata: Metadata = {
  title: "CUTIN Admin",
  description: "CUTIN 운영/모더레이션 어드민.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${geist.variable} font-sans`}
      suppressHydrationWarning
    >
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
