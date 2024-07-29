<template>
  <q-page padding>
    <q-table
      title="Result"
      :rows="tableData"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { bapi } from 'boot/axios';

defineComponent({
  name: 'APIAccessPage',
});

const urls: string[] = ['/alerts'];
const columns = ref([
  {
    name: 'url',
    label: 'URL',
    field: 'url',
  },
  {
    name: 'details',
    label: 'Details',
    field: 'details',
  },
]);

interface URL {
  url: string;
  details: string;
}

const tableData = ref<URL[]>([]);

urls.forEach((url) => {
  bapi
    .get(url)
    .then((response) => {
      console.log('response', response.data);
      tableData.value.push({
        url: url,
        details: JSON.stringify(response.data),
      });
    })
    .catch(() => {
      tableData.value.push({
        url: url,
        details: 'Permission denied',
      });
    });
});
</script>
