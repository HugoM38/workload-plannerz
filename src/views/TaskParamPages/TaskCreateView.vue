<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Carte unique pour l'attribution et la création de tâche -->
        <v-card class="mt-5">
          <v-card-title>
            <h1>Créer une Tâche</h1>
          </v-card-title>
          <v-card-text>
            <!-- Section d'attribution de tâche -->
            <h2>Attribuer la Tâche à un Membre</h2>
            <v-list>
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <template v-else>
                <v-list-item
                  v-for="(member, index) in members"
                  :key="index"
                  @click="selectMember(member)"
                  :class="{ 'selected-member': selectedMember === member._id }"
                  class="member-item"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ member.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      member.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>

            <!-- Section de création de tâche -->
            <v-form class="mt-5">
              <TaskForm
                v-model:taskName="taskName"
                v-model:priority="priority"
                v-model:dueDate="dueDate"
              />
            </v-form>

            <!-- Section to display the task data being sent -->
            <h2 class="mt-5">Données de la Tâche</h2>
            <pre>{{ formattedTaskData }}</pre>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mt-3" @click="submitTask" color="primary">
              Créer la tâche
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Snackbar pour les erreurs -->
        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ error }}
          <v-btn color="red" @click="snackbar = false">Fermer</v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TaskControllers/TaskCreateController.ts"
></script>

<style scoped>
@import "@/styles/TaskStyle.css";
</style>
