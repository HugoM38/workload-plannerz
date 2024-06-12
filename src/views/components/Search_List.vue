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

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "SearchList",
  setup() {
    const searchQuery = ref("");
    const items = ref([
      { text: "Item 1", added: false },
      { text: "Item 2", added: false },
      { text: "Item 3", added: false },
      { text: "Item 4", added: false },
    ]);

    const filteredItems = computed(() => {
      if (!searchQuery.value) {
        return items.value;
      }
      return items.value.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      searchQuery,
      items,
      filteredItems,
    };
  },
});
</script>

<style scoped></style>
