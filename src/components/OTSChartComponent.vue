<template>

  <q-skeleton v-if="isLoading" type="rect" width="100%" height="100%"/>
  <!-- warn: autoresize is a very important props. Remove it and see what I mean. -->
  <v-chart v-else autoresize :option="chartOptions" class="chart" />
</template>

<script lang="ts" setup>
import { useMegaTimeSeriesStore } from '../stores/mega-time-series-store';
import { use } from 'echarts';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { ref, onBeforeUpdate, onBeforeMount } from 'vue';
import { TSDetails } from 'src/composable/metrics.ts';

const props = defineProps<{
  id: string;
  idFromMegaDict: string;
  startDate: string;
  endDate: string;
}>();

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);
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
    chartOptions.series = ref([{
      name: 'Sales',
      type: 'line',
      data: [150, 230, 224, 218, 135, 147, 260],
    }]);
    isLoading.value = false;
  }, 2000);
});

// This is called only when reactive data changes. Not on first mount.
onBeforeUpdate(() => {
  console.log('onBeforeUpdate called')
});
</script>
