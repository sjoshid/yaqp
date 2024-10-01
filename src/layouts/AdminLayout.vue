<template>
  <q-layout view="lHh Lpr lFf">
    <OHeaderComponent />
    <ODrawerComponent />

    <q-page-container class="q-ma-lg">
      <q-tabs
        v-model="panel"
        dense
        class="text-grey"
        active-bg-color="accent"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-route-tab name="users" label="Users" to="/admin/users" exact />
        <q-route-tab name="company" label="Company" to="/admin/company" exact />
        <q-route-tab name="groups" label="Groups" to="/admin/groups" exact />
        <q-route-tab name="alerts" label="Alerts" to="/admin/alerts" exact />
      </q-tabs>
      <div class="q-pa-xl row">
        <div class="col-11">
          <router-view />
        </div>
      </div>

      <q-page-sticky position="bottom-right" :offset="[50, 50]">
        <q-fab v-model="fab" color="secondary" icon="add" direction="up">
          <q-fab-action
            color="primary"
            icon="person_add"
            to="/admin/users/create"
          />
          <q-fab-action color="accent" icon="add_business" />
          <q-fab-action color="secondary" icon="group_add" />
          <q-fab-action color="orange" icon="add_alert" />
        </q-fab>
      </q-page-sticky>
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
