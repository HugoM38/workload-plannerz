import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TeamFormController",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localTeamName = ref(props.name);

    watch(localTeamName, (newValue) => {
      emit("update:name", newValue);
    });

    return {
      localTeamName,
    };
  },
});
