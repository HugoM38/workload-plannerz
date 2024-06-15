import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TaskForm",
  props: {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localTaskName = ref(props.taskName);
    const localTaskDescription = ref(props.taskDescription);
    const localPriority = ref(props.priority);
    const localDueDate = ref(props.dueDate || null); // Initialisation à la date d'aujourd'hui
    const menu = ref(false);
    const priorityLevels = ref(["Faible", "Moyenne", "Haute"]);

    // Mettre à jour les props à chaque changement local
    watch(localTaskName, (newValue) => emit("update:taskName", newValue));
    watch(localTaskDescription, (newValue) =>
      emit("update:taskDescription", newValue)
    );
    watch(localPriority, (newValue) => emit("update:priority", newValue));
    watch(localDueDate, (newValue) => emit("update:dueDate", newValue));

    return {
      localTaskName,
      localTaskDescription,
      localPriority,
      localDueDate,
      menu,
      priorityLevels,
    };
  },
});
