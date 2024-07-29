<template>
  <router-view />
</template>

<script setup lang="ts">
import { useThemeStore } from 'stores/theme';
import { Cookies, useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { JSESSION } from 'boot/auth';

const theme = useThemeStore();
const $q = useQuasar();
const { isDark } = storeToRefs(theme);

defineOptions({
  name: 'App',
  preFetch() {
    let session = Cookies.get(JSESSION);
    if (!session) {
      // Not in URL AND not in cookie
      console.log('Initiating auth with backend...');
      window.location.href = 'https://localhost:8443/auth';
    } else {
      console.log('Auth not needed. ');
    }
  },
});

$q.dark.set(isDark.value);
</script>
