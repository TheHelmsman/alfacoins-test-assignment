import { defineStore } from 'pinia';
import { CbrStore } from '@/types/store';
import log from 'loglevel';
import { cbdDataApi } from '@/services';
import { AxiosResponse } from 'axios';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { Valute, IValuteExtData, IValuteSelect } from '@/types/Daily';
import { trend, trendDiff, pair, rate, reversed } from '@/helpers/trend';

const getDefaultState = (): CbrStore => ({
  Valute: null,
  SearchQuery: '',
  toConvert: null,
  converted: null,
  rate: null,
  selectedValute: '',
  reversed: false,
  reversedRate: null,
});

export const useCbrStore = defineStore('useCbrStore', {
  state: () => getDefaultState(),

  actions: {
    async fetchDaily(): Promise<IValuteExtData | undefined> {
      const loadingStore = useLoadingStore();
      loadingStore.startLoading();
      try {
        const { data }: AxiosResponse = await cbdDataApi.getDailyData();
        const result = data?.Valute
          ? Object.entries(data.Valute).map((item) => {
              const record = item as unknown as Valute;
              const result = {
                trend: trend(record[1].Value, record[1].Previous),
                diff: trendDiff(record[1].Value, record[1].Previous),
                pair: pair(record[1].CharCode),
                rate: rate(record[1].Nominal, record[1].CharCode, record[1].Value),
                reversed: reversed(record[1].Nominal, record[1].CharCode, record[1].Value),
                reversed_rate:
                  '1 RUB - ' +
                  reversed(record[1].Nominal, record[1].CharCode, record[1].Value) +
                  ' ' +
                  record[1].CharCode,
                ...record[1],
              };
              return result;
            })
          : null;

        this.Valute = result;
        return data as IValuteExtData;
      } catch (error) {
        log.error(error);
      } finally {
        loadingStore.stopLoading();
      }
    },
    searchDaily(searchQuery: string) {
      this.SearchQuery = searchQuery;
    },
    getCurrentCode(): string {
      const item = this.Valute?.find((element) => element.ID === this.selectedValute);
      return item?.CharCode ?? '';
    },
    getValueNameById(id: string): string {
      const item = this.Valute?.find((element) => element.ID === id);
      return item?.Name ?? '';
    },
    calculate(payload: string) {
      this.toConvert = parseInt(payload);
      if (!this.reversed) {
        this.converted = this.rate ? this.toConvert * this.rate : null;
      } else {
        this.converted = this.reversedRate ? this.toConvert * this.reversedRate : null;
      }
    },
    setRate(id: string) {
      const item = this.Valute?.find((element) => element.ID === id);
      this.rate = item?.Value ?? null;
      this.reversedRate = item?.reversed ?? null;
      this.toConvert = null;
      this.converted = null;
      this.selectedValute = id;
    },
    switchCurrency() {
      this.reversed = !this.reversed;
      this.toConvert = null;
      this.converted = null;
    },
  },

  getters: {
    getDailyData(state): IValuteExtData[] {
      if (state.SearchQuery) {
        const result = state.Valute?.filter((item) => {
          if (item.CharCode.indexOf(state.SearchQuery) >= 0 || item.Name.indexOf(state.SearchQuery) >= 0) {
            return true;
          }
          return false;
        });
        return result as IValuteExtData[];
      }
      return state.Valute as IValuteExtData[];
    },
    getValutesList(state): IValuteSelect[] {
      if (state.Valute && state.Valute?.length > 0) {
        return state.Valute?.map((item) => {
          return { name: item.Name, id: item.ID };
        });
      }
      return [];
    },
  },
});
