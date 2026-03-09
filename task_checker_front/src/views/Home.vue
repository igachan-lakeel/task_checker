<script setup>
import { ref, onMounted } from "vue";
// import api from '@/api/axios'   ← 削除（ストアに移動したため不要）
import { useTaskStore } from "@/stores/TaskStore"; // 追加
import { useGenreStore } from "@/stores/GenreStore"; // 追加
import Header from "@/components/common/Header.vue";
import Select from "@/components/ui/Select.vue";
import ToDoList from "@/components/task/ToDoList.vue";
import FormModal from "@/components/modal/FormModal.vue";
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline.vue";

const showModal = ref(false);
const taskStore = useTaskStore(); // タスクストアのインスタンスを作成
const genreStore = useGenreStore(); // ジャンルストアのインスタンスを作成

onMounted(async () => {
  try {
    await taskStore.fetchAllTasks();
  } catch (error) {
    console.error(error);
  }

  try {
    await genreStore.fetchAllGenres();
  } catch (error) {
    console.error(error);
  }
});

const changeSelectedGenreId = (e) => {
  const selectGenreId = e.target.value;
  taskStore.filterTasks(selectGenreId);
};

const taskStatusElements = [
  "ToDo",
  "Pending",
  "Doing(ToDay)",
  "WIP",
  "Check",
  "Done",
];

const filterTasksByStatus = (statusIndex) => {
  const index = statusIndex;
  return taskStore.filteredTasks.filter((task) => task.status == index);
};
</script>

<template>
  <div class="main">
    <Header />
    <div class="genre">
      <Select @change="changeSelectedGenreId" />
      <PlusCircleOutline class="add-icon" @click="showModal = true" />
      <FormModal v-model="showModal" body="genreBody" />
    </div>
    <div class="contents">
      <div v-for="(status, index) in taskStatusElements" :key="index">
        <ToDoList
          :tasks="filterTasksByStatus(index)"
          :key="index"
          :status="status"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-color: #f6f8f9;
}

.genre {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding-top: 20px;
}

.add-icon {
  margin-left: 10px;
  color: rgb(70, 70, 70);
}

.contents {
  display: flex;
  height: calc(100vh - 120px);
  width: 100%;
  overflow: auto;
}
</style>
