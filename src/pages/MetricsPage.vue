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
    <GridComponent :layout="layout" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GridComponent from 'components/GridComponent.vue';
import DateRangeComponent from 'components/DateRangeComponent.vue';

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
</script>
