<script setup>
import { computed } from "vue";
import GenreBody from "@/components/genre/GenreBody.vue";
import TaskBody from "@/components/task/TaskBody.vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  body: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

function close() {
  emit("update:modelValue", false);
}

const component = computed(() => {
  return props.body === "taskBody" ? TaskBody : GenreBody;
});
</script>

<template>
  <Teleport to="body">
    <div v-if="props.modelValue" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <component :is="component" />
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
