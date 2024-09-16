import { defineStore } from 'pinia';
import { ref } from 'vue';
import { InOutResponse, TSDetails } from 'src/composable/metrics.ts';

export const useMegaTimeSeriesStore = defineStore('chartsStore', () => {
  const routerInOut: TSDetails<InOutResponse[], InOutResponse[]> = {
    url: '/metrics/inout',
    cb: (res) => {
      console.log(typeof res);
      return res;
    },
    options: {
      tooltip: {
        trigger: 'axis',
      },
      // Legend array will be series[0].name
      /*legend: {
        data: ['Max In', 'Max Out', 'Avg In', 'Avg Out'],
      },*/
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
      },
      // sj_todo Why dont we just return the entire series array from API call?
      // So we dont have to "join"
      series: [],
    },
  };
  const routerUptime: TSDetails = {
    url: '',
    options: {},
  };
  const routerSaturation: TSDetails = {
    url: '',
    options: {},
  };

  const routerGaugeCurrentUptime: TSDetails = {
    url: '',
    options: {},
  };
  const routerMemUsed: TSDetails = {
    url: '',
    options: {},
  };
  const routerGaugeCurrentSat: TSDetails = {
    url: '',
    options: {},
  };

  const routerCPULoad: TSDetails = {
    url: '',
    options: {},
  };
  const routerMemUtil: TSDetails = {
    url: '',
    options: {},
  };
  const routerGaugeCurrentMemUtil: TSDetails = {
    url: '',
    options: {},
  };

  const megaDict = ref({
    routerInOut,
    routerUptime,
    routerSaturation,
    routerGaugeCurrentUptime,
    routerMemUsed,
    routerGaugeCurrentSat,
    routerCPULoad,
    routerMemUtil,
    routerGaugeCurrentMemUtil,
  });
  return { megaDict };
});
