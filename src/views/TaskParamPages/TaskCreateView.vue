<template>
  <v-app>
    <v-main>
      <v-container>
        <TaskForm
          v-model:taskName="taskName"
          v-model:taskDescription="taskDescription"
          v-model:priority="priority"
          v-model:dueDate="dueDate"
        />
        <v-btn @click="submitTask">Créer la tache</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TaskControllers/TaskCreateController.ts"
></script>

<style scoped></style>
