<template>
  <div class="q-pa-md column">
    <div class="row items-center">
      <div class="col-3">
        <div class="q-px-md text-h4 text-indigo">Metrics Page for jpg-004</div>
      </div>
      <div class="col-9">
        <div class="col-10 row justify-end">
          <div class="row justify-end q-ma-md">
            <q-btn class="q-px-md" icon="picture_as_pdf">
              <q-tooltip>Generate dashboard as PDF</q-tooltip>
            </q-btn>
            <q-btn class="q-mx-xs" icon="pause">
              <q-tooltip>Pause dashboard auto-refresh</q-tooltip>
            </q-btn>
          </div>
          <DateRangeComponent
            :sdate="startDate"
            :edate="endDate"
            @apply-range="changeTimeRange"
          />
        </div>
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
    <q-form @submit="changeId" class="row">
      <div class="q-ma-xs col-1 content-center">
        <q-input filled v-model="inputId" label="Router id" dense />
      </div>
      <div class="q-ma-xs col-1 content-center">
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <GridComponent
      v-if="activeLayout.length > 0"
      :id="activeId"
      :startDate
      :endDate
      :layout="activeLayout"
    />
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

const routerLayout = [
  { x: 0, y: 0, w: 12, h: 5, i: 'routerInOut' },

  /*{ x: 0, y: 5, w: 5, h: 5, i: 'routerUptime' },
  { x: 5, y: 5, w: 5, h: 5, i: 'routerSaturation' },
  { x: 10, y: 5, w: 2, h: 5, i: 'routerGaugeCurrentUptime' },

  { x: 0, y: 15, w: 10, h: 5, i: 'routerMemUsed' },
  { x: 10, y: 15, w: 2, h: 5, i: 'routerMemUsed' },

  { x: 0, y: 20, w: 5, h: 5, i: 'routerCPULoad' },
  { x: 5, y: 20, w: 5, h: 5, i: 'routerCPULoad' },
  { x: 10, y: 20, w: 2, h: 5, i: 'routerGaugeCurrentMemUtil' },*/
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

const activeLayout = ref([]);
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

const changeTimeRange = (sd: string, ed: string) => {
  console.log('start date is', sd, 'end date is', ed);
  startDate.value = sd;
  endDate.value = ed;
};

const changeId = () => {
  activeLayout.value = routerLayout;
  activeId.value = inputId.value;
};
const activeId = ref('');
const inputId = ref('');
</script>
