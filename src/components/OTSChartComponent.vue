<template>
  <v-chart :option="chartOptions" class="chart" />
</template>

<script lang="ts" setup>
import { useMegaTimeSeriesStore } from '../stores/mega-time-series-store';
import { use } from 'echarts';
import type { LineSeriesOption } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import type {
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import VChart from 'vue-echarts';
import { storeToRefs } from 'pinia';
import { onBeforeUpdate, onMounted, onUpdated, ref, useTemplateRef } from 'vue';
import { TSDetails, useInOutMetricsBapi } from 'src/composable/metrics.ts';

const props = defineProps<{
  id: string;
  idFromMegaDict: string;
  startDate: string;
  endDate: string;
  dummy: string;
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
const { megaDict } = storeToRefs(megaTimeSeries);
const isLoading = ref(false);

const details: TSDetails = megaDict.value[props.idFromMegaDict];
const chartOptions = ref(details.options);
//const url = details.url;
//const responseProcessor = details.cb;
//const eChartInstance = useTemplateRef('oChart');

/*onMounted(() => {
  console.log('TS Chart onMounted with id', props.id);
  const response = useInOutMetricsBapi(url, props.id, responseProcessor);
  chartOptions.series = response;
});

onUpdated(() => {
  eChartInstance.value.chart.showLoading();
  console.log('TS Chart onUpdated with id', props.id);
  const response = useInOutMetricsBapi(url, props.id, responseProcessor);
  eChartInstance.value.chart.hideLoading();
  chartOptions.series = response;
});

onBeforeUpdate(() => {
  console.log('TS Chart onBeforeUpdate with id', props.id);
  useInOutMetricsBapi(url, props.id, responseProcessor);
});*/
</script>
