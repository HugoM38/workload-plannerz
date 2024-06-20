<template>
  <v-app id="app">
    <v-container class="login-container bg-primary" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" lg="4">
          <v-card class="login-box bg-accent text-on-accent" elevation="10">
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
                  label="Mot de passe"
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
                  >Connexion</v-btn
                >
              </v-form>
              <v-divider class="my-4"></v-divider>
              <div class="switch-link">
                Vous n'avez pas de compte ?
                <router-link to="/register">
                  <v-btn color="secondary" class="register-btn"
                    >S'inscrire</v-btn
                  >
                </router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="6000" top>
        {{ error }}
        <v-btn color="red" @click="snackbar = false">Fermer</v-btn>
      </v-snackbar>
    </v-container>
    <router-view />
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/AuthControllers/LoginController.ts"
></script>

<style scoped src="@/styles/AuthStyles/Login.css"></style>
