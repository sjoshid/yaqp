<template>
  <q-page padding>
    <q-form>
      <q-toggle
        v-model="isDark"
        @click="$q.dark.toggle()"
        label="Dark theme"
        left-label
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { useThemeStore } from 'stores/theme.ts';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import OBtn from '../components/OBtn.vue';

const theme = useThemeStore();
const { isDark } = storeToRefs(theme);

const $q = useQuasar();
</script>
