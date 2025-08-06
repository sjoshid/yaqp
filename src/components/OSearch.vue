<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useAxios } from '../composable/useAxios';

const filterOptions = ref(null);
const token = ref(null);

const filter = (
  inputValue: string,
  update: (callbackFn: () => void) => void,
) => {
  if (inputValue.trim().length === 0 || inputValue.length < 3) {
    return;
  }
  update(() => {
    const lowerTerm = inputValue.toLowerCase();

    const { data, fetchData } = useAxios<{
      name: { type: string; values: [] };
    }>();
    let response = toRef(data);

    fetchData(`/search/${lowerTerm}`, {
      auth: {
        username: 'sj_baml_api_user',
        password: 'Welcome99',
      },
    }).then(() => {
      const users = [];
      response.value.users.forEach((item) => {
        users.push({
          label: item,
          prof_url: `/profile/${item}`,
          type: 'usr',
        });
      });

      const devices = [];
      response.value.devices.forEach((item) => {
        devices.push({
          label: item,
          inv_url: `/inv/${item}`,
          perf_url: `/perf/${item}`,
          type: 'dev',
        });
      });

      const result = [];

      result.push({ header: true, label: 'Devices' });
      // Add devices section if any
      if (devices.length > 0) {
        result.push(...devices);
      }

      result.push({ header: true, label: 'Users' });
      // Add users section if any
      if (users.length > 0) {
        result.push(...users);
      }

      filterOptions.value = result;
    });
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
    v-model="token"
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
      <q-item v-if="token && token.trim().length !== 0" class="bg-grey-4">
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
