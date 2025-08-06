<template>
  <q-layout view="lHh Lpr lFf">
    <OHeaderComponent />

    <q-page-container class="q-ma-lg">
      <q-tabs
        v-model="panel"
        dense
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-route-tab name="users" label="Users" to="/admin/users" exact :ripple="false"/>
        <q-route-tab name="company" label="Company" to="/admin/company" exact :ripple="false"/>
        <q-route-tab name="groups" label="Groups" to="/admin/groups" exact :ripple="false"/>
        <q-route-tab name="alerts" label="Alerts" to="/admin/alerts" exact :ripple="false"/>
      </q-tabs>
      <div class="q-pa-xl row">
        <div class="col-11">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import OHeaderComponent from 'components/OHeaderComponent.vue';
import ODrawerComponent from 'components/ODrawerComponent.vue';
import { ref } from 'vue';

const panel = ref('users');
const fab = ref(false);
</script>
