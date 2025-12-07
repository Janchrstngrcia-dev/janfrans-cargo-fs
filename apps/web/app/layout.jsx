import { Poppins } from "next/font/google";
import "./globals.css";

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
      </body>
    </html>
  );
}
