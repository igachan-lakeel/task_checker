import { defineStore } from "pinia"; // ストアを定義する関数
import { ref } from "vue"; // リアクティブなデータを作る関数
import api from "@/api/axios"; // axios インスタンス

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const filteredTasks = ref([]);

  async function fetchAllTasks() {
    try {
      const response = await api.get("/tasks");
      tasks.value = response.data; // 取得したデータでストアを更新
      filteredTasks.value = tasks.value;
    } catch (error) {
      console.log("タスクデータの取得に失敗しました", error);
    }
  }

  async function filterTasks(genreId) {
    const numericGenreId = Number(genreId);
    //一般的にデータベースの ID は 1 から始まります。
    // そのため、プルダウン（<select>）の一番上に置く「すべてのジャンル」や「未選択」という項目に対して、
    // プログラム側で便宜上 value="0" を割り当てることが多いです。
    if (numericGenreId === 0) {
      filteredTasks.value = [...tasks.value];
    } else {
      filteredTasks.value = tasks.value.filter(
        (task) => numericGenreId === task.genreId,
      );
    }
  }
  return { tasks, filteredTasks, fetchAllTasks, filterTasks };
});
