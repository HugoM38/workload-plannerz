<template>
  <v-form>
    <!-- Nom de la tâche -->
    <v-text-field v-model="localTaskName" label="Nom" outlined></v-text-field>

    <!-- Description de la tâche -->
    <v-textarea
      v-model="localTaskDescription"
      label="Description"
      outlined
    ></v-textarea>

    <!-- Niveau de priorité -->
    <v-select
      v-model="localPriority"
      :items="priorityLevels"
      label="Niveau de priorité"
      outlined
    ></v-select>

    <!-- Date d'échéance -->
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="localDueDate"
          label="Date d'échéance"
          outlined
          readonly
          v-bind="attrs"
          v-on="on"
          @click="menu = !menu"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="localDueDate"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TaskForm",
  props: {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localTaskName = ref(props.taskName);
    const localTaskDescription = ref(props.taskDescription);
    const localPriority = ref(props.priority);
    const localDueDate = ref(props.dueDate || null); // Initialisation à la date d'aujourd'hui
    const menu = ref(false);
    const priorityLevels = ref(["Faible", "Moyenne", "Haute"]);

    // Mettre à jour les props à chaque changement local
    watch(localTaskName, (newValue) => emit("update:taskName", newValue));
    watch(localTaskDescription, (newValue) =>
      emit("update:taskDescription", newValue)
    );
    watch(localPriority, (newValue) => emit("update:priority", newValue));
    watch(localDueDate, (newValue) => emit("update:dueDate", newValue));

    return {
      localTaskName,
      localTaskDescription,
      localPriority,
      localDueDate,
      menu,
      priorityLevels,
    };
  },
});
</script>

<style scoped></style>
