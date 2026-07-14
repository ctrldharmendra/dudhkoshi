
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import myfont from "../font/KaTeX_Main-Regular.12644167.woff2";
// import ToastProvider from "../components/toast/ToastProvider";
// import Footer from "@/components/Misc/Footer/Footer";

import localFont from "next/font/local";
import ToastProvider from "@/lib/ToastProvider";
// import AOSInit from "@/components/AOSInit";
// import Navbar from "@/components/Header/Navbar/Navbar";


const myFont = localFont({
  src: "../font/KaTeX_Main-Regular.12644167.woff2",
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
  title: "Dudhkoshi | Clean Hydropower & Renewable Energy Provider",
  description:
    "Dudhkoshi is a leading hydropower company generating and supplying clean, renewable electricity. We deliver reliable, sustainable energy solutions that support Nepal’s growth and contribute to a greener future.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.variable}>
          <head>
        <noscript>
          <style>{`
            [data-aos] {
              opacity: 1 !important;
              transform: none !important;
            }
              div{
                opacity: 1 !important;
                transform: none !important;
              }
                .opZeroInNoJs{
                  opacity: 0 !important;}
          `}</style>
          
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


        {/* <Navbar></Navbar> */}
        {/*
        <AOSInit /> */}
         <ToastProvider />
        {children}
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
