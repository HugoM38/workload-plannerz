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
