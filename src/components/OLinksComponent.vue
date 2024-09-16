<template>
  <div class="q-pa-xs">
    <q-item clickable tag="a" :href="link" :class="{ 'bg-cust': active }">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
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
