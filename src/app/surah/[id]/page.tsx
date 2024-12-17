import { Suspense } from "react";
import { notFound } from "next/navigation";
import SurahWrapper from "@/components/surah-wrapper";

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}

interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  const surahId = Number(params.id);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <SurahWrapper id={surahId} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}
