<template>
  <div class="q-py-md">
    <q-route-tab :name :icon :to="link" class="text-secondary" />
  </div>
</template>

<script setup lang="ts">
import { OLinkProps } from 'src/composable/metrics.ts';

withDefaults(defineProps<OLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  active: false,
});
</script>

<style scoped lang="sass">
.bg-cust
  background-color: var(--q-accent)
</style>
