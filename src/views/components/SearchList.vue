<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Rechercher"
      outlined
      class="bg-accent text-on-accent mb-4"
    ></v-text-field>
    <h2>Membres de l'équipe</h2>
    <v-list class="member-list">
      <v-list-item
        v-for="(member, index) in filteredTeamMembers"
        :key="index"
        class="member-list-item"
      >
        <v-list-item-content>
          <v-list-item-title
            >{{ member.firstname }} {{ member.lastname }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="error" @click="removeMember(member)">Retirer</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <h2>Non-membres de l'équipe</h2>
    <v-list class="member-list">
      <v-list-item
        v-for="(nonMember, index) in filteredNonMembers"
        :key="index"
        class="member-list-item"
      >
        <v-list-item-content>
          <v-list-item-title
            >{{ nonMember.firstname }}
            {{ nonMember.lastname }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="primary" @click="addMember(nonMember)">Ajouter</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-snackbar v-model="snackbar" :timeout="6000" top>
      {{ error }}
      <v-btn color="red" @click="snackbar = false">Fermer</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script
  lang="ts"
  src="@/controllers/TeamControllers/SearchListController.ts"
></script>

<style scoped>
.member-list {
  background-color: inherit;
  padding: 8px;
}

.member-list-item {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff3e0;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
