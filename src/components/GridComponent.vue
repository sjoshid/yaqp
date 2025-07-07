<template>
  <q-page padding>
    <grid-layout
      v-model:layout="refLayout"
      :col-num="12"
      :row-height="60"
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
      >
        <div style="vertical-align: center; width: 100%; height: 100%">
          <OTSChartComponent
            :id
            :startDate
            :endDate
            :idFromMegaDict="item.i"
            :dummy="dummy"
          />
        </div>
      </grid-item>
    </grid-layout>
  </q-page>
</template>

<script setup lang="ts">
import { GridItem, GridLayout } from 'grid-layout-plus';
import OTSChartComponent from 'components/OTSChartComponent.vue';
import { ref, toRef } from 'vue';

const props = defineProps<{
  id: string; //router id, intf. id, etc.
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  }[];
  startDate: string;
  endDate: string;
}>();

const refLayout = toRef(props.layout);
const dummy = ref('blah');

const handleResize = () => {
  console.log('resized');
  dummy.value = '';
};
</script>

<style scoped lang="sass">
.vgl-layout
  background-color: var(--o-dashboard-bg-color)

.vgl-item
  background-color: #886464

.sharp-shadow
  box-shadow: var(--o-grid-shadow)
</style>
