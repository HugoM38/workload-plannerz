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

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--v-theme-primary);
}

.login-box {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 400px;
}

.login-box:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.title {
  color: var(--v-theme-on-accent);
  text-align: center;
  margin-bottom: 20px;
}

.input-field {
  background-color: var(--v-theme-surface);
  border-radius: 8px;
  margin-bottom: 20px;
}

.login-btn {
  background-color: var(--v-theme-primary);
  color: var(--v-theme-on-primary);
  border-radius: 8px;
  padding: 10px;
  font-weight: bold;
  margin-top: 20px;
}

.switch-link {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--v-theme-on-accent);
  margin-top: 20px;
}

.register-btn {
  margin-left: 10px;
  color: var(--v-theme-secondary);
}
</style>
