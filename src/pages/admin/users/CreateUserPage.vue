<template>
  <q-card class="create-account-card">
    <q-form @submit="submitForm">
      <div class="row">
        <div class="col q-ma-md">
          <q-card-section>
            <div class="text-h6">Create New User Account</div>
            <div class="text-subtitle1">
              Fill out the following form to create your new account.
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section class="column q-gutter-md">
            <q-input
              label="Name"
              stack-label
              v-model="formState.name"
              :rules="[
                (val) => (val && val.length > 0) || 'Name must be filled in.',
              ]"
              color="secondary"
              lazy-rules="ondemand"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="emergency" color="negative" size="xs" />
              </template>
            </q-input>
            <q-input
              label="Username"
              stack-label
              v-model="formState.email"
              :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
              lazy-rules="ondemand"
              clearable
              color="secondary"
            >
              <template v-slot:prepend>
                <q-icon name="emergency" color="negative" size="xs" />
              </template>
            </q-input>
            <q-input
              label="Phone"
              v-model="formState.phone"
              mask="(###) ### - ####"
              hint="(###) ### - ####"
            ></q-input>
            <q-input
              label="Password"
              v-model="formState.password.value"
              type="password"
              :rules="[
                (val) =>
                  validatePassword(val) || 'Password must meet all criteria.',
              ]"
            >
            </q-input>
            <div class="password-criteria q-pa-sm">
              <div class="text-subtitle2 q-mb-sm">Password Criteria:</div>
              <div>
                <q-icon
                  :name="validPassword.length ? 'check_circle' : 'cancel'"
                  :color="validPassword.length ? 'positive' : 'negative'"
                ></q-icon>
                Must be at least 12 characters long.
              </div>
              <div>
                <q-icon
                  :name="validPassword.capital ? 'check_circle' : 'cancel'"
                  :color="validPassword.capital ? 'positive' : 'negative'"
                ></q-icon>
                Must contain at least one capital letter.
              </div>
              <div>
                <q-icon
                  :name="validPassword.number ? 'check_circle' : 'cancel'"
                  :color="validPassword.number ? 'positive' : 'negative'"
                ></q-icon>
                Must contain at least one number.
              </div>
              <div>
                <q-icon
                  :name="validPassword.symbol ? 'check_circle' : 'cancel'"
                  :color="validPassword.symbol ? 'positive' : 'negative'"
                ></q-icon>
                Must contain at least one special character: !@#$%^&*()-_+=
              </div>
            </div>
            <q-input
              label="Confirm Password"
              v-model="formState.password.confirm"
              :disable="!validatePassword(formState.password.value)"
              type="password"
              :rules="[
                (val) =>
                  (val && val === formState.password.value) ||
                  'Must match password.',
              ]"
            >
            </q-input>
          </q-card-section>
        </div>
        <div class="col column q-ma-md justify-between">
          <div class="col">
            <q-card-section class="column q-gutter-md">
              <q-select
                stack-label
                label="Role"
                color="secondary"
                v-model="role"
                :options="roleOptions"
              >
                <template v-slot:prepend>
                  <q-icon name="emergency" color="negative" size="xs" />
                </template>
              </q-select>
              <q-toolbar shrink class="bg-primary">
                <q-toolbar-title shrink>Groups</q-toolbar-title>
              </q-toolbar>
              <q-scroll-area style="height: 200px">
                <q-list>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-model="group" val="teal" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>G1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-model="group" val="orange" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>G2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-checkbox v-model="group" val="cyan" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>G3</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-checkbox v-model="group" val="cyan" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>G3</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item tag="label" v-ripple>
                    <q-item-section avatar top>
                      <q-checkbox v-model="group" val="cyan" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>G3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
              <q-toolbar class="bg-primary">
                <q-toolbar-title>Additional Permissions</q-toolbar-title>
              </q-toolbar>
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-checkbox v-model="additionalPerms" val="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Manage Alerts</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-checkbox v-model="additionalPerms" val="orange" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Manage Report Schedules</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </div>
          <div class="col column justify-end">
            <q-card-actions align="right">
              <q-btn flat color="secondary" to="/admin/users">Cancel</q-btn>
              <q-btn color="primary" type="submit">Create Account</q-btn>
            </q-card-actions>
          </div>
        </div>
      </div>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import OButton from 'components/OBtn.vue';

defineOptions({
  preFetch() {
    console.log('im prefetch in CreateUserPage.vue');
  },
});

type AccountFormState = {
  name: string;
  email: string;
  phone: string;
  password: {
    value: string;
    confirm: string;
  };
};
type PasswordValidator = {
  length: boolean;
  capital: boolean;
  number: boolean;
  symbol: boolean;
};
const formState = reactive(<AccountFormState>{
  name: '',
  email: '',
  phone: '',
  password: {
    value: '',
    confirm: '',
  },
});

const validPassword = reactive(<PasswordValidator>{
  length: false,
  capital: false,
  number: false,
  symbol: false,
});

function validateEmail(email: string): boolean {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

function validatePassword(password: string): boolean {
  // Test length
  validPassword.length = password.length >= 12;
  // Test capital
  validPassword.capital = /^(?=.*[A-Z])/.test(password);
  // Test number
  validPassword.number = /^(?=.*[0-9])/.test(password);
  // Test symbol
  validPassword.symbol = /^(?=.*[!@#\$%\^&\*_\-=+])/.test(password);
  return (
    validPassword.length &&
    validPassword.capital &&
    validPassword.number &&
    validPassword.symbol
  );
}

function submitForm(): void {
  console.log('formState', formState);
}

const group = ref([]);

const role = ref('Company User');
const roleOptions = ['System Admin', 'Company Admin', 'Company User'];

const additionalPerms = ref([]);

onMounted(() => {
  console.log('usersingup page mounted');
});

onUnmounted(() => {
  console.log('usersingup page onUnmounted');
});
</script>
