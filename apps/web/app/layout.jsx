import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "300", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
} );

export const metadata = {
  title: "Janfrans",
  description: "Admin Dashboard for JanFrans Cargo Services",
  icons: {
    icon: '/janfrans.png',      
    shortcut: '/janfrans.png',      
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
