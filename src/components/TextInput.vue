<template>
  <div>
    <div class="wrapper name-title" :style="cssVars">
      {{ title }}
    </div>
    <div class="wrapper input-wrapper" :style="cssVars">
      <input
        class="data-input"
        :id="title"
        :class="classes"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup="emit('keyupEvent')"
        @blur="emit('onChangeHandler')"
        :disabled="disabled"
      />
    </div>
    <div class="wrapper" :style="cssVars">
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /**
   * Title - usually shed some light on what input is used for
   */
  title: string;
  /**
   * Input type, can be either text or number (for numeric entries only)
   */
  type?: string;
  /**
   * Placeholder text - used for hints (what user shall type)
   */
  placeholder: string;
  /**
   * Used in case of an error - when incorrect data detected, this information represented below input field
   */
  error?: string;
  /**
   * Input value
   */
  modelValue: string;
  /**
   * Width of input
   */
  width?: string;
  /**
   * If input disabled or not
   */
  disabled?: boolean;
}

interface Emits {
  /**
   * Update input with user entry
   * @arg {string} value - input data
   */
  (e: 'update:modelValue', value: string): void;
  /**
   * Dispatches when input changed
   */
  (e: 'onChangeHandler'): void;
  /**
   * Dispatched when user releases key
   */
  (e: 'keyupEvent'): void;
}

const props = withDefaults(defineProps<Props>(), {
  width: '80%',
  type: 'text',
});

const emit = defineEmits<Emits>();

const cssVars = {
  '--width': props.width,
};

const classes = computed(() => {
  return {
    'data-input--error': props.error,
    'data-input--empty': !props.modelValue && !props.error,
    'data-input--full': props.modelValue && !props.error,
  };
});
</script>

<style scoped lang="scss">
.data-input {
  &--error {
    background-color: $white;
    border: solid 1px $red;
  }

  &--empty {
    background-color: $input-bg-color;
    border: solid 0px $divider-gray;
  }

  &--full {
    background-color: $azure;
    border: solid 1px $azure-dark;
  }
}

.wrapper {
  display: inline-flex;
  width: var(--width);
}

.name-title {
  margin-bottom: 5px;
  font-size: $font-size-small;
  text-align: left;
}

.input-wrapper {
  height: 36px;
  border-radius: 4px;
}

input {
  width: 100%;
  padding: 0 10px 0 10px;
  background: none;
  border: 0;
  outline: none;
}

.error {
  font-size: $font-size-small;
  color: $red;
  text-align: left;
}
</style>
