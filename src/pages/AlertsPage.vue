<template>
  <q-page padding>
    <q-list>
      <q-item-label> Show notification alerts </q-item-label>
      <RouterLink to="/admin">Admin</RouterLink>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  preFetch() {
    console.log('im prefetch in AlertsPage.vue');
  },
});
</script>
