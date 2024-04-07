<template>
  <div>
    <DropDown :options="cbrStore.getValutesList" :selected="selectedValute" @update:modelValue="pickedValute" />
  </div>
  <div>Выбранная валюта: {{ selecteValuteName }}</div>
  <div class="converter">
    <TextInput
      title="Исходная сумма:"
      type="number"
      placeholder="Введите сумму для конвертации"
      size="50"
      :model-value="cbrStore.toConvert === null ? '' : cbrStore.toConvert.toString()"
      @update:modelValue="handleConvert"
      :disabled="isDisabled"
      ref="inputSum"
      class="converter-input"
    />
    <CurrencySwitcher
      :src="cbrStore.reversed ? cbrStore.getCurrentCode() : 'RUB'"
      :trg="cbrStore.reversed ? 'RUB' : cbrStore.getCurrentCode()"
      @update:modelValue="onSwitchHandler"
    />
    <TextInput
      title="Конвертированная сумма:"
      type="text"
      placeholder=""
      size="50"
      :model-value="cbrStore.converted === null ? '' : cbrStore.converted.toString()"
      :disabled="true"
      class="converter-input"
    />
  </div>
</template>

<script setup lang="ts">
import { TextInput, DropDown, CurrencySwitcher } from '@/components';
import { ref } from 'vue';
import { useCbrStore } from '@/stores';
import { IValuteSelect } from '@/types/Daily';
const cbrStore = useCbrStore();

const selectedValute = ref('Выберите валюту');
const selecteValuteName = ref('');
const isDisabled = ref(true);
const inputSum = ref<HTMLDivElement>();

const handleConvert = (value: string) => {
  cbrStore.calculate(value);
};

const pickedValute = (option: IValuteSelect) => {
  selecteValuteName.value = cbrStore.getValueNameById(option.id);
  isDisabled.value = false;
  cbrStore.setRate(option.id);
};

const onSwitchHandler = () => {
  cbrStore.switchCurrency();
};
</script>

<style scoped lang="scss">
.converter {
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  gap: 20px;
}
</style>
