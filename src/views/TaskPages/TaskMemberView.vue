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
              <!-- Nouvelle section pour afficher le workload du membre -->
              <v-col cols="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Charge de travail de l'utilisateur</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >{{ memberWorkload }} heure(s)</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <!-- Fin de la nouvelle section -->
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
            <v-card-title class="d-flex justify-space-between align-center">
              <span class="headline">{{ selectedTask?.name }}</span>
              <v-btn
                class="bg-accent"
                icon
                @click="deleteTask(selectedTask!._id)"
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list-item-subtitle>
                Priorité: {{ selectedTask?.priority }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                État: {{ selectedTask?.state }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Date de fin:
                {{ formatDate(selectedTask!.dueDate) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Date de création:
                {{ formatDate(selectedTask!.creationDate) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Temps estimé:
                {{ selectedTask!.timeEstimation }} heure(s)
              </v-list-item-subtitle>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="navigateToUpdateTask(selectedTask!._id)"
                >Modifier</v-btn
              >
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

<style scoped src="@/styles/TaskStyles/TaskMember.css"></style>
