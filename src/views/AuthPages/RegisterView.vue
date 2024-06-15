<template>
  <v-app id="app">
    <v-container class="register-container" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" lg="4">
          <v-card class="register-box" elevation="10">
            <v-card-title class="headline title">Register</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  label="First Name"
                  v-model="form.firstname"
                  required
                  outlined
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  label="Last Name"
                  v-model="form.lastname"
                  required
                  outlined
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  label="Job"
                  v-model="form.job"
                  required
                  outlined
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  v-model="form.email"
                  required
                  outlined
                  type="email"
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="form.password"
                  required
                  outlined
                  type="password"
                  class="input-field"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  large
                  class="register-btn"
                  >Register</v-btn
                >
              </v-form>
              <v-divider class="my-4"></v-divider>
              <div class="switch-link">
                Already have an account?
                <router-link to="/login">
                  <v-btn text color="primary">Login</v-btn>
                </router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <router-view />
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/AuthControllers/RegisterController.ts"
></script>
<style src="@/styles/RegisterStyle.css"></style>
