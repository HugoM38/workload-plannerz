<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container>
        <v-card class="bg-accent text-on-accent">
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
                <v-radio-group v-model="sortOption">
                  <v-radio
                    label="Trier par date de rendu"
                    value="dueDate"
                  ></v-radio>
                  <v-radio
                    label="Trier par priorité"
                    value="priority"
                  ></v-radio>
                </v-radio-group>
                <v-checkbox
                  v-model="hideCompleted"
                  label="Cacher les tâches terminées"
                ></v-checkbox>
              </v-col>
              <v-row justify="center">
                <v-col cols="12" md="8" lg="6">
                  <v-card class="member-tasks-card">
                    <v-card-title>Tâches de l'utilisateur</v-card-title>
                    <v-card-text class="task-card-content">
                      <v-list dense class="task-list">
                        <template
                          v-for="(task, index) in sortedTasks"
                          :key="index"
                        >
                          <v-list-item
                            v-if="!hideCompleted || task.state !== 'Validée'"
                            :class="
                              task.state === 'En cours'
                                ? 'task-in-progress'
                                : 'task-completed'
                            "
                            class="task-list-item"
                            @click="openTaskDialog(task)"
                          >
                            <v-row align="center" no-gutters>
                              <v-col>
                                <v-list-item-content>
                                  <v-list-item-title>{{
                                    task.name
                                  }}</v-list-item-title>
                                  <v-list-item-subtitle
                                    >Priorité:
                                    {{ task.priority }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>
                              </v-col>
                              <v-col cols="auto">
                                <v-list-item-content>
                                  <v-list-item-subtitle>{{
                                    formatDate(task.dueDate)
                                  }}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-col>
                            </v-row>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-row>
          </v-card-text>
        </v-card>

        <v-dialog v-model="taskDialog" max-width="500px">
          <v-card class="bg-accent text-on-accent">
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
              <v-btn
                color="green darken-1"
                @click="closeTask(selectedTask!._id)"
                >Terminer la tâche</v-btn
              >
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

.task-card-content {
  height: calc(100% - 64px);
  overflow-y: auto;
}

.member-tasks-card {
  background-color: #c6c5c5;
  border: 4px solid #e0f7fa;
  height: 420px;
  overflow-y: auto;
  margin-bottom: 24px;
}

.task-list {
  background-color: inherit;
  border-radius: 8px;
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
  background-color: #e1c392;
}

.task-completed {
  background-color: #89e661;
}

.create-task-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
