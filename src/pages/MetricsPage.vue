<template>
  <q-page padding>
    <div class="q-pa-xl column">
      <div class="row">
        <div class="col-3">
          <div class="q-px-md text-h4">
            Metrics Page for jpg-004
          </div>
        </div>
        <div class="col-9">
          <div class="row justify-end">
            <q-tabs v-model="tab" dense no-caps inline-label>
              <q-tab name="min" label="Min" :ripple="false" />
              <q-tab name="hourly" label="Hourly" :ripple="false" />
              <q-tab name="daily" label="Daily" :ripple="false" />
            </q-tabs>
            <o-btn
              :dense="false"
              class="q-mx-xs"
              icon="picture_as_pdf"
              size="sm"
            >
              <q-tooltip>Generate dashboard as PDF</q-tooltip>
            </o-btn>
            <o-btn
              class="q-mx-xs"
              :icon="pausePlayIcon"
              @click="togglePausePlayIcon"
              size="sm"
              :dense="false"
            >
              <q-tooltip>Pause dashboard auto-refresh</q-tooltip>
            </o-btn>
            <ODateTimePickerComponent
              :customRangeDialog
              @discard="customRangeDialog = false"
            />
            <q-select
              class="q-ml-md col-2"
              style="max-width: 150px"
              :model-value="selectedPreset.label"
              :options="availablePresets"
              dense
              filled
              label="Presets"
              @update:model-value="
                (nv: string) => {
                  if (nv !== 'custom') {
                    // sj_todo handle this
                    //selectedPreset = nv;
                  } else {
                    customRangeDialog = true;
                  }
                }
              "
            />
          </div>
        </div>
      </div>
      <GridComponent
        :id="activeId"
        :startDate
        :endDate
        :layout="getLayoutForType(metricType)"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import GridComponent from 'components/GridComponent.vue';
import ODateTimePickerComponent from 'components/ODateTimePickerComponent.vue';
import {
  availablePresets,
  nowUTC,
  selectedPreset,
} from 'src/composable/UTCZonedDateTime.ts';
import { PresetDetails } from 'src/composable/metrics.ts';
import OBtn from 'components/OBtn.vue';

const tab = ref('min');
const layout = ref('device');
defineOptions({
  name: 'MetricsPage',
  preFetch() {
    console.log('im prefetch in MetricsPage.vue');
  },
});

const props = withDefaults(
  defineProps<{
    showCustomPreset?: boolean;
    metricType?: string; // type of metric to be displayed.
    activeId?: string; // this is id of the "thing" to get metrics for.
  }>(),
  {
    showCustomPreset: true,
    metricType: 'device',
    activeId: 'RandomId',
  },
);

const startDate = ref('2024-09-04 10:00');
const endDate = ref('2024-09-04 10:00');

const deviceLayout = [
  { x: 0, y: 0, w: 12, h: 5, i: 'routerInOut' },

  { x: 0, y: 1, w: 5, h: 5, i: 'routerUptime' },
  { x: 5, y: 1, w: 5, h: 5, i: 'routerSaturation' },
  { x: 10, y: 1, w: 2, h: 5, i: 'routerGaugeCurrentUptime' },

  { x: 0, y: 2, w: 10, h: 5, i: 'routerMemUsed' },
  { x: 10, y: 2, w: 2, h: 5, i: 'routerGaugeCurrentSat' },

  /*{ x: 0, y: 20, w: 5, h: 5, i: 'routerCPULoad' },
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

const intfLayout = [...deviceLayout];
const gridOptions = [
  {
    label: 'Router Grid Layout',
    value: deviceLayout,
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
const customRangeDialog = ref(false);
const isPaused = ref(false);
const pausePlayIcon = ref('pause');

const togglePausePlayIcon = () => {
  if (isPaused.value) {
    pausePlayIcon.value = 'pause';
  } else {
    pausePlayIcon.value = 'play_arrow';
  }
  isPaused.value = !isPaused.value;
};

onBeforeMount(() => {
  if (props.showCustomPreset) {
    availablePresets.push({
      label: 'Custom',
      value: 'custom',
      period: (): PresetDetails => {
        // This preset is invalid
        return {
          startDateTime: nowUTC(),
          endDateTime: nowUTC(),
          available: [],
        };
      },
      fluid: false,
    });
  }
});

onBeforeUnmount(() => {
  if (props.showCustomPreset) {
    availablePresets.pop();
  }
});

const getLayoutForType = (
  type: string,
): {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}[] => {
  if (type === 'device') {
    return deviceLayout;
  }
  if (type === 'intf') {
    return intfLayout;
  }
  if (type === 'bbs') {
    return bbsLayout;
  }
};
</script>
