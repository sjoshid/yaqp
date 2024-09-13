<template>
  <v-chart class="chart" :option="chartOptions" autoresize />
</template>

<script setup lang="ts">
import {
  TSDetails,
  useMegaTimeSeriesStore,
} from '../stores/mega-time-series-store';
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
import { onBeforeUpdate, onMounted, onUpdated } from 'vue';

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

onMounted(() => {
  console.log('TS Chart onMounted with id', props.id);
});

onUpdated(() => {
  console.log('TS Chart onUpdated with id', props.id);
});

onBeforeUpdate(() => {
  console.log('TS Chart onBeforeUpdate with id', props.id);
});

const details: TSDetails = megaDict.value[props.idFromMegaDict];
const chartOptions = details.options;
const url = details.url;
</script>
