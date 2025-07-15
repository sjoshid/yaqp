<template>
  <q-skeleton v-if="isLoading" type="rect" width="100%" height="100%" />
  <div v-else-if="isError" class="row justify-center">
    <p>Errored</p>
  </div>
  <!-- warn: autoresize is a very important props. Remove it and see what I mean. -->
  <v-chart
    v-else-if="isSuccess"
    theme="vintage"
    autoresize
    :option="chartOptions"
    class="chart"
  />
  <div v-else class="row justify-center">
    <p>Unknonw error</p>
  </div>
</template>

<script lang="ts" setup>
import { useMegaTimeSeriesStore } from '../stores/mega-time-series-store';
import VChart from 'vue-echarts';
import { onBeforeMount, onBeforeUpdate, ref, toRef } from 'vue';
import { Granularity, TSDetails } from 'src/composable/metrics.ts';
import { useAxios } from '../composable/useAxios';
import { ZonedDateTime } from '@js-joda/core';

const props = defineProps<{
  id: string;
  idFromMegaDict: string;
  startDate: ZonedDateTime;
  endDate: ZonedDateTime;
  gran: Granularity,
}>();

const megaTimeSeries = useMegaTimeSeriesStore();
const ss = megaTimeSeries.megaDict;
let isLoading = ref(true);
let isError = ref(null);
let isSuccess = ref(false);

const details: TSDetails = ss[props.idFromMegaDict];
let chartOptions = details.options;
//const url = details.url;
//const responseProcessor = details.cb;
//const eChartInstance = useTemplateRef('oChart');

onBeforeMount(() => {
  //console.log('TS Chart onBeforeMount with id', props.id);
  const { data, loading, error, success, fetchData } = useAxios<{
    name: [[ts: string, value: number]];
  }>();
  isLoading = toRef(loading);
  isError = toRef(error);
  isSuccess = toRef(success);
  let response = toRef(data);

  fetchData(`/kbps/${props.id}`, {
    auth: {
      username: 'sj_baml_api_user',
      password: 'Welcome99',
    },
  }).then(() => {
    chartOptions.series = [
      {
        type: 'line',
        name: 'Max Kbps',
        data: response.value.max,
        yAxisIndex: 0,
      },
      {
        type: 'line',
        name: 'Avg Kbps',
        data: response.value.avg,
        yAxisIndex: 1,
      },
    ];
  });
});

// This is called only when reactive data changes. Not on first mount.
onBeforeUpdate(() => {
  console.log('onBeforeUpdate called with startDate %s endDate %s and gran %s', props.startDate, props.endDate, props.gran.toString());
});
</script>
