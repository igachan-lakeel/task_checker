<!-- モーダルの中身 -->
<script setup>
import Select from "@/components/ui/Select.vue";
import { ref } from "vue";

const task = ref({
  name: "",
  explanation: "",
  deadlineDate: "",
  image_url: "",
  status: 0,
  genreId: "",
});

const genreSelect = (e) => {
  task.value.genreId = Number(e.target.value);
};

const handleImageUpload = (event) => {
  task.value.image_url = event.target.files[0];
};
</script>

<template>
  <div class="modal-body">
    <h2 class="input-menu">タスクを追加</h2>

    <div>
      <h4 class="input-title">ジャンル</h4>

      <div class="task-genreSelect">
        <Select @change="genreSelect" :value="task.genreId" />
      </div>

      <h4 class="input-title">タイトル</h4>
      <input type="text" v-model="task.name" />

      <h4 class="input-title">説明</h4>
      <textarea v-model="task.explanation" />

      <h4 class="input-title">期限</h4>
      <input class="input-date" type="date" v-model="task.deadlineDate" />

      <h4 class="input-title">画像</h4>
      <input type="file" @change="handleImageUpload" accept="image/*" />
    </div>

    <input class="input-submit" type="button" value="送信" />
  </div>
</template>

<style scoped>
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input,
textarea {
  border: none;
  background-color: #f3f3f3;
  padding: 16px;
  border-radius: 5px;
  width: 230px;
  line-height: 1.5em;
}

.input-title {
  height: 3px;
}

.input-submit {
  margin-top: 30px;
  background-color: rgb(66, 163, 247);
  color: white;
  border-radius: 25px;
  padding: 16px 40px;
  font-size: 15px;
}
</style>
