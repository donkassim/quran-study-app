"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const SurahView = dynamic(
  () => import("@/components/surah-view").then((mod) => mod.default),
  {
    loading: () => (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    ),
  }
);

export default function SurahWrapper({ id }: { id: number }) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <SurahView id={id} />
    </Suspense>
  );
}
