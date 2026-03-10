import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/axios";

export const useGenreStore = defineStore("genre", () => {
  const genres = ref([]);

  // 全ジャンル取得
  async function fetchAllGenres() {
    try {
      const response = await api.get("/genres");
      genres.value = response.data;
    } catch (error) {
      console.log("ジャンルデータの取得に失敗しました", error);
    }
  }

  // ★追加：ジャンルの保存処理
  async function addGenre(name) {
    try {
      // サーバーへ送信
      const response = await api.post("/genres", { name });
      // 成功したら、今のリストの末尾に新しいデータを追加（画面が即座に更新される）
      genres.value = [...genres.value, response.data];
    } catch (error) {
      console.error("ジャンルの保存に失敗しました", error);
    }
  }

  // addGenre を return に追加するのを忘れずに
  return { genres, fetchAllGenres, addGenre };
});
