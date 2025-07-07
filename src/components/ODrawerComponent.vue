<template>
  <q-drawer v-model="leftDrawerOpen" bordered mini class="column">
    <q-tabs
      v-model="tab"
      vertical
      dense
      class="col-11"
      active-bg-color="accent"
      indicator-color="accent"
    >
      <OLinksComponent
        v-for="(link, index) in linksList"
        :key="index"
        v-bind="link"
      />
    </q-tabs>
    <q-tabs
      v-model="adminsettings"
      vertical
      dense
      class="col-1 content-end"
      active-bg-color="accent"
      indicator-color="accent"
    >
      <OLinksComponent
        name="adminsettings"
        icon="admin_panel_settings"
        link="/admin"
        title="Admin"
      />
    </q-tabs>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OLinksComponent from 'components/OLinksComponent.vue';
import { OLinkProps } from 'src/composable/metrics.ts';

defineOptions({
  name: 'MainLayout',
});

const linksList = ref<OLinkProps[]>([
  {
    name: 'hotspot',
    title: 'Hotspot',
    icon: 'leaderboard',
    link: '/user',
  },
  {
    name: 'metrics',
    title: 'Metrics',
    icon: 'show_chart',
    link: '/user/metrics',
  },
  /*{
    title: 'API',
    caption: 'API details',
    icon: 'api',
    link: '#/user/api',
  },*/
  {
    name: 'inventory',
    title: 'Inventory',
    caption: 'Inventory for devices, BBSes, etc.',
    icon: 'inventory',
    link: '/user/inventory',
  },
  {
    name: 'usersettings',
    title: 'Settings',
    caption: 'User settings',
    icon: 'settings',
    link: '/user/settings',
  },
  /*{
    name: 'admin',
    title: 'Settings',
    caption: 'Admin settings',
    icon: 'admin_panel_settings',
    link: '/admin',
  },*/
]);

const leftDrawerOpen = ref(true);
const tab = ref('hotspot');
const adminsettings = ref('adminsettings');
</script>
