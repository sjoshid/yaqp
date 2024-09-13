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
    <div class="q-pa-md">
      <q-option-group
        v-model="activeLayout"
        :options="gridOptions"
        color="accent"
        inline
      />
    </div>
    <q-form @submit="onSubmit" class="row">
      <div class="q-ma-xs col-1 content-center">
        <q-input filled v-model="activeRouterId" label="Router id" dense />
      </div>
      <div class="q-ma-xs col-1 content-center">
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <GridComponent :layout="activeLayout" :chart-options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import GridComponent from 'components/GridComponent.vue';
import DateRangeComponent from 'components/DateRangeComponent.vue';
import { inOutSeriesTemplate, useInOutMetricsBapi } from '../composable/metrics.ts';

defineOptions({
  name: 'MetricsPage',
  preFetch() {
    console.log('im prefetch in MetricsPage.vue');
  },
});

const startDate = ref('2024-09-04 10:00');
const endDate = ref('2024-09-04 10:00');

const routerLayout = [
  { x: 0, y: 0, w: 12, h: 5, i: '0' },

  { x: 0, y: 5, w: 5, h: 5, i: '1' },
  { x: 5, y: 5, w: 5, h: 5, i: '2' },
  { x: 10, y: 5, w: 2, h: 5, i: '3' },

  { x: 0, y: 15, w: 10, h: 5, i: '4' },
  { x: 10, y: 15, w: 2, h: 5, i: '5' },

  { x: 0, y: 20, w: 5, h: 5, i: '7' },
  { x: 5, y: 20, w: 5, h: 5, i: '8' },
  { x: 10, y: 20, w: 2, h: 5, i: '9' },
];

const bbsLayout = [
  { x: 0, y: 0, w: 12, h: 5, i: '0' },
  { x: 0, y: 5, w: 12, h: 5, i: '1' },
  { x: 0, y: 15, w: 12, h: 5, i: '2' },
  { x: 0, y: 20, w: 12, h: 5, i: '3' },
];

const chLayout = [
  { x: 0, y: 0, w: 12, h: 7, i: '0' },

  { x: 0, y: 7, w: 5, h: 7, i: '1' },
  { x: 5, y: 7, w: 5, h: 7, i: '2' },
  { x: 10, y: 7, w: 2, h: 7, i: '3' },
];

const activeLayout = ref(routerLayout);
const intfLayout = [...routerLayout];
const gridOptions = [
  {
    label: 'Router Grid Layout',
    value: routerLayout,
  },
  {
    label: 'BBS Grid Layout',
    value: bbsLayout,
  },
  {
    label: 'Intf. Grid Layout',
    value: intfLayout,
  },
  {
    label: 'CloudHub Grid Layout',
    value: chLayout,
  },
];

const updateDashboard = (sd: string, ed: string) => {
  console.log('start date is', sd, 'end date is', ed);
  startDate.value = sd;
  endDate.value = ed;
};

const onSubmit = () => {
  useInOutMetricsBapi(activeRouterId)
};

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Max In', 'Max Out', 'Avg In', 'Avg Out'],
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
    },
    yAxis: {
      type: 'value',
    },
    series: inOutSeriesTemplate,
  };
});

const activeRouterId = ref('');
</script>
