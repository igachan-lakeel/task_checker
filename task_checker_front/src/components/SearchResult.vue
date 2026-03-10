<script setup>
import { onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/common/Header.vue";
import { useTaskStore } from "@/stores/TaskStore";
import Task from "@/components/task/Task.vue";

const route = useRoute();
const taskStore = useTaskStore();

// URLのクエリパラメータから検索キーワードを取得
const searchQuery = computed(() => route.query.q || "");

const performSearch = async (query) => {
  try {
    await taskStore.taskSearch(query);
  } catch (error) {
    console.error("検索に失敗しました:", error);
  }
};

watch(
  () => route.query.q,
  (newQuery) => {
    performSearch(newQuery);
  },
);

onMounted(async () => {
  // 初期検索の実行
  if (searchQuery.value) {
    await taskStore.taskSearch(searchQuery.value);
  }
});
</script>

<template>
  <div class="main">
    <Header />
    <div class="contents">
      <div v-for="task in taskStore.searchResults" :key="task.id">
        <Task :task="task" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
