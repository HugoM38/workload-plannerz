<template>
  <v-app>
    <v-main>
      <h1>Éditer le groupe</h1>
      <v-container>
        <TeamForm :name="team.name" @update:name="updateGroupName" />
        <v-btn color="primary" @click="editGroup">Modifier</v-btn>
        <SearchList
          :teamMembers="teamMembers"
          :nonMembers="nonMembers"
          @update:teamMembers="updateTeamMembers"
          @update:nonMembers="updateNonMembers"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/TeamEditController.ts"
></script>

<style scoped></style>
