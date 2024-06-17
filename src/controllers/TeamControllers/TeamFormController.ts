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

    watch(
      () => props.name,
      (newName) => {
        localTeamName.value = newName;
      }
    );

    return {
      localTeamName,
    };
  },
});
