<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container>
        <v-card class="mt-5 bg-accent text-on-accent">
          <v-card-title>
            <h1>Modifier une Tâche</h1>
          </v-card-title>
          <v-card-text>
            <h2>Attribuer la Tâche à un Membre</h2>
            <v-list class="bg-accent member-list">
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
                  :class="{ 'bg-primary': selectedMember === member._id }"
                  class="member-item"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{
                      `${member.firstname} ${member.lastname}`
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      member.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>

            <v-form class="mt-5">
              <TaskForm
                v-model:taskName="task.name"
                v-model:priority="task.priority"
                v-model:dueDate="task.dueDate"
                v-model:timeEstimation="task.timeEstimation"
                :showBasicFieldsOnly="true"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="mt-3 btn bg-primary" @click="updateTask">
              Mettre à jour la tâche
            </v-btn>
          </v-card-actions>
        </v-card>

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
  src="@/controllers/TaskControllers/TaskEditController.ts"
></script>

<style scoped src="@/styles/TaskStyles/TaskEdit.css"></style>
