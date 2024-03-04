import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//Shadcn imports
import { Toaster } from "@/components/ui/toaster";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comedorcito",
  description: "Aplicacion de Comedorcito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary/20`}>
        <main>
          <NavBar />
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
