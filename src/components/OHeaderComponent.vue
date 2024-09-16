<template>
  <q-header>
    <q-toolbar class="justify-between">
      <q-toolbar-title>Oculus</q-toolbar-title>
      <q-form class="q-px-md">
        <q-input
          dense
          rounded
          standout
          :model-value="searchQuery"
          label="Search"
        />
      </q-form>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
</script>
