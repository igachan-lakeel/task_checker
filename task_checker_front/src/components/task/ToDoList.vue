<script setup>
import { ref } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import PlusCircleOutline from "vue-material-design-icons/PlusCircleOutline.vue";
import Task from "@/components/task/Task.vue";
import FormModal from "@/components/modal/FormModal.vue";
import { useTaskStore } from "@/stores/TaskStore";
const taskStore = useTaskStore();

const showModal = ref(false);
</script>

<template>
  <div class="task-list">
    <div class="section">
      <MenuIcon class="section-ele" />
      <span class="section-ele">ToDo</span>
      <PlusCircleOutline class="add-circle-icon" @click="showModal = true" />
      <FormModal v-model="showModal" body="taskBody" />
    </div>

    <div class="task-field">
      <div v-for="task in taskStore.filteredTasks" :key="task.id">
        <Task :task="task" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  min-width: 300px;
  width: auto;
  padding: 30px;
  padding-top: 50px;
}

.section {
  display: flex;
  position: relative;
  align-items: center;
  height: 50px;
  width: 300px;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.section-ele {
  color: rgb(70, 70, 70);
  margin-left: 10px;
  font-size: 18px;
}

.task-field {
  display: flex;
  flex-direction: column;
  max-height: 65vh;
  margin-top: 10px;
  overflow: auto;
}

.task-field::-webkit-scrollbar {
  display: none;
}

.section > .add-circle-icon {
  position: absolute;
  right: 10px;
  font-size: 25px;
  color: rgb(70, 70, 70);
}
</style>
