import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/Footer";
import { LayoutHead } from "@/lib/layout_data";

const inter = Inter({ subsets: ["latin"] });

import { layoutViewport } from "@/lib/layout_data";
import { Header } from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/lib/latentcat-auth/client";
import { getServerSession } from "@/lib/latentcat-auth/server";
import { locales } from "@/navigation";
import deepmerge from "deepmerge";

export { generateMetadata } from "@/lib/layout_data";

export const viewport: Viewport = layoutViewport;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getServerSession();
  const userMessages = (await import(`../../../messages/${locale}.json`)).default;
  const defaultMessages = (await import("../../../messages/en.json")).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <LayoutHead />
      <body className={cn(inter.className, "")}>
        <SessionProvider session={{ data: session }}>
          <Providers>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}
            >
              <Header />
              <div className="min-h-screen flex flex-col">{children}</div>
              <Footer />
            </NextIntlClientProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
