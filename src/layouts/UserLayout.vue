<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App</q-toolbar-title>
        <q-toggle v-model="isDark" color="black" @click="$q.dark.toggle()" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links</q-item-label>

        <EssentialLink
          v-for="(link, index) in linksList"
          :key="index"
          v-bind="link"
          @click="updateTitle(index)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      Dark theme?: {{ isDark }}
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useThemeStore } from 'stores/theme';

import EssentialLink from 'components/EssentialLink.vue';

const theme = useThemeStore();
const $q = useQuasar();
const { isDark } = storeToRefs(theme);

defineOptions({
  name: 'MainLayout',
});
let activeIndex = 0;
const updateTitle = (index: number) => {
  linksList.value[activeIndex].active = false;
  linksList.value[index].active = true;
  activeIndex = index;
};

const linksList = ref([
  {
    title: 'Cache',
    caption: 'Caches',
    icon: 'favorite',
    link: '#/user/cache',
    active: true,
  },
  {
    title: 'Home',
    caption: 'Take me home',
    icon: 'home',
  },
  {
    title: 'API',
    caption: 'API details',
    icon: 'api',
    link: '#/user/api',
  },
]);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
