import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/axios";

export const useGenreStore = defineStore("genre", () => {
  // 全ジャンルデータ（初期値は空の配列）
  const genres = ref([]);

  // サーバーから全ジャンルを取得してストアに保存する関数
  async function fetchAllGenres() {
    try {
      const response = await api.get("/genres");
      genres.value = response.data;
    } catch (error) {
      console.log("ジャンルデータの取得に失敗しました", error);
    }
  }

  return { genres, fetchAllGenres };
});
