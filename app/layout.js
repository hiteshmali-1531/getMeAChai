import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me A Chai a website for chai lovers",
  description: "this website is a crowdfunding for chai lovers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" bg-[#000] bg-[radial-gradient(#ffffffff33_1px,#00091d_1px)]">
      <SessionWrapper>
     <Navbar />
     <div className="min-h-screen bg-[#000] bg-[radial-gradient(#ffffffff33_1px,#00091d_1px)]">

      {children}
     </div>
      <Footer />
      </SessionWrapper>
      </body>
    </html>
  );
}
