<template>
  <v-app>
    <v-main class="bg-primary">
      <v-container>
        <v-card class="bg-accent text-on-accent">
          <v-card-title class="d-flex justify-space-between align-center">
            <h1>Détails de l'équipe</h1>
            <v-btn
              v-if="isOwner()"
              color="primary"
              class="d-none d-md-inline-flex"
              @click="navigateToEditTeam"
            >
              Modifier
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-btn
              v-if="isOwner()"
              color="primary"
              class="d-inline-flex d-md-none mb-4"
              @click="navigateToEditTeam"
            >
              Modifier
            </v-btn>
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
              <!-- Nouvelle section pour afficher le workload de l'équipe -->
              <v-col cols="12">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Charge de travail totale de l'équipe</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >{{ teamWorkload }} heure(s)</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <!-- Fin de la nouvelle section -->
              <v-row justify="center">
                <v-col cols="12" md="8" lg="6">
                  <v-card class="member-card">
                    <v-card-title>Membres de l'équipe</v-card-title>
                    <v-card-text class="member-card-content">
                      <v-list class="member-list">
                        <v-list-item
                          v-for="(member, index) in members"
                          :key="index"
                          class="member-list-item"
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
              <v-col cols="12">
                <v-row justify="center">
                  <v-col cols="12" md="6" lg="4">
                    <v-card class="task-card my-tasks-card">
                      <v-card-title>Mes Tâches</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <template
                            v-for="(task, index) in sortedUserTasks"
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
                                    <v-list-item-title>
                                      {{ task.name }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                      Priorité: {{ task.priority }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-col>
                                <v-col cols="auto">
                                  <v-list-item-content>
                                    <v-list-item-subtitle>
                                      {{ formatDate(task.dueDate) }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-col>
                              </v-row>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6" lg="4">
                    <v-card class="task-card unassigned-tasks-card">
                      <v-card-title>Tâches non Assignées</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <template
                            v-for="(task, index) in sortedUnownedTasks"
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
                                    <v-list-item-title>
                                      {{ task.name }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                      Priorité: {{ task.priority }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-col>
                                <v-col cols="auto">
                                  <v-list-item-content>
                                    <v-list-item-subtitle>
                                      {{ formatDate(task.dueDate) }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-col>
                              </v-row>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6" lg="4">
                    <v-card class="task-card assigned-tasks-card">
                      <v-card-title>Tâches Assignées</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <template
                            v-for="(task, index) in sortedOwnedTasks"
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
                                    <v-list-item-title>
                                      {{ task.name }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                      Priorité: {{ task.priority }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-col>
                                <v-col cols="auto">
                                  <v-list-item-content>
                                    <v-list-item-subtitle>
                                      {{ formatDate(task.dueDate) }}
                                    </v-list-item-subtitle>
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
              <v-list-item-subtitle v-if="selectedTask!.owner">
                Attribué à:
                {{ getOwnerName(selectedTask!.owner) }}
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
                v-if="selectedTask?.state !== 'Validée'"
                color="primary"
                @click="navigateToUpdateTask(selectedTask!)"
                >Modifier</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                v-if="selectedTask?.state !== 'Validée'"
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
  src="@/controllers/TeamControllers/TeamDetailsController.ts"
></script>

<style scoped src="@/styles/TeamStyles/TeamDetails.css"></style>
