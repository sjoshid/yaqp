<script setup lang="ts">
import { ref } from 'vue';

const stringOptions = [
  { header: true, label: 'Users' },
  { label: 'Sujit', value: 'sjoshi2' },
  { label: 'Jeff', value: 'jmezger' },
  { header: true, label: 'Devices' },
  { label: 'jnp014', value: '0238402384-82890' },
  { label: 'baml100', value: '987340-0927834' },
];
const filterOptions = ref(null);
const text = ref(null);

const filter = (
  inputValue: string,
  update: (callbackFn: () => void) => void,
) => {
  update(() => {
    if (inputValue.trim().length === 0) {
      filterOptions.value = '';
      abort();
      return;
    } else if (inputValue.length < 3) {
      abort();
      return;
    } else {
      const lowerTerm = inputValue.toLowerCase();
      filterOptions.value = stringOptions.filter(
        (item) => item.header || item.label.toLowerCase().includes(lowerTerm),
      );
    }
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
  >
    <template v-slot:append>
      <img
        src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg"
      />
    </template>

    <template v-slot:no-option>
      <q-item class="bg-grey-4">
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
      </q-item>
    </template>
  </q-select>
</template>

<style scoped lang="sass"></style>
