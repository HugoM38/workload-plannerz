import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/axiosConfig";
import TaskForm from "@/views/components/TaskForm.vue";
import { AxiosError } from "axios";

interface Member {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface TaskData {
  name: string;
  priority: string | number;
  dueDate: number;
  team: string | string[];
  owner?: string | null;
  timeEstimation: number;
}

export default defineComponent({
  name: "TaskUpdatePage",
  components: {
    TaskForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const task = ref({
      name: "",
      priority: "0",
      dueDate: new Date().toISOString().substr(0, 10),
      timeEstimation: 0,
    });

    const selectedMember = ref("");
    const members = ref<{ _id: string; name: string; email: string }[]>([]);
    const loading = ref(true);
    const error = ref("");
    const snackbar = ref(false);
    const taskData = route.params.taskData as string;
    const teamId = route.params.teamId as string;

    const fetchMembers = async (teamId: string) => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await axiosInstance.get(`/teams/${teamId}/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && Array.isArray(response.data)) {
          members.value = response.data.map((member: Member) => ({
            _id: member._id,
            name: `${member.firstname} ${member.lastname}`,
            email: member.email,
          }));
          console.log("Team Members:", members.value);
        } else {
          console.error(
            "Erreur: La réponse des membres n'est pas valide",
            response.data
          );
        }
      } catch (err) {
        const errorResponse = err as AxiosError<any>;
        if (errorResponse.response && errorResponse.response.data) {
          error.value =
            errorResponse.response.data.message || "An error occurred";
        } else if (errorResponse.request) {
          error.value = "No response received from server";
        } else {
          error.value = errorResponse.message || "An error occurred";
        }
        snackbar.value = true;
      } finally {
        loading.value = false;
      }
    };

    const selectMember = (member: { _id: string }) => {
      selectedMember.value =
        selectedMember.value === member._id ? "" : member._id;
    };

    const taskDataDecoded = computed(() => {
      try {
        const decodedTaskData = decodeURIComponent(atob(taskData));
        return JSON.parse(decodedTaskData);
      } catch (error) {
        console.error("Erreur lors du décodage des données de la tâche", error);
        return null;
      }
    });

    onMounted(() => {
      if (taskDataDecoded.value) {
        task.value.name = taskDataDecoded.value.name;
        task.value.priority = taskDataDecoded.value.priority.toString();
        task.value.dueDate = new Date(taskDataDecoded.value.dueDate)
          .toISOString()
          .substr(0, 10);
        task.value.timeEstimation = taskDataDecoded.value.timeEstimation || 0;
        selectedMember.value = taskDataDecoded.value.owner || "";
      }
      if (teamId) {
        fetchMembers(teamId);
      } else {
        loading.value = false;
      }
    });

    const taskFormData = computed(() => {
      // Ajuster le calcul du timestamp pour corriger le décalage d'un jour
      const dueDateTimestamp = new Date(task.value.dueDate).setHours(
        0,
        0,
        0,
        0
      );
      return {
        name: task.value.name,
        priority: task.value.priority,
        dueDate: dueDateTimestamp,
        team: teamId,
        timeEstimation: task.value.timeEstimation,
      };
    });

    const formattedTaskData = computed((): string => {
      const data: TaskData = { ...taskFormData.value };
      if (selectedMember.value) {
        data.owner = selectedMember.value;
      }
      return JSON.stringify(data, null, 2);
    });

    const updateTask = async () => {
      const token = localStorage.getItem("token") || "";
      const taskId = taskDataDecoded.value._id;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        console.log("Request Data:", taskFormData.value);

        // Mise à jour de la priorité
        await axiosInstance.patch(
          `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/priority`,
          { priority: task.value.priority },
          { headers }
        );

        // Mise à jour de la date d'échéance
        await axiosInstance.patch(
          `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/dueDate`,
          { dueDate: taskFormData.value.dueDate },
          { headers }
        );

        // Mise à jour du propriétaire
        if (selectedMember.value) {
          await axiosInstance.patch(
            `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/owner`,
            { ownerId: selectedMember.value },
            { headers }
          );
        }

        // Mise à jour de l'estimation de temps
        await axiosInstance.patch(
          `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/timeEstimation`,
          { timeEstimation: task.value.timeEstimation },
          { headers }
        );

        console.log("Tâche mise à jour avec succès");
        router.push("/");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la tâche", error);
        snackbar.value = true;
      }
    };

    return {
      task,
      updateTask,
      selectedMember,
      selectMember,
      members,
      loading,
      error,
      snackbar,
      formattedTaskData,
    };
  },
});
