<script setup>
import Header from "@/components/common/Header.vue";
import { ref } from "vue";
import { auth, createUserWithEmailAndPassword } from "@/firebase";
import { useRouter } from "vue-router";
</script>

<template>
  <div>
    <Header />

    <div class="form-body">
      <h1>新規登録</h1>
      <input type="text" id="email" placeholder="email" />
      <input type="password" id="password" placeholder="password" />
      <button value="新規登録">新規登録</button>
      <p>
        既にアカウントをお持ちの方は
        <RouterLink to="/">こちらへ</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.form-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  padding: 2vw 10vw;
  text-align: center;
}

input {
  margin-bottom: 16px;
}

button {
  background-color: rgb(66, 163, 247);
  color: white;
  border-radius: 25px;
  border-style: none;
  padding: 8px 20px;
  margin-bottom: 8px;
  font-size: 15px;
  width: 246px;
}
</style>
