<template>
  <q-drawer
    v-model="leftDrawerOpen"
    bordered
    :mini="miniState"
    mini-to-overlay
    class="column justify-between q-field__control"
  >
    <div class="col-10">
      <q-list>
        <OLinksComponent
          v-for="(link, index) in linksList"
          :key="index"
          v-bind="link"
          @click="updateActiveElement(index)"
        />
      </q-list>
    </div>
    <div class="col-2 column justify-end">
      <OLinksComponent
        title="Admin"
        icon="admin_panel_settings"
        caption="Manage users and companies"
        link="#/admin"
      />
      <div v-if="miniState" class="q-pa-xs content-end">
        <q-item clickable @click="miniState = false">
          <q-item-section avatar>
            <q-btn dense round unelevated color="accent" icon="chevron_right" />
          </q-item-section>
        </q-item>
      </div>
    </div>
    <div class="q-mini-drawer-hide absolute" style="bottom: 10px; right: -17px">
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import OLinksComponent from 'components/OLinksComponent.vue';
import { OLinkProps } from 'src/composable/metrics.ts';

const $router = useRouter();

defineOptions({
  name: 'MainLayout',
});
let activeIndex = -1;
const updateActiveElement = (index: number) => {
  linksList.value[activeIndex].active = false;
  linksList.value[index].active = true;
  activeIndex = index;
};

const linksList = ref<OLinkProps[]>([
  {
    title: 'Hotspot',
    icon: 'leaderboard',
  },
  {
    title: 'Metrics',
    icon: 'show_chart',
    link: '#/user/metrics',
  },
  /*{
    title: 'API',
    caption: 'API details',
    icon: 'api',
    link: '#/user/api',
  },*/
  {
    title: 'Inventory',
    caption: 'Inventory for devices, BBSes, etc.',
    icon: 'inventory',
    link: '#/user/inventory',
  },
  {
    title: 'Settings',
    caption: 'User settings',
    icon: 'settings',
    link: '#/user/settings',
  },
]);

const leftDrawerOpen = ref(true);
const miniState = ref(true);

onMounted(() => {
  for (let i = 0; i < linksList.value.length; i++) {
    if (linksList.value[i]) {
      if (linksList.value[i].link === $router.currentRoute.value.href) {
        activeIndex = i;
        linksList.value[i].active = true;
        break;
      }
    }
  }
  if (activeIndex === -1) {
    activeIndex = 0;
    linksList.value[0].active = true;
  }
});
</script>
