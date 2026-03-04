import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/main.css"; // グローバルCSSを追加

const app = createApp(App); // App.vue をアプリとして登録
app.mount("#app"); // index.html の id="app" の要素に表示
