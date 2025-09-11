"use client";
import dynamic from "next/dynamic";

const GenieMount = dynamic(() => import("@/features/AI/genie/GenieMount"), { ssr: false });

export default function GenieMountClient() {
  return <GenieMount />;
}
