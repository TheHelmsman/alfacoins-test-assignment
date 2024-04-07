<template>
  <div v-if="loadingStore.getIsLoading">Loading....</div>
  <div v-else>
    <div id="nav">
      <router-link to="/">Список валют</router-link> |
      <router-link to="/converter">Конвертер</router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore, useCbrStore } from '@/stores';

const loadingStore = useLoadingStore();
const cbrStore = useCbrStore();

cbrStore.fetchDaily();
</script>

<style lang="scss">
@import '@/styles/index.scss';
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $main;

    &.router-link-exact-active {
      color: $green-link;
    }
  }
}
</style>
