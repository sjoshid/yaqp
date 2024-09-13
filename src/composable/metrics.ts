import { bapi } from '../boot/axios.ts';
import { reactive, ref, ToRef, toValue } from 'vue';

const inOutURL = '/metrics/inout';

type InOutSeries = {
  name: string;
  type: string;
  stack: string;
  data: number[];
};

type Main = {
  maxIn: InOutSeries;
  maxOut: InOutSeries;
  avgIn: InOutSeries;
  avgOut: InOutSeries;
};

type InOutResponse = {
  maxIn: number[];
  maxOut: number[];
  avgIn: number[];
  avgOut: number[];
};

export const inOutSeriesTemplate: InOutSeries[] = reactive([
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
]);

export const useInOutMetricsBapi = (routerId: string | ToRef<string>) => {
  bapi
    .get<InOutResponse>(inOutURL, {
      params: { routerID: toValue(routerId) },
    })
    .then(({ data }) => {
      // if here, then it is guaranteed response was OK (200s). No need to check for status.
      inOutSeriesTemplate[0].data = data.maxIn;
      inOutSeriesTemplate[1].data = data.maxOut;
      inOutSeriesTemplate[2].data = data.avgIn;
      inOutSeriesTemplate[3].data = data.avgOut;
    })
    .catch(({ response }) => {
      console.log('Error status', response.status);
    });
};

export default { useInOutMetricsBapi, inOutSeriesTemplate };
