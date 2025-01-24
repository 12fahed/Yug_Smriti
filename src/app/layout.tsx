"use client";

import { Inter } from "next/font/google";
import { Cinzel } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { UserProvider } from "@/providers/UserProvider";
import ChatBot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] })

const metadata: Metadata = {
  title: "Rubix25",
  description: "Hacktivists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <link rel="icon" href="../public/logo.ico" sizes="any" />
      </head>
      <body className={`${cinzel.className} w-full h-screen overflow-auto`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ChatBot /> {/* Include the ChatBot component */}
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}


