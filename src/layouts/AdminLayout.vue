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
        <q-toggle
          v-model="isDark"
          color="positive"
          checked-icon="dark_mode"
          unchecked-icon="light_mode"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
    >
      <q-list>
        <q-item-label header> Essential Links</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
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

import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const theme = useThemeStore();
const $q = useQuasar();
const { isDark } = storeToRefs(theme);

defineOptions({
  name: 'AdminLayout',
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Admin page 1',
    caption: '1',
    icon: 'favorite',
    link: '#/admin/admin1',
  },
  {
    title: 'Admin page 2',
    caption: '2',
    icon: 'favorite',
    link: '#/admin/admin2',
  },
];

const leftDrawerOpen = ref(false);
const miniState = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
