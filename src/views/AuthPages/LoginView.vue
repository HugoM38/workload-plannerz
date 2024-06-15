<template>
  <v-app id="app">
    <v-container class="login-container" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" lg="4">
          <v-card class="login-box" elevation="10">
            <v-card-title class="headline title">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  label="Email"
                  v-model="form.email"
                  required
                  type="email"
                  outlined
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="form.password"
                  required
                  type="password"
                  outlined
                  class="input-field"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  large
                  class="login-btn"
                  >Login</v-btn
                >
              </v-form>
              <v-divider class="my-4"></v-divider>
              <div class="switch-link">
                Don't have an account?
                <router-link to="/register">
                  <v-btn text color="primary">Register</v-btn>
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
  src="@/controllers/AuthControllers/LoginController.ts"
></script>

<style src="@/styles/LoginStyle.css"></style>
