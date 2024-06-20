<template>
  <v-app id="app">
    <v-container class="register-container bg-primary" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" lg="4">
          <v-card class="register-box bg-accent text-on-accent" elevation="10">
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-text-field
                  label="Prénom"
                  v-model="form.firstname"
                  required
                  outlined
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  label="Nom"
                  v-model="form.lastname"
                  required
                  outlined
                  class="input-field"
                ></v-text-field>
                <v-text-field
                  label="Métier"
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
                  label="Mot de passe"
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
                  >S'inscrire</v-btn
                >
              </v-form>
              <v-divider class="my-4"></v-divider>
              <div class="switch-link">
                Vous avez déjà un compte ?
                <router-link to="/login">
                  <v-btn color="secondary">Connexion</v-btn>
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
  src="@/controllers/AuthControllers/RegisterController.ts"
></script>

<style scoped src="@/styles/AuthStyles/Register.css"></style>
