<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title>
            <h1>{{ `${member.firstname || ""} ${member.lastname || ""}` }}</h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{
                      member.email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="4">
                    <v-card class="task-card member-tasks-card">
                      <v-card-title>Mes Tâches</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <v-list-item
                            v-for="(task, index) in sortedTasks"
                            :key="index"
                            :class="
                              task.state === 'En cours'
                                ? 'task-in-progress'
                                : 'task-completed'
                            "
                            class="task-list-item"
                            @click="openTaskDialog(task)"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{
                                task.name
                              }}</v-list-item-title>
                              <v-list-item-subtitle>
                                Priorité: {{ task.priority }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-dialog v-model="taskDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              {{ selectedTask?.name }}
            </v-card-title>
            <v-card-text>
              <v-list-item-subtitle>
                Priorité: {{ selectedTask?.priority }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                État: {{ selectedTask?.state }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="selectedTask?.owner">
                Attribué à: {{ member.firstname }} {{ member.lastname }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Date de fin:
                {{
                  selectedTask?.dueDate
                    ? formatDate(selectedTask.dueDate)
                    : "Non définie"
                }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Date de création:
                {{
                  selectedTask?.creationDate
                    ? formatDate(selectedTask.creationDate)
                    : "Non définie"
                }}
              </v-list-item-subtitle>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="taskDialog = false"
                >Fermer</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

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
  src="@/controllers/TaskControllers/TaskMemberController.ts"
></script>

<style scoped>
.v-dialog .v-card-title {
  white-space: normal;
}

.task-card {
  height: 400px;
  overflow-y: auto;
}

.task-card-content {
  height: calc(100% - 64px);
  overflow-y: auto;
}

.member-tasks-card {
  background-color: #e0f7fa;
}

.task-list {
  background-color: inherit;
  padding: 8px;
}

.task-list-item {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #aaa;
  overflow: hidden;
}

.task-list-item > .v-list-item__content {
  border-radius: inherit;
}

.task-in-progress {
  background-color: #fff3e0;
}

.task-completed {
  background-color: #e8f5e9;
}
</style>
