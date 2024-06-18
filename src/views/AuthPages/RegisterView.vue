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
    </v-container>
    <router-view />
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/AuthControllers/RegisterController.ts"
></script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--v-theme-primary);
  padding: 16px;
}

.register-box {
  padding: 24px; /* Augmenter le padding pour plus d'espace interne */
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 500px; /* Augmenter la largeur maximale */
}

.register-box:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.title {
  color: var(--v-theme-on-accent);
  text-align: center;
  margin-bottom: 16px;
}

.input-field {
  background-color: var(--v-theme-surface);
  border-radius: 8px;
  margin-bottom: 16px; /* Augmenter l'espacement entre les champs */
}

.register-btn {
  background-color: var(--v-theme-primary);
  color: var(--v-theme-on-primary);
  border-radius: 8px;
  padding: 10px;
  font-weight: bold;
  margin-top: 24px; /* Augmenter l'espacement avant le bouton */
}

.switch-link {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--v-theme-on-accent);
  margin-top: 24px; /* Augmenter l'espacement avant le lien de connexion */
}

.switch-link .v-btn {
  margin-left: 8px;
}
</style>
