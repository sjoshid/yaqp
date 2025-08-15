<template>
  <div class="column">
    <div class="col q-ma-md">
      <q-table
        class="sharp-shadow"
        flat
        :rows="devicesDummyData"
        :columns="deviceHeaders"
        row-key="caption"
        bordered
        :visible-columns="visibleColumns"
        @row-click="
          (evt, row, index) => {
            console.log(row);
          }
        "
        no-data-label="Search using filters"
      >
        <template v-slot:top>
          <div class="row full-width">
            <div class="col-3 text-h5 text-primary">BBS/LVC</div>
            <div class="col-9 row justify-end q-gutter-x-md">
              <q-btn icon="bar_chart" :ripple="false">
                <q-tooltip>Show metrics</q-tooltip>
              </q-btn>
              <q-btn icon="dataset_linked" :ripple="false">
                <q-tooltip>Show related</q-tooltip>
              </q-btn>
              <q-btn icon="file_download" :ripple="false">
                <q-tooltip>Download data</q-tooltip>
              </q-btn>
              <q-select
                v-model="visibleColumns"
                multiple
                outlined
                dense
                options-dense
                display-value="Columns"
                emit-value
                map-options
                :options="deviceHeaders"
                option-value="name"
              />
            </div>
          </div>
        </template>
        <template v-slot:header-cell="props">
          <q-th :props="props" auto-width>
            <div>
              {{ props.col.label }}
              <q-input
                v-if="props.col.filterable"
                v-model="filter"
                dense
                debounce="300"
                @input="onFilter"
                filled
                @click.stop="true"
              />
            </div>
          </q-th>
        </template>
      </q-table>
    </div>
    <div class="col q-mx-md">
      <q-table
        class="sharp-shadow"
        flat
        title="Routers"
        :rows="rows"
        :columns="columns"
        row-key="name"
        bordered
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
        bordered
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTableStore } from '../stores/table.ts';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const tableData = useTableStore();
const { columns, rows } = storeToRefs(tableData);

const filter = ref(null);
const visibleColumns = ref(['caption', 'group', 'label']);

const deviceHeaders = ref([
  {
    name: 'caption',
    required: true,
    label: 'Instance name',
    align: 'left',
    field: (row) => row.caption,
    format: (val) => `${val}`,
    sortable: false,
    filterable: true,
  },
  {
    name: 'group',
    align: 'left',
    label: 'Group',
    field: (row) => row.group,
    sortable: false,
    filterable: true,
  },
  { name: 'label', label: 'Label', field: (row) => row.label, sortable: false },
  { name: 'acna', label: 'ACNA', field: (row) => row.acna, sortable: false },
  {
    name: 'sb',
    label: 'Sponsored by',
    field: (row) => row.sb,
    sortable: false,
  },
]);

const devicesDummyData = ref([
  // {
  //   caption: 'cex002',
  //   group: '159',
  //   label: 'label 1',
  //   acna: 'ACNA1',
  //   sb: 'SB1',
  // },
  // {
  //   caption: 'cex001',
  //   group: '159',
  //   label: '',
  //   acna: 'ACNA1',
  //   sb: 'SB1',
  // },
  // {
  //   caption: 'cex003',
  //   group: '159',
  //   label: '',
  //   acna: 'ACNA1',
  //   sb: 'SB1',
  // },
]);
</script>

<style scoped lang="sass">
.sharp-shadow
  box-shadow: var(--o-grid-shadow)
</style>
