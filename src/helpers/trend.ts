import { TREND } from '@/types/Trend';

export const trend = (current: number, previous: number): TREND => {
  const newValue = Math.round(current * 10000);
  const oldValue = Math.round(previous * 10000);
  //  compare with 4 digits precision
  if (newValue > oldValue) return TREND.UP;
  if (newValue < oldValue) return TREND.DOWN;
  return TREND.SAME;
};

export const trendDiff = (current: number, previous: number): string => {
  const newValue = Math.round(current * 10000);
  const oldValue = Math.round(previous * 10000);
  const negative = newValue - oldValue < 0;
  const diff = (newValue - oldValue) / 10000;
  return !negative ? '+' + diff.toString() : diff.toString();
};

export const pair = (charCode: string): string => {
  return charCode + ' - RUB';
};

export const rate = (nominal: number, charCode: string, value: number): string => {
  return nominal + charCode + ' - ' + value + ' RUB';
};

export const reversed = (nominal: number, charCode: string, value: number): number => {
  const result = nominal / value;
  return result;
};
