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

export const useInOutMetricsBapi = async <IN, OUT>(
  url: string,
  id: string | ToRef<string>,
  cb: ResponseProcessor<IN, OUT>,
): Promise<OUT> => {
  try {
    const { data } = await bapi.get<IN>(url, {
      params: { id: toValue(id) },
    });
    return cb(data);
  } catch (error: never) {
    console.log('Error status', error.response?.status);
    throw error; // or handle error as needed
  }
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
