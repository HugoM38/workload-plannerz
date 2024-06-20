<template>
  <v-form>
    <v-text-field
      v-if="!isUpdateMode"
      v-model="localTaskName"
      label="Nom"
      outlined
    ></v-text-field>

    <v-select
      v-model="localPriority"
      :items="priorityLevels"
      label="Niveau de priorité"
      outlined
    ></v-select>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      attach="body"
    >
      <template v-slot:activator="{}">
        <v-text-field
          ref="dateField"
          v-model="formattedDueDate"
          label="Date d'échéance"
          outlined
          readonly
          @click="toggleMenu"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="localDueDate"
        @input="handleDateInput"
      ></v-date-picker>
    </v-menu>

    <v-text-field
      v-model="localTimeEstimation"
      label="Estimation du temps (heures)"
      outlined
      type="number"
      min="0"
      @input="handleInput"
    ></v-text-field>
  </v-form>
</template>

<script
  lang="ts"
  src="@/controllers/TaskControllers/TaskFormController.ts"
></script>

<style scoped src="@/styles/ComponentsStyles/TaskForm.css"></style>
