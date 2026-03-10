<script setup>
import CheckAll from "vue-material-design-icons/CheckAll.vue";
import { auth, signOut, onAuthStateChanged } from "@/firebase";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter(); // ナビゲーション用（router.push など）
const route = useRoute(); // 現在のルート情報（route.params など）
const currentUser = ref(null);

const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.log("ログアウトに失敗しました", error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    // ユーザーがログイン中の場合はcurrentUserの値を更新する
    if (user) {
      currentUser.value = auth.currentUser;
    } else {
      currentUser.value = null;
    }
  });
});
</script>

<template>
  <div class="header">
    <div class="header-left">
      <CheckAll class="header-icon" />
      <span class="header-title">Task Checker</span>
    </div>

    <div v-if="currentUser" class="header-search">
      <div class="search-container">
        <input
          placeholder="タイトルで検索"
          class="search-input"
          type="search"
          aria-label="検索"
        />
        <button class="search-button">検索</button>
      </div>
    </div>

    <div v-if="currentUser" class="header-right">
      <div class="header-right">
        <button @click="handleSignOut" class="logout-button">ログアウト</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: white;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  padding: 0 30px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-icon {
  color: rgb(170, 1, 1);
}

.header-title {
  font-size: 25px;
  color: rgb(70, 70, 70);
  font-weight: bold;
  margin-left: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  max-width: 400px;
}

.search-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.7rem;
}

.search-button {
  padding: 0.4rem 0.8rem;
  background-color: #4f83f2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.7rem;
  cursor: pointer;
}

.logout-button {
  background-color: rgb(66, 163, 247);
  color: white;
  border-radius: 25px;
  border-style: none;
  padding: 8px 20px;
  margin-bottom: 8px;
  font-size: 15px;
}
</style>
