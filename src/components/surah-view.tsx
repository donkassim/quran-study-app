"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSurahDetail } from "@/lib/api";
import Link from "next/link";

export default function SurahView({ id }: { id: number }) {
  const { data: surah, isLoading } = useQuery({
    queryKey: ["surah", id],
    queryFn: () => fetchSurahDetail(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!surah) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Surahs
        </Link>
      </div>

      <div className="space-y-8">
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {surah.englishName} ({surah.name})
          </h1>
          <p className="text-gray-600">{surah.englishNameTranslation}</p>
        </div>

        <div className="space-y-6">
          {surah.ayahs.map((ayah) => (
            <div key={ayah.number} className="p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div
                  className="text-xl leading-relaxed text-right font-arabic"
                  dir="rtl"
                >
                  {ayah.text}
                </div>
                <span className="text-sm text-gray-500 ml-4">
                  {ayah.numberInSurah}
                </span>
              </div>
              <div className="text-gray-600 leading-relaxed">
                {ayah.translation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
