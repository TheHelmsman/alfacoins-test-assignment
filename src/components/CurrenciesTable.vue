<template>
  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
      <tr>
        <th v-for="field in columns" :key="field.key">
          {{ field.title }} <i class="bi bi-sort-alpha-down" aria-label="Sort Icon"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.ID">
        <td v-for="field in columns" :key="field.key">
          {{ getValue(item, field) }}
          <CurrencyTrend :amount="trendAmount(item, field)" :icon="isTrend(item, field)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { IValuteExtData } from '@/types/Daily';
import { TREND } from '@/types/Trend';
import { CurrencyTrend } from '.';

export interface IColumnType {
  key: string;
  title: string;
}

export interface ITableProps {
  /**
   * Table data: array that contains objects with information necessary to represent currencies
   */
  data: IValuteExtData[];
  /**
   * Table columns settings: array that contains objects in following format: { key: value, title, value }
   * This information is used to represent table column headers as well as place table rows data in proper cells
   */
  columns: IColumnType[];
}

defineProps<ITableProps>();

const isTrend = (item: IValuteExtData, field: IColumnType): string => {
  const key = field.key as keyof IValuteExtData;
  if (key === 'trend') {
    if (item[key] === TREND.UP) return 'arrow_upward';
    if (item[key] === TREND.DOWN) return 'arrow_downward';
  }
  return '';
};

const trendAmount = (item: IValuteExtData, field: IColumnType): string => {
  const key = field.key as keyof IValuteExtData;
  if (key === 'trend') {
    return item.diff ?? '';
  }
  return '';
};

const getValue = (item: IValuteExtData, field: IColumnType) => {
  const key = field.key as keyof IValuteExtData;
  if (key === 'trend') return '';
  return item[key];
};
</script>
