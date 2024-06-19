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
      type: [String, Number],
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    timeEstimation: {
      type: Number,
      required: false,
      default: 0,
    },
    isUpdateMode: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localTaskName = ref(props.taskName);
    const localTaskDescription = ref(props.taskDescription);
    const localPriority = ref(props.priority);
    const localDueDate = ref(new Date(props.dueDate)); // Convertir la chaîne en objet Date
    const formattedDueDate = ref(localDueDate.value.toLocaleDateString());
    const localTimeEstimation = ref(props.timeEstimation);
    const menu = ref(false);
    const priorityLevels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    watch(localTaskName, (newValue) => emit("update:taskName", newValue));
    watch(localTaskDescription, (newValue) =>
      emit("update:taskDescription", newValue)
    );
    watch(localPriority, (newValue) => emit("update:priority", newValue));
    watch(localDueDate, (newValue) => {
      emit("update:dueDate", newValue.toISOString().substr(0, 10)); // Convertir l'objet Date en chaîne ISO
      formattedDueDate.value = newValue.toLocaleDateString();
    });
    watch(localTimeEstimation, (newValue) =>
      emit("update:timeEstimation", newValue)
    );

    return {
      localTaskName,
      localTaskDescription,
      localPriority,
      localDueDate,
      formattedDueDate,
      localTimeEstimation,
      menu,
      priorityLevels,
    };
  },
});
