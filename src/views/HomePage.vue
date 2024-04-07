<template>
  <TextInput
    title="Поиск"
    type="text"
    placeholder="Введите код валюты или название для поиска"
    size="50"
    model-value=""
    @update:modelValue="handleSearch"
  />
  <CurrenciesTable :columns="fields" :data="cbrStore.getDailyData" />
</template>

<script setup lang="ts">
import { useCbrStore } from '@/stores';
import { CurrenciesTable, TextInput } from '@/components';
import { IColumnType } from '@/components/CurrenciesTable.vue';

const cbrStore = useCbrStore();

const handleSearch = (data: string) => {
  cbrStore.searchDaily(data);
};

const fields: IColumnType[] = [
  {
    key: 'pair',
    title: 'Пара',
  },
  {
    key: 'Name',
    title: 'Валюта',
  },
  {
    key: 'CharCode',
    title: 'Код',
  },
  {
    key: 'rate',
    title: 'Курс',
  },
  {
    key: 'reversed_rate',
    title: 'Обратный курс',
  },
  {
    key: 'trend',
    title: 'Тренд',
  },
];
</script>
