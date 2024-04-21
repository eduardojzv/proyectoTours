import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/layout/Header/NavBar";
import Footer from "@/components/layout/Footer/footer";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "All Blue Tours",
  description: "All Blue Tours",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-slate-100 `}>
        <Providers>
          <header>
            {<NavBar />}
          </header>
          {children}
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
