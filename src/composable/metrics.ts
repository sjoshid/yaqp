import { bapi } from '../boot/axios.ts';
import { Ref, ToRef, toValue } from 'vue';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { ZonedDateTime } from '@js-joda/core';

export interface OLinkProps {
  name: string;
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  active?: boolean;
}

export interface InOutResponse {
  name: string;
  type: string;
  stack: string;
  data: [[string, number]];
}

export interface ResponseProcessor<IN, OUT> {
  (res: IN): OUT;
}

export interface TSDetails<IN, OUT> {
  url: string;
  options: ECBasicOption;
  cb: ResponseProcessor<IN, OUT>;
}

export const useInOutMetricsBapi = <IN, OUT>(
  url: string,
  id: string | ToRef<string>,
  cb: ResponseProcessor<IN, OUT>,
  options?: {
    loading: Ref<boolean>;
  },
): OUT => {
  if (typeof options !== 'undefined') {
    options.loading.value = true;
  }
  bapi
    .get<IN>(url, {
      params: { id: toValue(id) },
    })
    .then(({ data }) => {
      // if here, then it is guaranteed response was OK (200s). No need to check for status.
      //options?.loading.value = false;
      return cb(data);
    })
    .catch(({ response }) => {
      console.log('Error status', response.status);
    });
};

export enum Granularity {
  MINUTE,
  HOUR,
  WEEK,
}

export interface PresetDetails {
  startDateTime: ZonedDateTime;
  endDateTime: ZonedDateTime;
  // sj_todo How to make available of size at least 1?
  available: Granularity[];
}
