<script setup>
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <button @click="showModal = true">モーダルを開く</button>

  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <p>ここにモーダルの中身が入ります</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 2vw 10vw;
  max-height: 75vh;
  overflow-y: auto;
  text-align: center;
  min-width: 400px;
}
</style>
