import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/axiosConfig";
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
}

export default defineComponent({
  name: "TaskUpdatePage",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const taskName = ref("");
    const priority = ref("0");
    const dueDate = ref(new Date().toISOString().substr(0, 10));
    const selectedMember = ref("");
    const members = ref<{ _id: string; name: string; email: string }[]>([]);
    const loading = ref(true);
    const error = ref("");
    const snackbar = ref(false);
    const taskId = route.params.taskId as string;
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
          taskName.value = response.data.name;
          priority.value = response.data.priority.toString();
          dueDate.value = new Date(response.data.dueDate)
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

    const taskData = computed(() => {
      const dueDateTimestamp = new Date(dueDate.value).getTime();
      return {
        name: taskName.value,
        priority: priority.value,
        dueDate: dueDateTimestamp,
        team: teamId,
      };
    });

    const formattedTaskData = computed((): string => {
      const data: TaskData = { ...taskData.value };
      if (selectedMember.value) {
        data.owner = selectedMember.value;
      }
      return JSON.stringify(data, null, 2);
    });

    const updateTask = async () => {
      try {
        const token = localStorage.getItem("token") || "";

        if (priority.value) {
          await axiosInstance.patch(
            `/tasks/${taskId}/priority`,
            { priority: priority.value },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (dueDate.value) {
          await axiosInstance.patch(
            `/tasks/${taskId}/dueDate`,
            { dueDate: new Date(dueDate.value).getTime() },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (selectedMember.value) {
          await axiosInstance.patch(
            `/tasks/${taskId}/owner`,
            { ownerId: selectedMember.value },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        console.log("Tâche mise à jour avec succès");
        router.push("/"); // Redirection vers la page principale après la mise à jour de la tâche
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la tâche", error);
        snackbar.value = true;
      }
    };

    onMounted(() => {
      if (taskId) {
        fetchTaskDetails(taskId);
      }
      if (teamId) {
        fetchMembers(teamId);
      } else {
        loading.value = false;
      }
    });

    return {
      taskName,
      priority,
      dueDate,
      updateTask,
      selectedMember,
      selectMember,
      members,
      loading,
      error,
      snackbar,
      taskData,
      formattedTaskData,
    };
  },
});
