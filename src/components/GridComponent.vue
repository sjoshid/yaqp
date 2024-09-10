<template>
  <q-page padding>
    <GridLayout
      v-bind:layout="layout"
      :col-num="10"
      :row-height="50"
      is-draggable
      is-resizable
      vertical-compact
      use-css-transforms
    >
      <GridItem
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        @resize="handleResize"
        class="sharp-shadow"
      >
        <highcharts :options="chartOptions"></highcharts>
      </GridItem>
    </GridLayout>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const _props = defineProps<{
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  }[];
}>();

onMounted(() => {
  chartOptions.value = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'My Chart',
    },
    series: [
      {
        data: [1, 2, 3, 4, 5],
      },
    ],
  };
});
const chartOptions = ref({
  chart: {
    type: 'line',
  },
  title: {
    text: 'My Chart',
  },
  series: [
    {
      data: [1, 2, 3, 4, 5],
    },
  ],
});

const handleResize = () => {
  console.log('resized');
};
</script>

<style scoped>
.vgl-item {
  background-color: #886464;
}

body.body--dark .sharp-shadow {
  box-shadow: rgba(136, 165, 191, 0.48) 3px 3px 0 0;
}
</style>
