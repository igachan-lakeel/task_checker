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

  // タスクの追加
  const addTask = async (newTask) => {
    try {
      const formData = new FormData();
      formData.append("name", newTask.name);
      formData.append("explanation", newTask.explanation);
      formData.append("deadlineDate", newTask.deadlineDate);
      formData.append("status", newTask.status);
      formData.append("genreId", newTask.genreId);

      // サーバー側の upload.single("image") とキー名を合わせる
      if (newTask.image_url) {
        formData.append("image", newTask.image_url);
      }

      const response = await api.post("/tasks", formData);
      const addedTask = response.data;

      // データの更新（スプレッド構文を使用してリアクティブに更新）
      tasks.value = [...tasks.value, addedTask];
      filteredTasks.value = [...tasks.value];
    } catch (error) {
      console.error("タスクデータの保存ができませんでした", error);
    }
  };

  return {
    tasks,
    filteredTasks,
    fetchAllTasks,
    filterTasks,
    addTask,
  };
});
