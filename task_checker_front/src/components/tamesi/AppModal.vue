<!-- 試し用のモーダルです。 -->
<script setup>
import { ref } from "vue";
const showModal = ref(false);
</script>

<template>
  <div class="p-4">
    <button @click="showModal = true">モーダルを開く</button>

    <Teleport to="body">
      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="showModal = false"
      >
        <div class="modal-content">
          <h3>タイトル</h3>
          <p>ここに内容が入ります。</p>
          <button @click="showModal = false">閉じる</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 半透明の黒 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
</style>
