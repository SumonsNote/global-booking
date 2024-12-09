import Navbar from "@/components/Navbar";
import { dbConnect } from "@/service/mongo";
import { ToastWrapper } from "keep-react";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stay Swift",
  description: "One Place Stop for Hospitability",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastWrapper
          richColors={true}
          toastOptions={{
            classNames: {
              title: "text-body-3 font-medium",
              toast: "rounded-xl shadow-large",
              description: "text-body-4 font-normal",
            },
          }}
        />
        <Navbar sideMenu={true} />
        <main>{children}</main>
      </body>
    </html>
  );
}
