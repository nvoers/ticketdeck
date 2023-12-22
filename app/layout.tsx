// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import PrelineScript from "@/components/PrelineScript";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import header from "@/components/header";
import { ClerkProvider } from '@clerk/nextjs'

config.autoAddCss = false;

const roboto = Roboto_Flex({
  subsets: ["latin"],
});

const title = "Ticketdeck";
const description =
  "Personal digital ticket wallet. All your tickets in one place.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </head>
        <body className={roboto.className}>
          <Toaster />
          <Suspense fallback="Loading...">
            {}
          </Suspense>
          {children}
        </body>
        {/* <PrelineScript /> */}
      </html>
    </ClerkProvider>
  );
}
