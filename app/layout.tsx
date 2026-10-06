import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "ChurnShield — Stripe Involuntary Churn Recovery & Smart Dunning",
  description: "Recover 68%+ of failed subscription payments on Stripe with algorithmic retries, pre-dunning expiration alerts, and 1-click magic link card updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080B10] text-[#F3F4F6] antialiased flex flex-col justify-between">
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
