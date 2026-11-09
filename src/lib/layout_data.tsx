import { type Metadata, Viewport } from "next";

import React from "react";

export async function generateMetadata({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const metadata = messages.metadata;

  return {
    metadataBase: new URL("https://qrbtf.com"),
    title: {
      template: metadata.title.template,
      default: metadata.title.default,
    },
    description: metadata.description,
    keywords: [
      metadata.keywords["0"],
      metadata.keywords["1"],
      metadata.keywords["2"],
      metadata.keywords["3"],
      metadata.keywords["4"],
      metadata.keywords["5"],
      metadata.keywords["6"],
      metadata.keywords["7"],
      metadata.keywords["8"],
      metadata.keywords["9"],
    ],
    openGraph: {
      images:
        "https://dt00g2eb5etby3xu.public.blob.vercel-storage.com/assets/qrbtf_kv-gXzB1cMYlyXQQrhza3HoQlH1WydQpe.jpg",
    },
  };
}

export const layoutMetadata: Metadata = {
  metadataBase: new URL("https://qrbtf.com"),
  title: {
    template: "%s - QRBTF",
    default: "QRBTF - #1 AI QR Code Generator",
  },
  description: "The world's first and best AI QR code generator.",
  keywords: [
    "QR Code",
    "qrcode",
    "AI QR Code",
    "AI qrcode",
    "Parametric QR Code",
    "QRBTF",
    "Mid Real",
    "midreal",
  ],
  openGraph: {
    // title: 'Troy Ni',
    images:
      "https://dt00g2eb5etby3xu.public.blob.vercel-storage.com/assets/qrbtf_kv-gXzB1cMYlyXQQrhza3HoQlH1WydQpe.jpg",
  },
};

export const layoutViewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  height: "device-height",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export function LayoutHead() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <head>
      <link rel="manifest" href={`${basePath}/manifest.json`} />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta name="theme-color" content="#000000" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5528400803664104"
        crossOrigin="anonymous"></script>
    </head>
  );
}
