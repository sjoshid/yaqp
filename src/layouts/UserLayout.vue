<template>
  <q-layout view="lHh Lpr lFf">
    <OHeaderComponent />

    <ODrawerComponent />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import OHeaderComponent from 'components/OHeaderComponent.vue';
import ODrawerComponent from 'components/ODrawerComponent.vue';
</script>
