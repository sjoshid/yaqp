import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { LocalStorage } from 'quasar';

export const useThemeStore = defineStore('theme', () => {
  // init from localstorage
  const isDarkFromLocalStorage: boolean | null = LocalStorage.getItem('oDark');
  const isDark = ref(true);
  if (isDarkFromLocalStorage !== null) {
    isDark.value = isDarkFromLocalStorage;
  }

  watch(isDark, (newValue, _oldValue) => {
    LocalStorage.set('oDark', newValue);
  });
  return { isDark };
});
