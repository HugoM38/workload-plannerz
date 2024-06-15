import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TeamForm",
  setup() {
    const groupName = ref("");
    return {
      groupName,
    };
  },
});
