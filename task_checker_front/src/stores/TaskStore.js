import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/axios";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const filteredTasks = ref([]);

  // 全タスク取得
  const fetchAllTasks = async () => {
    try {
      const response = await api.get("/tasks");
      tasks.value = response.data;
      // 初期表示時は全件を表示
      filteredTasks.value = response.data;
    } catch (error) {
      console.error("タスクデータの取得に失敗しました", error);
    }
  };

  // ジャンルによるフィルタリング
  const filterTasks = (genreId) => {
    const numericGenreId = Number(genreId);
    if (numericGenreId === 0) {
      filteredTasks.value = [...tasks.value];
    } else {
      filteredTasks.value = tasks.value.filter(
        (task) => numericGenreId === task.genreId,
      );
    }
  };

  // タスクの追加（アロー関数）
  const addTask = async (newTask) => {
    try {
      const formData = new FormData();
      formData.append("name", newTask.name);
      formData.append("explanation", newTask.explanation);
      formData.append("deadlineDate", newTask.deadlineDate);
      formData.append("status", newTask.status);
      formData.append("genreId", newTask.genreId);
      formData.append("image_url", newTask.image_url);

      // headersはAxiosがFormDataを検知して自動設定してくれるため、基本省略可能です
      const response = await api.post("/tasks", formData);

      const addedTask = response.data;

      // 重要：保存成功後、ストアの配列に新しいデータを追加して画面に即時反映させる
      tasks.value = [...tasks.value, addedTask];
      // 現在のフィルタリング状態に関わらず、一旦リストを更新（必要に応じて再フィルタリング）
      filteredTasks.value = [...tasks.value];
    } catch (error) {
      console.error("タスクデータの保存ができませんでした", error);
    }
  };

  // すべての変数と関数を公開する
  return {
    tasks,
    filteredTasks,
    fetchAllTasks,
    filterTasks,
    addTask,
  };
});
