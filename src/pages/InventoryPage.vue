<template>
  <div class="column">
    <div class="col q-ma-md">
      <q-table
        class="sharp-shadow"
        flat
        title="BBS/LVC"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
    <div class="col q-mx-md">
      <q-table
        class="sharp-shadow"
        flat
        title="Routers"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
    <div class="col q-ma-md">
      <q-table
        class="sharp-shadow"
        flat
        title="Interfaces"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTableStore } from 'stores/table.ts';
import { storeToRefs } from 'pinia';

const tableData = useTableStore();
const { columns, rows } = storeToRefs(tableData);
</script>

<style scoped lang="sass">
.sharp-shadow
  box-shadow: var(--o-grid-shadow)
</style>
