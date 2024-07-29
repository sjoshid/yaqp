<template>
  <div class="q-px-md">
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
defineOptions({
  name: 'EssentialLink',
});

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  active?: boolean;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  active: false,
});
</script>

<style lang="scss">
.bg-cust {
  background-color: var(--q-active);
}
</style>
