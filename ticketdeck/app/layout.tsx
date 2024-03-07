// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ClerkProvider } from '@clerk/nextjs'

config.autoAddCss = false;

const roboto = Roboto_Flex({
  subsets: ["latin"],
});

const title = "Ticketdeck";
const description = "Personal digital ticket wallet. All your tickets in one place.";

export const metadata: Metadata = {
  title,
  description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </head>
        <body className={roboto.className}>
          <Toaster position="bottom-right" reverseOrder={false}/>
          <Suspense fallback="Loading...">
            {}
          </Suspense>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
