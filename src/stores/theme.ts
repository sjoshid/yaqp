import { defineStore } from 'pinia';
import { provide, ref, watch } from 'vue';
import { LocalStorage } from 'quasar';
import { THEME_KEY } from 'vue-echarts';

export const useThemeStore = defineStore('theme', () => {
  // init from localstorage
  const isDarkFromLocalStorage: boolean | null = LocalStorage.getItem('oDark');
  const isDark = ref(true);
  if (isDarkFromLocalStorage !== null) {
    isDark.value = isDarkFromLocalStorage;
  }

  watch(isDark, (newValue, _oldValue) => {
    LocalStorage.set('oDark', newValue);
    // this doesn't work!
    provide(THEME_KEY, newValue ? 'dark' : 'vintage');
  });
  return { isDark };
});
