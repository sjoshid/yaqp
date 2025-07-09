<template>
  <q-skeleton v-if="isLoading" type="rect" width="100%" height="100%" />
  <!-- warn: autoresize is a very important props. Remove it and see what I mean. -->
  <v-chart v-else theme="vintage" autoresize :option="chartOptions" class="chart" />
</template>

<script lang="ts" setup>
import { useMegaTimeSeriesStore } from '../stores/mega-time-series-store';
import VChart from 'vue-echarts';
import { onBeforeMount, onBeforeUpdate, ref } from 'vue';
import { TSDetails } from 'src/composable/metrics.ts';

const props = defineProps<{
  id: string;
  idFromMegaDict: string;
  startDate: string;
  endDate: string;
}>();

const megaTimeSeries = useMegaTimeSeriesStore();
const ss = megaTimeSeries.megaDict;
const isLoading = ref(true);

const details: TSDetails = ss[props.idFromMegaDict];
let chartOptions = details.options;
//const url = details.url;
//const responseProcessor = details.cb;
//const eChartInstance = useTemplateRef('oChart');

onBeforeMount(() => {
  isLoading.value = true;
  //console.log('TS Chart onBeforeMount with id', props.id);
  setTimeout(() => {
    // make API call
    chartOptions.series = [
      {
        type: 'line',
        name: 'Max Kbps',
        data: [
          ['2025-07-01T12:22:33-05:00', 20.0],
          ['2025-07-01T12:27:33-05:00', 10.0],
          ['2025-07-01T12:32:33-05:00', 30.0],
          ['2025-07-01T12:37:33-05:00', 60.0],
          ['2025-07-01T12:42:33-05:00', 90.0],
        ],
      },
      {
        type: 'line',
        name: 'Avg Kbps',
        data: [
          ['2025-07-01T12:22:33-05:00', 10.0],
          ['2025-07-01T12:27:33-05:00', 40.0],
          ['2025-07-01T12:32:33-05:00', 50.0],
          ['2025-07-01T12:37:33-05:00', 80.0],
          ['2025-07-01T12:42:33-05:00', 50.0],
        ],
      },
    ];
    isLoading.value = false;
  }, 2000);
});

// This is called only when reactive data changes. Not on first mount.
onBeforeUpdate(() => {
  console.log('onBeforeUpdate called');
});
</script>
