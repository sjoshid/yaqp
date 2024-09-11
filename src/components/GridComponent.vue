<template>
  <q-page padding>
    <grid-layout
      v-bind:layout="layout"
      :row-height="50"
      is-draggable
      is-resizable
      use-css-transforms
    >
      <grid-item
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
        <v-chart class="chart" :option="chartOptions" autoresize />
      </grid-item>
    </grid-layout>
  </q-page>
</template>

<script setup lang="ts">
import { GridItem, GridLayout } from 'grid-layout-plus';
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
import { ECBasicOption } from 'echarts/types/dist/shared';

const _props = defineProps<{
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  }[];
  chartOptions: ECBasicOption;
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
