"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      <Toaster position="top-center" reverseOrder={false} />
      {!hideLayout && <Footer />}
    </>
  );
}
