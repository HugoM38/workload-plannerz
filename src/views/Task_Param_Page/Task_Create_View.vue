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

<script lang="ts">
import { defineComponent, ref } from "vue";
import TaskForm from "../components/Task_Form.vue";

export default defineComponent({
  name: "TaskPage",
  components: {
    TaskForm,
  },
  setup() {
    const taskName = ref("");
    const taskDescription = ref("");
    const priority = ref("");
    const dueDate = ref("");

    const submitTask = () => {
      console.log("Tache crée");
      console.log("Nom:", taskName.value);
      console.log("Description:", taskDescription.value);
      console.log("Priorité:", priority.value);
      console.log("Date d'échéance:", dueDate.value);
    };

    return {
      taskName,
      taskDescription,
      priority,
      dueDate,
      submitTask,
    };
  },
});
</script>

<style scoped></style>
