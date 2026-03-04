<!-- src/views/Home.vue（最終版） -->
<script setup>
import { ref } from "vue";
import Header from "@/components/common/Header.vue";
import Select from "@/components/ui/Select.vue";
import ToDoList from "@/components/task/ToDoList.vue";
import FormModal from "@/components/modal/FormModal.vue";
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline.vue";

const showModal = ref(false);
</script>

<template>
  <div class="main">
    <Header />
    <div class="genre">
      <Select />
      <!-- クリックで showModal を true にする -->
      <PlusCircleOutline class="add-icon" @click="showModal = true" />
      <!-- v-model で showModal を FormModal に渡す／body で中身を指定 -->
      <FormModal v-model="showModal" body="genreBody" />
    </div>
    <div class="contents">
      <ToDoList />
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
