<!-- src/components/genre/GenreBody.vue -->
<script setup>
import CancelIcon from "vue-material-design-icons/CloseCircle.vue";
</script>

<template>
  <div class="modal-body">
    <h2 class="input-menu">ジャンル編集</h2>
    <ul>
      <li class="genre-title">
        <span>ジャンルの名前</span>
        <CancelIcon />
      </li>
    </ul>
    <input type="text" />
    <input class="input-submit" type="button" value="追加" />
  </div>
</template>

<style scoped>
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.genre-title {
  width: 200px;
  display: flex;
  justify-content: space-between;
}

input {
  border: none;
  background-color: #f3f3f3;
  padding: 16px;
  border-radius: 5px;
  width: 230px;
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
