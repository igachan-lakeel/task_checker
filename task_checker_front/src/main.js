import { createApp } from "vue";
import { createPinia } from "pinia"; // Pinia をインポート
import App from "./App.vue";
import "@/assets/main.css";

const app = createApp(App); // App.vue をアプリとして登録
app.use(createPinia());
app.mount("#app"); // index.html の id="app" の要素に表示
