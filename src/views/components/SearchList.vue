<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Rechercher"
      outlined
    ></v-text-field>
    <v-list>
      <v-list-item v-for="(item, index) in filteredItems" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox v-model="item.added" :label="'Ajouter'"></v-checkbox>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/SearchListController.ts"
></script>

<style scoped></style>
