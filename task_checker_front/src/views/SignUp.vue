<script setup>
import Header from "@/components/common/Header.vue";
import { ref } from "vue";
import { auth, createUserWithEmailAndPassword } from "@/firebase";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(); // ナビゲーション用（router.push など）

const email = ref("");
const password = ref("");

const handleSignUp = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push("/home");
  } catch (error) {
    console.log("ユーザー登録できませんでした", error);
  }
};
</script>

<template>
  <div>
    <Header />

    <div class="form-body">
      <h1>新規登録</h1>
      <input type="email" id="email" placeholder="email" v-model="email" />
      <input
        type="password"
        id="password"
        placeholder="password"
        v-model="password"
      />
      <button value="新規登録" @click="handleSignUp">新規登録</button>
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
