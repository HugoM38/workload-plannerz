<template>
  <v-form>
    <!-- Nom de la tâche -->
    <v-text-field v-model="localTaskName" label="Nom" outlined></v-text-field>

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
          v-model="formattedDueDate"
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

<script
  lang="ts"
  src="@/controllers/TaskControllers/TaskFormController.ts"
></script>

<style scoped></style>
