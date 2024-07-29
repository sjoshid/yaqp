<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> Quasar App</q-toolbar-title>
        <q-toggle v-model="isDark" color="black" @click="$q.dark.toggle()" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :mini="miniState"
      mini-to-overlay
      class="column"
    >
      <div class="col-8">
        <q-list>
          <EssentialLink
            v-for="(link, index) in linksList"
            :key="index"
            v-bind="link"
            @click="updateActiveElement(index)"
          />
        </q-list>
      </div>

      <div v-if="miniState" class="q-pa-xs col-4 content-end">
        <q-item clickable @click="miniState = false">
          <q-item-section avatar>
            <q-btn dense round unelevated color="accent" icon="chevron_right" />
          </q-item-section>
        </q-item>
      </div>
      <div
        class="q-mini-drawer-hide absolute"
        style="bottom: 10px; right: -17px"
      >
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md-lg">
        <router-view />
      </div>
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
const updateActiveElement = (index: number) => {
  linksList.value[activeIndex].active = false;
  linksList.value[index].active = true;
  activeIndex = index;
};

const linksList = ref([
  {
    title: 'Hotspot',
    icon: 'leaderboard',
    active: true,
  },
  {
    title: 'Metrics',
    icon: 'show_chart',
    link: '#/user/metrics'
  },
  {
    title: 'Alerts',
    icon: 'notifications',
    link: '#/user/cache',
  },
  {
    title: 'API',
    caption: 'API details',
    icon: 'api',
    link: '#/user/api',
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '#/user/settings',
  },
]);

const leftDrawerOpen = ref(true);
const miniState = ref(true);

function _toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
