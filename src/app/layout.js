import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/layout/Header/NavBar";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Green zone",
  description: "Green Zone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} p-4 xl:p-4 bg-slate-200 `}>
        <Providers>
          <header>
            {<NavBar />}
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
