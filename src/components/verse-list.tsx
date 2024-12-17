"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSurahDetail } from "@/lib/api";

export default function VerseList({ surahId }: { surahId: number }) {
  const {
    data: surah,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["surah", surahId],
    queryFn: () => fetchSurahDetail(surahId),
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
        Error loading Surah. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {surah?.englishName} ({surah?.name})
        </h1>
        <p className="text-gray-600">{surah?.englishNameTranslation}</p>
      </div>

      <div className="space-y-6">
        {surah?.ayahs.map((ayah) => (
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
  );
}
