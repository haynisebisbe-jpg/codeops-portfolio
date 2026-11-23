import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CampusEvents | Discover Campus Life",
  description: "Discover, explore, and create campus events.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <footer className="footer">
          <p>© 2026 CampusEvents. Connecting our campus community.</p>
        </footer>
      </body>
    </html>
  );
}
