<template>
  <q-page padding>
    <q-table
      class="sharp-shadow"
      flat
      title="BBS/LVC"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useTableStore } from 'stores/table.ts';
import { storeToRefs } from 'pinia';

const tableData = useTableStore();
const { columns, rows } = storeToRefs(tableData);
</script>
