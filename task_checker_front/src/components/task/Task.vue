<script setup>
import Select from "@/components/ui/Select.vue";
import { computed } from "vue";

const props = defineProps({
  task: Object,
});

const formattedDeadlineDate = computed(() => {
  // propsで受け取ったtask.deadlineDateをDateオブジェクトに変換する
  const date = new Date(props.task.deadlineDate);

  // 変換した Date オブジェクトを、日本の日付形式に変換する
  return date.toLocaleDateString("ja-JP");
});

const taskStyle = computed(() => {
  const isDeadlineAfterToday = new Date(props.task.deadlineDate) > new Date();
  return {
    backgroundColor: isDeadlineAfterToday ? "white" : "rgb(250, 194, 194)",
  };
});
</script>

<template>
  <div class="task" :style="taskStyle">
    <span class="task_date">{{ formattedDeadlineDate }}</span>

    <div class="task-text-contents">
      <h3 class="task-title">{{ task.name }}</h3>
      <p class="task-sentence">{{ task.explanation }}</p>
    </div>

    <div class="task-input-contents">
      <Select />
    </div>
  </div>
</template>

<style scoped>
.task {
  background-color: white;
  max-height: 350px;
  width: 300px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  top: 0;
  transition: top ease 0.2s;
}

.task:hover {
  top: -2px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
}

.task-text-contents {
  padding: 30px 45px 0 20px;
}

.task-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(70, 70, 70);
  font-size: 15px;
  margin-bottom: 10px;
}

.task-sentence {
  overflow: hidden;
  color: rgb(70, 70, 70);
  font-size: 12px;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.task-date {
  position: absolute;
  top: 20px;
  left: 20px;
  color: rgb(133, 133, 133);
  font-size: 11px;
}

.task-input-contents {
  padding: 0 20px 20px 20px;
}
</style>
