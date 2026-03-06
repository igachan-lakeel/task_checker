import { defineStore } from "pinia"; // ストアを定義する関数
import { ref } from "vue"; // リアクティブなデータを作る関数
import api from "@/api/axios"; // axios インスタンス

export const useTaskStore = defineStore("task", () => {
  // ① ストアで管理するデータ（全タスク。初期値は空の配列）
  const tasks = ref([]);

  // ② サーバーから全タスクを取得してストアに保存する関数
  async function fetchAllTasks() {
    try {
      const response = await api.get("/tasks");
      tasks.value = response.data; // 取得したデータでストアを更新
    } catch (error) {
      console.log("タスクデータの取得に失敗しました", error);
    }
  }

  // ③ 外部のコンポーネントから使えるよう公開する
  return { tasks, fetchAllTasks };
});
