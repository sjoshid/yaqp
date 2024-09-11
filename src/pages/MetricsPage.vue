<template>
  <div class="q-pa-md column">
    <div class="row justify-between">
      <div class="col-3 content-center">
        <div class="q-px-md text-h4 text-indigo">Metrics Page for jpg-004</div>
      </div>
      <div class="col content-center">
        <div class="row justify-end">
          <q-btn class="q-mx-xs" icon="picture_as_pdf">
            <q-tooltip> Generate dashboard as PDF</q-tooltip>
          </q-btn>
          <q-btn class="q-mx-xs" icon="pause">
            <q-tooltip> Pause dashboard auto-refresh</q-tooltip>
          </q-btn>
        </div>
      </div>
      <div class="col-6">
        <DateRangeComponent
          :sdate="startDate"
          :edate="endDate"
          @apply-range="updateDashboard"
        />
      </div>
    </div>
    <GridComponent :layout="layout" :chart-options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import GridComponent from 'components/GridComponent.vue';
import DateRangeComponent from 'components/DateRangeComponent.vue';
import { THEME_KEY } from 'vue-echarts';
import { storeToRefs } from 'pinia';
import { useThemeStore } from 'stores/theme.ts';

const theme = useThemeStore();
const { isDark } = storeToRefs(theme);

defineOptions({
  name: 'MetricsPage',
  preFetch() {
    console.log('im prefetch in MetricsPage.vue');
  },
});

const startDate = ref('2024-09-04 10:00');
const endDate = ref('2024-09-04 10:00');

const layout = [
  { x: 0, y: 0, w: 10, h: 5, i: '0' },
  { x: 0, y: 5, w: 10, h: 5, i: '1' },
  { x: 0, y: 15, w: 10, h: 5, i: '2' },
  { x: 0, y: 20, w: 10, h: 5, i: '3' },
];

const updateDashboard = (startDate: string, endDate: string) => {
  console.log('start date is', startDate, 'end date is', endDate);
};

const options = {
  title: {
    text: 'Stacked Line',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
</script>
