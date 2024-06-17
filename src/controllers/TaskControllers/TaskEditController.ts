import { defineComponent, ref } from "vue";
import TaskForm from "@/views/components/TaskForm.vue";

export default defineComponent({
  name: "TaskPage",
  components: {
    TaskForm,
  },
  setup() {
    const taskName = ref("");
    const priority = ref("");
    const dueDate = ref("");

    const submitTask = () => {
      console.log("Tache modifiée");
      console.log("Nom:", taskName.value);
      console.log("Priorité:", priority.value);
      console.log("Date d'échéance:", dueDate.value);
    };

    return {
      taskName,
      priority,
      dueDate,
      submitTask,
    };
  },
});
