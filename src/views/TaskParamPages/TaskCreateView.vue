<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container>
        <v-card class="mt-5 bg-accent text-on-accent">
          <v-card-title>
            <h1>Créer une Tâche</h1>
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
                  :class="{ 'bg-primary': form.selectedMember === member._id }"
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
                v-model:taskName="form.taskName"
                v-model:priority="form.priority"
                v-model:dueDate="form.dueDate"
                v-model:timeEstimation="form.timeEstimation"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="mt-3 btn bg-primary" @click="submitTask">
              Créer la tâche
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
  src="@/controllers/TaskControllers/TaskCreateController.ts"
></script>

<style scoped>
.justify-center {
  justify-content: center;
}

.btn {
  border-radius: 8px;
  font-weight: bold;
  margin-bottom: 4em;
}

.member-list {
  border-radius: 8px;
  border: 4px solid #0f8b8d;
  max-height: 200px;
  overflow-y: auto;
}

.align-center {
  align-items: center;
}

.fill-height {
  min-height: 100vh;
}

.text-center {
  text-align: center;
}
</style>
