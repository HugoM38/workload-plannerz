<template>
  <v-app>
    <v-main>
      <v-container>
        <GroupForm />
        <SearchList />
        <v-btn color="primary" @click="create_group">Créer</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GroupForm from "../components/Group_Form.vue";
import SearchList from "../components/Search_List.vue";

export default defineComponent({
  name: "GroupeCreation",
  components: {
    GroupForm,
    SearchList,
  },
  methods: {
    create_group() {
      console.log("Créer le groupe");
    },
  },
});
</script>

<style scoped></style>
