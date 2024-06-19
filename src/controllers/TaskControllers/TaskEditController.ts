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
  dueDate: string;
  description: string;
  team: string | string[];
  owner?: string | null;
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
      description: "",
      priority: "0",
      dueDate: new Date().toISOString().substr(0, 10),
    });

    const selectedMember = ref("");
    const members = ref<{ _id: string; name: string; email: string }[]>([]);
    const loading = ref(true);
    const error = ref("");
    const snackbar = ref(false);
    const taskData = route.params.taskData as string;
    const teamId = route.params.teamId as string;

    const fetchTaskDetails = async (taskId: string) => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await axiosInstance.get(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          task.value.name = response.data.name;
          task.value.description = response.data.description;
          task.value.priority = response.data.priority.toString();
          task.value.dueDate = new Date(response.data.dueDate)
            .toISOString()
            .substr(0, 10);
          selectedMember.value = response.data.owner || "";
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
        task.value.description = taskDataDecoded.value.description;
        task.value.priority = taskDataDecoded.value.priority.toString();
        task.value.dueDate = new Date(taskDataDecoded.value.dueDate)
          .toISOString()
          .substr(0, 10);
        selectedMember.value = taskDataDecoded.value.owner || "";
      }
      if (teamId) {
        fetchMembers(teamId);
      } else {
        loading.value = false;
      }
    });

    const taskFormData = computed(() => {
      const dueDateISO = new Date(task.value.dueDate).toISOString();
      return {
        name: task.value.name,
        description: task.value.description,
        priority: task.value.priority,
        dueDate: dueDateISO,
        team: teamId,
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
      try {
        const token = localStorage.getItem("token") || "";

        if (task.value.priority) {
          await axiosInstance.patch(
            `/tasks/${taskDataDecoded.value._id}/priority`,
            { priority: task.value.priority },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (task.value.dueDate) {
          await axiosInstance.patch(
            `/tasks/${taskDataDecoded.value._id}/dueDate`,
            { dueDate: new Date(task.value.dueDate).getTime() },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (selectedMember.value) {
          await axiosInstance.patch(
            `/tasks/${taskDataDecoded.value._id}/owner`,
            { ownerId: selectedMember.value },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

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
