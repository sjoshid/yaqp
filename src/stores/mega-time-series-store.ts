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
      series: [
        {
          name: 'Sales',
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    },
  };
  const routerUptime: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
  };
  const routerSaturation: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
  };

  const routerGaugeCurrentUptime: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
  };
  const routerMemUsed: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
  };
  const routerGaugeCurrentSat: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
  };

  const routerCPULoad: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
  };
  const routerMemUtil: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
  };
  const routerGaugeCurrentMemUtil: TSDetails<string, string> = {
    url: '',
    options: {},
    cb: (input: string): string => {
      return input.concat('hello');
    },
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
