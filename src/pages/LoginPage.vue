<template>
  <q-page
    class="window-height window-width row justify-center items-center login-bg"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card class="shadow-24 q-pa-lg">
          <q-card-section class="bg-deep-purple-7">
            <h3 class="text-h5 text-white q-my-md">{{ title }}</h3>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl" ref="myForm">
              <q-input
                square
                clearable
                v-model="email"
                type="email"
                lazy-rules
                :rules="[usernameRequired, isEmail, short]"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                ref="username"
                v-if="register"
                square
                clearable
                v-model="username"
                lazy-rules
                :rules="[required, short]"
                type="username"
                label="User"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[passwordRequired, minPasswordLength]"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input
                ref="repassword"
                v-if="register"
                square
                clearable
                v-model="repassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="[passwordRequired, short, diffPassword]"
                label="Repeat password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              color="primary"
              @click="validate"
              class="full-width text-white"
              :label="loginLabel"
            />
          </q-card-actions>
          <q-card-section v-if="!register" class="text-center q-pa-sm">
            <a href="">Forgot your password?</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const title = ref('Oculus');
const loginLabel = ref('Login');
const password = ref('');
const isPwd = ref(true);
const email = ref('');
const myForm = ref(null);

const validate = () => {
  myForm.value.validate().then((success) => {
    if (success) {
      $q.dialog({
        title: 'Good',
        message: 'All fields correct',
      }).onOk(() => {
        console.log('OK');
      });
    } else {
      $q.dialog({
        title: 'Failure',
        message: 'Sad',
      })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  });
};

const passwordRequired = (val) =>
  (val && val.length > 0) || 'Password required';
const usernameRequired = (val) =>
  (val && val.length > 0) || 'Username required';
const minPasswordLength = (val) =>
  (val && val.length > 6) || 'Password cannot be less than 6 characters';
</script>

<style lang="scss">
.login-bg {
  background-image: url('../assets/metrics-bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
