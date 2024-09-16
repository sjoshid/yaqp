<template>
  <q-card>
    <q-card-section>
      <q-skeleton v-if="isLoading" height="100%" square />
      <v-chart
        v-else
        :option="chartOptions"
        autoresize
        class="chart"
        ref="oChart"
      />
    </q-card-section>
  </q-card>
  <!--  <div v-else class="row justify-center">Loading...</div>-->
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

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | LineSeriesOption
>;

const megaTimeSeries = useMegaTimeSeriesStore();
const { megaDict } = storeToRefs(megaTimeSeries);
const isLoading = ref(false);

const details: TSDetails = megaDict.value[props.idFromMegaDict];
const chartOptions = details.options;
const url = details.url;
const responseProcessor = details.cb;

const dummyData = ref([
  {
    name: 'Max In',
    type: 'line',
    stack: 'Total',
    data: [
      ['2024-03-01T12:22:33.123', 10.5],
      ['2024-03-01T14:22:33.123', 10.5],
      ['2024-03-01T18:22:33.123', 200.5],
    ],
  },
  {
    name: 'Max Out',
    type: 'line',
    stack: 'Total',
    data: [
      ['2024-03-01T12:22:33.123', 10.5],
      ['2024-03-01T18:22:33.123', 50.5],
    ],
  },
  {
    name: 'Avg In',
    type: 'line',
    stack: 'Total',
    data: [
      ['2024-03-01T12:22:33.123', 10.5],
      ['2024-03-01T18:22:33.123', 50.5],
    ],
  },
  {
    name: 'Avg Out',
    type: 'line',
    stack: 'Total',
    data: [
      ['2024-03-01T12:22:33.123', 10.5],
      ['2024-03-01T18:22:33.123', 50.5],
    ],
  },
]);
const eChartInstance = useTemplateRef('oChart');

onMounted(() => {
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
});
</script>
