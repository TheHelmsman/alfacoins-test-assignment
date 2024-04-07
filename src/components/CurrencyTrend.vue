<template>
  <div v-show="icon" :class="getColor">
    <span>{{ amount }}</span>
    <span class="material-symbols-outlined trend-arrow-settings">{{ icon }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface ITrendProps {
  /**
   * trend amount, can be either positive or negative, for example: +0.0962 or -0.0001
   */
  amount: string;
  /**
   * icon to represent, can be either arrow_downward or arrow_upward
   * related to font icon, more info: https://fonts.google.com/icons
   */
  icon: string;
}

const props = defineProps<ITrendProps>();

const getColor = computed(() => {
  if (props.icon === 'arrow_downward') return 'green';
  if (props.icon === 'arrow_upward') return 'red';
  return '';
});
</script>
