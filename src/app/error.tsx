"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import Homepage from "@/components/home/Homepage";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        textAlign: "center",
        width: "100%",
        maxWidth: "100vw",
        height: "inherit",
        alignSelf: "safe center",
        overflow: "hidden"
      }}
    >
      <h2 style={{padding: "0 0.5rem"}}>
        This page should show a 3D flower but it{"'"}s not been
        able to bloom on your device {":("} <br /> <br />
        It{"'"}s quite heavy and you may not have enough disk space to run it.
      </h2>
      <div>
        <Link
          href={"/i-am-everything-you-want-me-to-be"}
          style={{ color: "black", fontStyle: "normal" }}
        >
          <button style={{cursor: "pointer"}}>See Billy{"'"}s projects instead</button>
        </Link>
      </div>
      <Image
        src={"/flower.jpg"}
        alt="The flower that should be moving!"
        width={400}
        height={200}
        style={{ marginTop: "1rem" }}
      />
    </div>
  );
}
