<template>
  <div class="q-pa-md column">
    <div class="q-px-md  text-h4 text-indigo">Hotspot Page for range (startDate) to (endDate)</div>
    <GridComponent :layout="layout" />
  </div>
</template>

<script setup lang="ts">
import GridComponent from 'components/GridComponent.vue';

defineOptions({
  name: 'HotspotPage',
  preFetch() {
    console.log('im prefetch in HotspotPage.vue');
  },
});

const layout = [
  { x: 0, y: 0, w: 10, h: 12, i: '0' },
  { x: 0, y: 12, w: 10, h: 12, i: '1' },
];
</script>
