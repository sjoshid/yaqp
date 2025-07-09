<template>
  <q-header
    class="text-white header"
    height-hint="61.59"
  >
    <q-toolbar class="q-py-sm q-px-md">
      <q-select
        global_search
        ref="search"
        dark
        dense
        standout
        use-input
        hide-selected
        color="black"
        :stack-label="false"
        label="Search or jump to..."
        v-model="text"
        :options="filteredOptions"
        @filter="filter"
        style="width: 300px"
      >
        <template v-slot:append>
          <img
            src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg"
          />
        </template>

        <template v-slot:no-option>
          <q-item>
            <q-item-section>
              <div class="text-center">
                <q-spinner-pie color="grey-5" size="24px" />
              </div>
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section side>
              <q-icon name="collections_bookmark" />
            </q-item-section>
            <q-item-section></q-item-section>
            <q-item-section side :class="{ 'default-type': !scope.opt.type }">
              <o-btn
                outline
                dense
                no-caps
                text-color="blue-grey-5"
                size="12px"
                class="bg-grey-1 q-px-sm"
              >
                {{ scope.opt.type || 'Jump to' }}
                <q-icon name="subdirectory_arrow_left" size="14px" />
              </o-btn>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div
        v-if="$q.screen.gt.sm"
        class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap"
      >
        <router-link to="/user/metrics" class="text-white">
          Performance Metrics
        </router-link>
        <router-link to="/user" class="text-white"> Hotspot</router-link>
        <router-link to="/user/inventory" class="text-white">
          Connection Inventory
        </router-link>
      </div>

      <q-space />

      <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
        <q-btn
          notifications_btn
          v-if="$q.screen.gt.xs"
          dense
          flat
          round
          size="sm"
          icon="notifications"
        />
        <o-btn plus_btn v-if="$q.screen.gt.xs">
          <div class="row items-center no-wrap">
            <q-icon name="add" size="20px" />
            <q-icon
              name="arrow_drop_down"
              size="16px"
              style="margin-left: -2px"
            />
          </div>
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section>New Company</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>New User</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>New Smart Alert</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>New Group</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </o-btn>

        <o-btn profile-button>
          <q-avatar rounded size="20px">
            <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
          </q-avatar>
          <q-icon name="arrow_drop_down" size="16px" />

          <q-menu auto-close>
            <q-list dense>
              <q-item class="GL__menu-link-signed-in">
                <q-item-section>
                  <div>Signed in as <strong>Sujit</strong></div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Your profile</q-item-section>
              </q-item>
              <q-item clickable to="/admin">
                <q-item-section>Admin</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Help</q-item-section>
              </q-item>
              <q-item clickable to="/user/settings">
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </o-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
</script>
