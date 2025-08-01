<script setup lang="ts">
import { ref } from 'vue';

const stringOptions = [
  { header: true, label: 'Users' },
  { label: 'Sujit', prof_url: '/sjoshi2', type: 'usr' },
  { label: 'Jeff', prof_url: '/jmezger', type: 'usr' },
  { header: true, label: 'Devices', type: 'usr' },
  {
    label: 'jnp014',
    inv_url: '/inv/jnp014',
    perf_url: '/perf/jnp014',
    type: 'dev',
  },
  {
    label: 'baml100',
    inv_url: '/inv//baml100',
    perf_url: '/perf//baml100',
    type: 'dev',
  },
  {
    label: 'baml10',
    inv_url: '/inv/baml10',
    perf_url: '/perf/baml10',
    type: 'dev',
  },
];
const filterOptions = ref(null);
const text = ref(null);

const filter = (
  inputValue: string,
  update: (callbackFn: () => void) => void,
) => {
  if (inputValue.trim().length === 0 || inputValue.length < 3) {
    return;
  }

  update(() => {
    const lowerTerm = inputValue.toLowerCase();
    filterOptions.value = stringOptions.filter(
      (item) => item.header || item.label.toLowerCase().includes(lowerTerm),
    );
  });
};
</script>

<template>
  <q-select
    ref="search"
    use-chips
    dense
    standout
    use-input
    :stack-label="false"
    label="Search or jump to..."
    v-model="text"
    :options="filterOptions"
    @filter="filter"
    style="width: 600px"
    hide-dropdown-icon
  >
    <template v-slot:append>
      <img
        src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg"
      />
    </template>

    <template v-slot:no-option>
      <q-item v-if="text.trim().length !== 0" class="bg-grey-4">
        <q-item-section>
          <div class="text-center text-grey">No results</div>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <div
        v-if="scope.opt.header"
        class="q-px-md q-pt-sm text-grey-7 text-caption"
      >
        {{ scope.opt.label }}
      </div>
      <q-item v-else v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="scope.opt.type == 'dev'" avatar>
          <q-btn flat icon="inventory" :to="scope.opt.inv_url" />
        </q-item-section>
        <q-item-section v-if="scope.opt.type == 'dev'" avatar>
          <q-btn flat icon="bar_chart" :to="scope.opt.perf_url" />
        </q-item-section>
        <q-item-section v-if="scope.opt.type == 'usr'" avatar>
          <q-btn flat icon="contact_page" :to="scope.opt.prof_url" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<style scoped lang="sass"></style>
