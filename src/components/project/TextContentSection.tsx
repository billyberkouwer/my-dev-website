"use client";

import { itemDown } from "@/lib/framer/animations";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText, PortableTextBlock } from "next-sanity";
import "./text-section.scss";
import Link from "next/link";

const myPortableTextComponents = {
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href} target={rel ? "_blank" : undefined} rel={rel}>
          {children}
        </Link>
      );
    },
  },
};

export default function TextContentSection({
  projectTitle,
  projectInfo,
}: {
  projectTitle: string | undefined;
  projectInfo: PortableTextBlock | undefined;
}) {
  return (
    <motion.section
      initial={itemDown.hidden}
      animate={itemDown.show}
      className="section__info"
      key={projectTitle}
    >
      <h1>{projectTitle}</h1>
      {projectInfo ? (
        <PortableText
          value={projectInfo}
          components={myPortableTextComponents}
        />
      ) : null}
    </motion.section>
  );
}
