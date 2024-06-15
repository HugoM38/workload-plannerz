<template>
  <v-card class="ma-2">
    <v-card-text>
      {{ text }}
      <v-btn class="ml-4" color="primary" @click="viewGroup"
        >Voir le groupe</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/ListItemTeamsController.ts"
></script>

<style scoped></style>
