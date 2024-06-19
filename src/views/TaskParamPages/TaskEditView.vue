<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card class="mt-5">
          <v-card-title>
            <h1>Modifier une Tâche</h1>
          </v-card-title>
          <v-card-text>
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

            <v-form class="mt-5">
              <TaskForm
                v-model:taskName="task.name"
                v-model:taskDescription="task.description"
                v-model:priority="task.priority"
                v-model:dueDate="task.dueDate"
                :showBasicFieldsOnly="true"
              />
            </v-form>

            <div class="text-center mt-5">
              <h2>Données de la Tâche</h2>
              <pre>{{ formattedTaskData }}</pre>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mt-3" @click="updateTask" color="primary">
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

<style scoped>
.selected-member {
  background-color: #e0e0e0;
}

.justify-center {
  justify-content: center;
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
