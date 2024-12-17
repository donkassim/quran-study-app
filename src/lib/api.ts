import axios from "axios";
import { Surah, SurahDetail, Ayah } from "@/types/quran";

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

interface ApiAyah extends Omit<Ayah, "translation"> {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
}

const api = axios.create({
  baseURL: "https://api.alquran.cloud/v1",
});

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await api.get<ApiResponse<Surah[]>>("/surah");
  return response.data.data;
};

export const fetchSurahDetail = async (
  surahNumber: number
): Promise<SurahDetail> => {
  const [surahResponse, translationResponse] = await Promise.all([
    api.get<ApiResponse<SurahDetail & { ayahs: ApiAyah[] }>>(
      `/surah/${surahNumber}`
    ),
    api.get<ApiResponse<{ ayahs: { text: string }[] }>>(
      `/surah/${surahNumber}/en.asad`
    ),
  ]);

  const surah = surahResponse.data.data;
  const translation = translationResponse.data.data;

  return {
    ...surah,
    ayahs: surah.ayahs.map((ayah: ApiAyah, index: number) => ({
      ...ayah,
      translation: translation.ayahs[index].text,
    })),
  };
};
