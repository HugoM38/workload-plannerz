<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
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
                      `${owner.firstname} ${owner.lastname}`
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
                <v-subheader>Membres de l'équipe</v-subheader>
                <v-list>
                  <v-list-item v-for="(member, index) in members" :key="index">
                    <v-row align="center" justify="space-between" no-gutters>
                      <v-col>
                        <v-list-item-content>
                          <v-list-item-title
                            >{{ member.firstname }}
                            {{ member.lastname }}</v-list-item-title
                          >
                          <v-list-item-subtitle>{{
                            member.email
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-col>
                      <v-col cols="auto">
                        <v-list-item-action>
                          <v-btn color="primary" @click="viewTasks(member._id)"
                            >Voir les tâches</v-btn
                          >
                        </v-list-item-action>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="4">
                    <v-card class="task-card my-tasks-card">
                      <v-card-title>Mes Tâches</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <v-list-item
                            v-for="(task, index) in userTasks"
                            :key="index"
                            :class="
                              task.state === 'En cours'
                                ? 'task-in-progress'
                                : 'task-completed'
                            "
                            class="task-list-item"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{
                                task.name
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Priorité:
                                {{ task.priority }}</v-list-item-subtitle
                              >
                              <v-list-item-subtitle>
                                État: {{ task.state }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-if="task.owner">
                                Attribué à: {{ getOwnerName(task.owner) }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                Date de fin: {{ formatDate(task.dueDate) }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card class="task-card unassigned-tasks-card">
                      <v-card-title>Tâches en Attente</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <v-list-item
                            v-for="(task, index) in unownedTasks"
                            :key="index"
                            :class="
                              task.state === 'En cours'
                                ? 'task-in-progress'
                                : 'task-completed'
                            "
                            class="task-list-item"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{
                                task.name
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Priorité:
                                {{ task.priority }}</v-list-item-subtitle
                              >
                              <v-list-item-subtitle>
                                État: {{ task.state }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                Date de fin: {{ formatDate(task.dueDate) }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card class="task-card assigned-tasks-card">
                      <v-card-title>Tâches Assignées</v-card-title>
                      <v-card-text class="task-card-content">
                        <v-list dense class="task-list">
                          <v-list-item
                            v-for="(task, index) in ownedTasks"
                            :key="index"
                            :class="
                              task.state === 'En cours'
                                ? 'task-in-progress'
                                : 'task-completed'
                            "
                            class="task-list-item"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{
                                task.name
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Priorité:
                                {{ task.priority }}</v-list-item-subtitle
                              >
                              <v-list-item-subtitle>
                                État: {{ task.state }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle v-if="task.owner">
                                Attribué à: {{ getOwnerName(task.owner) }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                Date de fin: {{ formatDate(task.dueDate) }}
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
          color="primary"
          @click="navigateToCreateTask"
          class="create-task-btn"
        >
          Créer une tâche
        </v-btn>
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
.task-card {
  height: 400px;
  overflow-y: auto;
}

.task-card-content {
  height: calc(100% - 64px);
  overflow-y: auto;
}

.my-tasks-card {
  background-color: #e0f7fa;
}

.unassigned-tasks-card {
  background-color: #ffcc80;
}

.assigned-tasks-card {
  background-color: #f8bbd0;
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

/* Position the create task button at the bottom right */
.create-task-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
