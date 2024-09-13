import { defineStore } from 'pinia';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { ref } from 'vue';

export type TSDetails = {
  url: string;
  options: ECBasicOption;
};

export const useMegaTimeSeriesStore = defineStore('chartsStore', () => {
  const routerInOut: TSDetails = {
    url: '/metrics/inout',
    options: {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Max In', 'Max Out', 'Avg In', 'Avg Out'],
      },
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
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Max In',
          type: 'line',
          stack: 'Total',
          data: [],
        },
        {
          name: 'Max Out',
          type: 'line',
          stack: 'Total',
          data: [],
        },
        {
          name: 'Avg In',
          type: 'line',
          stack: 'Total',
          data: [],
        },
        {
          name: 'Avg Out',
          type: 'line',
          stack: 'Total',
          data: [],
        },
      ],
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
