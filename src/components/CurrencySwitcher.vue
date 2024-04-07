<template>
  <div class="switcher">
    <span>{{ src }}</span>
    <span class="material-symbols-outlined switcher-icon" @click="swapHandler">swap_horiz</span>
    <span>{{ trg }}</span>
  </div>
</template>

<script setup lang="ts">
export interface ITrendProps {
  /**
   * Source - from currency char code, for example: "USD" or "RUB"
   */
  src: string;
  /**
   * Target - to currency char code, for example: "USD" or "RUB"
   */
  trg: string;
}

interface Emits {
  /**
   * Update when user switches currency
   */
  (e: 'update:modelValue'): void;
}

defineProps<ITrendProps>();
const emit = defineEmits<Emits>();

const swapHandler = () => {
  emit('update:modelValue');
};
</script>

<style>
.switcher {
  width: 150px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: auto;
  align-items: center;
}
.switcher-icon {
  cursor: pointer;
}
</style>
