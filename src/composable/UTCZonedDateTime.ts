import {
  ChronoUnit,
  DateTimeFormatter,
  ZonedDateTime,
  ZoneId,
} from '@js-joda/core';
import { Granularity, PresetDetails } from 'src/composable/metrics.ts';
import { shallowRef } from 'vue';

export const nowUTC = (): ZonedDateTime => ZonedDateTime.now(ZoneId.of('UTC'));

export const usDateTimeMask = 'MM/dd/yyyy HH:mm'; // works
export const usDateTimeFormatter = DateTimeFormatter.ofPattern(usDateTimeMask);
export const usDateMask = 'MM/dd/yyyy';
export const usDateFormatter = DateTimeFormatter.ofPattern(usDateMask);

export const quasarFormat = 'MM/DD/YYYY HH:mm';

export interface Preset {
  label: string;
  value: string;
  period: () => PresetDetails;
  /** Should be <code>true</code> if <i>now</i> is constantly changing. Like last hr, last 24 hrs etc. <br>
   * Should be <code>false</code> for yesterday, last week, etc. */
  fluid: boolean;
}

export const availablePresets: Preset[] = [
  {
    label: 'Last 24 hrs',
    value: 'l24h',
    period: (): PresetDetails => {
      const endDateTime = nowUTC();
      const startDateTime = endDateTime.minusHours(24);
      return {
        startDateTime,
        endDateTime,
        available: [Granularity.MINUTE, Granularity.HOUR],
      };
    },
    fluid: true,
  },
  {
    label: 'Yesterday',
    value: 'yest',
    period: (): PresetDetails => {
      const endDateTime = nowUTC().truncatedTo(ChronoUnit.DAYS);
      const startDateTime = endDateTime.minusHours(24);
      return {
        startDateTime,
        endDateTime,
        available: [Granularity.MINUTE, Granularity.HOUR],
      };
    },
    fluid: false,
  },
  {
    label: 'Last 7 days',
    value: 'l7d',
    period: (): PresetDetails => {
      const endDateTime = nowUTC();
      const startDateTime = endDateTime.minusDays(7);
      return {
        startDateTime,
        endDateTime,
        available: [Granularity.MINUTE, Granularity.HOUR],
      };
    },
    fluid: false,
  },
];

export const selectedPreset = shallowRef(availablePresets[0]);
