<script setup>
import { ref } from "vue"; // ref をインポート
import { useGenreStore } from "@/stores/GenreStore"; // ストアをインポート
import CancelIcon from "vue-material-design-icons/CloseCircle.vue";

const genreStore = useGenreStore();
const genreName = ref(""); // 入力した文字を溜めておく場所

// 追加ボタンを押した時の処理
const handleAddGenre = async () => {
  if (!genreName.value.trim()) {
    alert("ジャンル名を入力してください");
    return;
  }
  await genreStore.addGenre(genreName.value);
  genreName.value = ""; // 入力欄を空にする
};
</script>

<template>
  <div class="modal-body">
    <h2 class="input-menu">ジャンル編集</h2>
    <ul>
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        class="genre-title"
      >
        <span>{{ genre.name }}</span>
        <CancelIcon />
      </li>
    </ul>

    <input type="text" v-model="genreName" placeholder="新しいジャンル名" />

    <input
      class="input-submit"
      type="button"
      value="追加"
      @click="handleAddGenre"
    />
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
