import { LoadingStore } from '@/types/store';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loadingStore', {
  state: (): LoadingStore => ({
    isLoading: false,
  }),

  actions: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },

  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
  },
});
