<template>
  <div class="dropdown-wrapper" ref="dropDown">
    <div class="dropdown-selected-option" @click="openCloseHandler">
      {{ selectedOption }}
    </div>
    <div class="options-wrapper" v-if="isOpen">
      <div class="option" v-for="(option, index) in options" :key="index" @click="toggleOptionSelect(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { IValuteSelect } from '@/types/Daily';

interface Props {
  /**
   * Array of options for dropdown in following format: [{name: "Австралийский доллар", id: "R01010"}]
   */
  options: IValuteSelect[];
  /**
   * initial option for selected
   */
  selected: string;
}

interface Emits {
  /**
   * Update value on user selection
   * @arg {IValuteSelect} value - user selection
   */
  (e: 'update:modelValue', value: IValuteSelect): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isOpen = ref(false);
const dropDown = ref<HTMLDivElement>();

const selectedOption = ref(props.selected);

const toggleOptionSelect = (option: IValuteSelect) => {
  selectedOption.value = option.name;
  emit('update:modelValue', option);
  isOpen.value = false;
};

const openCloseHandler = () => {
  isOpen.value = !isOpen.value;
};

const closeDropDown = (element: Event) => {
  if (!dropDown.value?.contains(element.target as HTMLDivElement)) {
    isOpen.value = false;
  }
};

/**
 * Following code closes dropdown when user clicks outside
 */
onMounted(() => {
  window.addEventListener('click', closeDropDown);
});
/**
 * Cleanup previous listener
 */
onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropDown);
});
</script>

<style scoped lang="scss">
.dropdown-wrapper {
  padding: 5px;
  cursor: pointer;
  max-width: 600px;
  margin: 0 auto;
  display: block;
  position: relative;
}
.dropdown-selected-option {
  padding: 5px;
  border: solid 1px #efefef;
  box-sizing: border-box;
  margin-bottom: 4px;
}
.options-wrapper {
  background-color: #ffffff;
  position: absolute;
  top: 40px;
  width: 605px;
  height: 300px;
  overflow-y: auto;
}
.option:hover {
  background: #c5c5c5;
}
.option {
  padding: 5px;
  border: solid 1px #efefef;
  box-sizing: border-box;
}
</style>
