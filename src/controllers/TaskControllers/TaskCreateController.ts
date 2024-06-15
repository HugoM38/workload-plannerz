import { defineComponent, ref } from "vue";
import TaskForm from "@/views/components/TaskForm.vue";

export default defineComponent({
  name: "TaskPage",
  components: {
    TaskForm,
  },
  setup() {
    const taskName = ref("");
    const taskDescription = ref("");
    const priority = ref("");
    const dueDate = ref("");

    const submitTask = () => {
      console.log("Tache crée");
      console.log("Nom:", taskName.value);
      console.log("Description:", taskDescription.value);
      console.log("Priorité:", priority.value);
      console.log("Date d'échéance:", dueDate.value);
    };

    return {
      taskName,
      taskDescription,
      priority,
      dueDate,
      submitTask,
    };
  },
});
