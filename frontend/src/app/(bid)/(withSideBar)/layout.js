
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
// import myfont from "../font/KaTeX_Main-Regular.12644167.woff2";
// import ToastProvider from "../components/toast/ToastProvider";
// import Footer from "@/components/Misc/Footer/Footer";

import localFont from "next/font/local";
// import AOSInit from "@/components/AOSInit";
// import Navbar from "@/components/Header/Navbar/Navbar";
import ToastProvider from "@/lib/ToastProvider";
import Sidebar from "@/components/adminComponents/Sidebar";

const myFont = localFont({
  src: "../../../font/KaTeX_Main-Regular.12644167.woff2",
  variable: "--font-myfont",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bid | Apply | Result ",
  description:
    "Dudhkoshi is a leading hydropower company generating and supplying clean, renewable electricity. We deliver reliable, sustainable energy solutions that support Nepal’s growth and contribute to a greener future.",
};


export default function RootLayout({ children }) {
  return (  
    <>
    <div className="min-h-screen bg-slate-100">
      <Sidebar/>

<main className="
lg:ml-72
p-6
transition-all
">

{children}
</main>

      <ToastProvider
        position="top-right"
        reverseOrder={false}
        />
        </div>
        </>
  );
}


