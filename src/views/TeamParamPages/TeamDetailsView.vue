<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container>
        <v-card class="bg-accent text-on-accent">
          <v-card-title>
            <h1>Détails de l'équipe</h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Nom de l'équipe</v-list-item-title>
                    <v-list-item-subtitle>{{ team.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Propriétaire</v-list-item-title>
                    <v-list-item-subtitle>{{
                      `${owner.firstname || ""} ${owner.lastname || ""}`
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-row justify="center">
                <v-col cols="12" md="8" lg="6">
                  <v-card class="member-card">
                    <v-card-title>Membres de l'équipe</v-card-title>
                    <v-card-text class="member-card-content">
                      <v-list>
                        <v-list-item
                          v-for="(member, index) in members"
                          :key="index"
                        >
                          <v-row
                            align="center"
                            justify="space-between"
                            no-gutters
                          >
                            <v-col>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ member.firstname }}
                                  {{ member.lastname }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ member.email }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-col>
                            <v-col cols="auto">
                              <v-list-item-action>
                                <v-btn
                                  color="primary"
                                  @click="viewTasks(member._id)"
                                  >Voir</v-btn
                                >
                              </v-list-item-action>
                            </v-col>
                          </v-row>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-col cols="12">
                <v-row justify="center">
                  <v-col cols="12" md="6" lg="4">
                    <v-card class="task-card my-tasks-card">
                      <v-card-title>Mes Tâches</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <v-list-item
                            v-for="(task, index) in sortedUserTasks"
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
                  <v-col cols="12" md="6" lg="4">
                    <v-card class="task-card unassigned-tasks-card">
                      <v-card-title>Tâches en Attente</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <v-list-item
                            v-for="(task, index) in sortedUnownedTasks"
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
                  <v-col cols="12" md="6" lg="4">
                    <v-card class="task-card assigned-tasks-card">
                      <v-card-title>Tâches Assignées</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <v-list-item
                            v-for="(task, index) in sortedOwnedTasks"
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

        <v-btn
          color="accent"
          @click="navigateToCreateTask"
          class="create-task-btn"
        >
          Créer
        </v-btn>

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
                Attribué à: {{ getOwnerName(selectedTask.owner) }}
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
  src="@/controllers/TeamControllers/TeamDetailsController.ts"
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

.member-card {
  background-color: #c6c5c5;
  border: 4px solid #dd7373;
}

.member-card-content {
  margin-bottom: 24px;
  max-height: 200px;
  overflow-y: auto;
}

.member-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
}

.member-list-item:last-child {
  border-bottom: none;
}

.my-tasks-card {
  background-color: #c6c5c5;
  border: 4px solid #e2c044;
}

.unassigned-tasks-card {
  background-color: #c6c5c5;
  border: 4px solid #a64253;
}

.assigned-tasks-card {
  background-color: #c6c5c5;
  border: 4px solid #d56aa0;
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
  background-color: #fff3e0;
}

.task-completed {
  background-color: #e8f5e9;
}

.create-task-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
