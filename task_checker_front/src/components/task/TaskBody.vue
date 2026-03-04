<!-- src/components/task/TaskBody.vue -->
<script setup>
import Select from "@/components/ui/Select.vue";
</script>

<template>
  <div class="modal-body">
    <h2 class="input-menu">タスクを追加</h2>
    <div>
      <h4 class="input-title">ジャンル</h4>
      <Select />
      <h4 class="input-title">タイトル</h4>
      <input type="text" />
      <h4 class="input-title">説明</h4>
      <textarea />
      <h4 class="input-title">期限</h4>
      <input type="date" />
      <h4 class="input-title">画像</h4>
      <input type="file" accept="image/*" />
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
