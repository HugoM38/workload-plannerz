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
  name: "TaskPage",
  components: {
    TaskForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const taskName = ref("");
    const priority = ref("0");
    const dueDate = ref(new Date().toISOString().substr(0, 10));
    const timeEstimation = ref(0);
    const selectedMember = ref("");
    const members = ref<{ _id: string; name: string; email: string }[]>([]);
    const loading = ref(true);
    const error = ref("");
    const snackbar = ref(false);

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
        team: route.params.id,
        timeEstimation: timeEstimation.value,
      };
    });

    const formattedTaskData = computed((): string => {
      const data: TaskData = { ...taskData.value };
      if (selectedMember.value) {
        data.owner = selectedMember.value;
      }
      return JSON.stringify(data, null, 2);
    });

    const submitTask = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const data: TaskData = { ...taskData.value };
        if (selectedMember.value) {
          data.owner = selectedMember.value;
        } else {
          delete data.owner;
        }
        console.log("////DATA : " + data.timeEstimation);
        const response = await axiosInstance.post(`/tasks/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Tâche créée avec succès:", response.data);
        router.push("/");
      } catch (error) {
        console.error("Erreur lors de la création de la tâche", error);
        snackbar.value = true;
        // Gérer l'erreur
      }
    };

    onMounted(() => {
      const teamId = route.params.id as string;
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
      timeEstimation,
      submitTask,
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
