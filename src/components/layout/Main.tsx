"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Main({ children }: { children: ReactNode }) {
  useEffect(() => {
    function setRealPageHeight() {
      const root = document.querySelector(":root") as HTMLElement;
      if (root) {
        root.style.setProperty("--real-page-height", window.innerHeight + "px");
      }
    }
    setRealPageHeight();
    window.addEventListener("resize", setRealPageHeight);
    return () => {
      window.removeEventListener("resize", setRealPageHeight);
    };
  }, []);
  return (
    <main className={`container__main  is-content-split`}>
      {children}
    </main>
  );
}
