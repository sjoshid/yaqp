<template>
  <q-dialog persistent :model-value="customRangeDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ dialogTitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          :class="{ col: !leftRight, row: leftRight }"
          class="justify-between q-gutter-y-md"
        >
          <q-input
            readonly
            :model-value="startDateTime.format(usDateTimeFormatter)"
            dense
            filled
            label="From"
            stack-label
          >
            <template v-slot:prepend>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy
                  cover
                  transition-hide="scale"
                  transition-show="scale"
                >
                  <q-date
                    :model-value="startDateTime.format(usDateTimeFormatter)"
                    :mask="quasarFormat"
                    @update:model-value="
                      (nv) =>
                        (startDateTime = ZonedDateTime.of(
                          LocalDateTime.parse(nv, usDateTimeFormatter),
                          ZoneId.UTC,
                        ))
                    "
                    :options="startDateLimit"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        color="primary"
                        flat
                        label="Close"
                        @click="endDateTimeDisabled = false"
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon class="cursor-pointer" name="access_time">
                <q-popup-proxy
                  cover
                  transition-hide="scale"
                  transition-show="scale"
                >
                  <q-time
                    :model-value="startDateTime.format(usDateTimeFormatter)"
                    format24h
                    :mask="quasarFormat"
                    @update:model-value="
                      (nv) =>
                        (startDateTime = ZonedDateTime.of(
                          LocalDateTime.parse(nv, usDateTimeFormatter),
                          ZoneId.UTC,
                        ))
                    "
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close" />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            readonly
            :disable="endDateTimeDisabled"
            :model-value="endDateTime.format(usDateTimeFormatter)"
            dense
            filled
            label="To"
            stack-label
          >
            <template v-slot:prepend>
              <q-icon class="cursor-pointer" name="event">
                <q-popup-proxy
                  cover
                  transition-hide="scale"
                  transition-show="scale"
                >
                  <q-date
                    :model-value="endDateTime.format(usDateTimeFormatter)"
                    :mask="quasarFormat"
                    @update:model-value="
                      (nv) =>
                        (endDateTime = ZonedDateTime.of(
                          LocalDateTime.parse(nv, usDateTimeFormatter),
                          ZoneId.UTC,
                        ))
                    "
                    :options="endDateLimit"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon class="cursor-pointer" name="access_time">
                <q-popup-proxy
                  cover
                  transition-hide="scale"
                  transition-show="scale"
                >
                  <q-time
                    :model-value="endDateTime.format(usDateTimeFormatter)"
                    format24h
                    :mask="quasarFormat"
                    @update:model-value="
                      (nv) =>
                        (endDateTime = ZonedDateTime.of(
                          LocalDateTime.parse(nv, usDateTimeFormatter),
                          ZoneId.UTC,
                        ))
                    "
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close" />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          color="secondary"
          flat
          label="Close"
          @click="$emit('discard')"
        />
        <q-btn
          v-close-popup
          color="primary"
          label="Apply"
          @click="calculatePreset"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import {
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  ZonedDateTime,
  ZoneId,
} from '@js-joda/core';
import { ref } from 'vue';
import {
  nowUTC,
  Preset,
  selectedPreset,
  usDateTimeFormatter,
} from 'src/composable/UTCZonedDateTime.ts';
import OButton from 'components/OBtn.vue';

interface Props {
  leftRight?: boolean;
  customRangeDialog: boolean;
  dialogTitle?: string;
}

withDefaults(defineProps<Props>(), {
  leftRight: false,
  dialogTitle: 'Set Custom Range',
});

const emit = defineEmits<{
  (event: 'discard'): void;
  (event: 'update:preset', preset: Preset): void;
}>();

const readOnlyEndDateTime = nowUTC();
const endDateTime = ref(readOnlyEndDateTime);
const readOnlyStartDateTime = readOnlyEndDateTime.minusYears(1);
const startDateTime = ref(readOnlyStartDateTime);
const endDateTimeDisabled = ref(true);

const calculatePreset = () => {
  // sj_todo do some date validation before emitting. eg., end date cannot be before start date, etc.
  const preset: Preset = {
    label: 'Custom',
    value: 'custom',
    period: (): PresetDetails => {
      return {
        startDateTime: startDateTime.value,
        endDateTime: endDateTime.value,
        available: [],
      };
    },
    fluid: false,
  };
  selectedPreset.value = preset;
};

const startDateLimit = (date: string): boolean => {
  const selectedDate = LocalDate.parse(
    date.toString(),
    DateTimeFormatter.ofPattern('yyyy/MM/dd'),
  );
  return !(
    selectedDate.isBefore(readOnlyStartDateTime.toLocalDate()) ||
    selectedDate.isAfter(readOnlyEndDateTime.toLocalDate())
  );
};

const endDateLimit = (date: string): boolean => {
  const selectedDate = LocalDate.parse(
    date.toString(),
    DateTimeFormatter.ofPattern('yyyy/MM/dd'),
  );
  return !(
    selectedDate.isBefore(startDateTime.value.toLocalDate()) ||
    selectedDate.isAfter(readOnlyEndDateTime.toLocalDate())
  );
};
</script>
