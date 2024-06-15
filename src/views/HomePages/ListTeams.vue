<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in items" :key="index" cols="12">
        <ListItem :text="item.name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/ListTeamsController.ts"
></script>

<style scoped></style>
