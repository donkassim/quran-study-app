import SurahList from "@/components/surah-list";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quran Study App
        </h1>
        <p className="text-gray-600">Select a Surah to begin studying</p>
      </div>
      <SurahList />
    </div>
  );
}
