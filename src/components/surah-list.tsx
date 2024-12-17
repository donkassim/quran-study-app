"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSurahs } from "@/lib/api";
import Link from "next/link";

export default function SurahList() {
  const {
    data: surahs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading Surahs. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs?.map((surah) => (
        <Link
          key={surah.number}
          href={`/surah/${surah.number}`}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {surah.englishName}
            </h2>
            <span className="text-sm text-gray-600">{surah.number}</span>
          </div>
          <p className="text-gray-600">{surah.englishNameTranslation}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>{surah.revelationType}</span>
            <span>{surah.numberOfAyahs} verses</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
