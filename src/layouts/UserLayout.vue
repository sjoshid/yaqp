<template>
  <q-layout class="bg-grey-1">
    <OHeaderComponent />

    <q-page-container>
        <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { fabGithub } from '@quasar/extras/fontawesome-v6';
import { ref } from 'vue';
import OBtn from 'components/OBtn.vue';
import OHeaderComponent from '../components/OHeaderComponent.vue';

const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome',
];

const text = ref('');
const options = ref(null);
const filteredOptions = ref([]);
const search = ref(null); // $refs.search

function filter(val, update) {
  if (options.value === null) {
    // load data
    setTimeout(() => {
      options.value = stringOptions;
      search.value.filter('');
    }, 2000);
    update();
    return;
  }

  if (val === '') {
    update(() => {
      filteredOptions.value = options.value.map((op) => ({ label: op }));
    });
    return;
  }

  update(() => {
    filteredOptions.value = [
      {
        label: val,
        type: 'In this repository',
      },
      {
        label: val,
        type: 'All GitHub',
      },
      ...options.value
        .filter((op) => op.toLowerCase().includes(val.toLowerCase()))
        .map((op) => ({ label: op })),
    ];
  });
}
</script>

<style scoped lang="sass">
</style>
