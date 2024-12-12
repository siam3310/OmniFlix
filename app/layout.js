import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/partials/footer/Footer";
const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>

        <Header />
        {children}

        <ToastContainer draggable theme="dark" />
        <div className="mt-28">
          <Footer />
        </div>
      </body>
    </html>
  );
}
