<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/common/Header.vue";
import { useTaskStore } from "@/stores/TaskStore";
import Task from "@/components/task/Task.vue";

const route = useRoute();
const taskStore = useTaskStore();

// URLのクエリパラメータから検索キーワードを取得
const searchQuery = computed(() => route.query.q || "");

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
