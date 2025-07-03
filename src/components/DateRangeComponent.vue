<template>
  <div class="q-pa-md row justify-end">
    <q-input
      class="q-px-xs col"
      filled
      v-model="start"
      style="max-width: 300px"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="start" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="start" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input class="q-px-xs col" filled v-model="end" style="max-width: 300px">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="end" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="end" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-btn
      class="q-px-xs-xs col-0"
      icon="search"
      color="accent"
      @click="emit('applyRange', start, end)"
    />
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import OButton from 'components/OBtn.vue';

const props = defineProps<{
  sdate: string;
  edate: string;
}>();

const emit = defineEmits<{
  // <eventName>: <expected arguments>
  applyRange: [start: string, end: string];
}>();

const start = toRef(props.sdate);
const end = toRef(props.edate);
</script>
