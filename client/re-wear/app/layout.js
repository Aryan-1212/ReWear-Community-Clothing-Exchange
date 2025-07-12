import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ReWear - Sustainable Clothing Exchange",
  description: "Exchange pre-loved clothes and make a positive impact on the planet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
          <main className="min-h-screen bg-black">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
