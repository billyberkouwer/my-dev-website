"use client";

import { itemDown } from "@/lib/framer/animations";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText, PortableTextBlock } from "next-sanity";
import './text-section.scss';

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
      {projectInfo ? <PortableText value={projectInfo} /> : null}
    </motion.section>
  );
}
