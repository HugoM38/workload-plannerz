import { defineComponent, reactive } from "vue";
import axiosInstance from "@/axiosConfig";
import TaskForm from "@/views/components/TaskForm.vue";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";
import { User } from "@/models/User";

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
  data() {
    return {
      task: reactive({
        _id: "",
        name: "",
        priority: "0",
        dueDate: new Date().toISOString().substr(0, 10),
        timeEstimation: 0,
      }),
      selectedMember: "",
      members: [] as User[],
      loading: true,
      error: "",
      snackbar: false,
      teamId: this.$route.params.teamId as string,
    };
  },
  computed: {
    taskFormData() {
      const dueDateTimestamp = new Date(this.task.dueDate).setUTCHours(
        0,
        0,
        0,
        0
      );
      return {
        name: this.task.name,
        priority: this.task.priority,
        dueDate: dueDateTimestamp,
        team: this.teamId,
        timeEstimation: this.task.timeEstimation,
      };
    },
    formattedTaskData(): string {
      const data: TaskData = { ...this.taskFormData };
      if (this.selectedMember) {
        data.owner = this.selectedMember;
      }
      return JSON.stringify(data, null, 2);
    },
  },
  async mounted() {
    const taskData = this.$route.params.taskData;
    try {
      const decodedData = Array.isArray(taskData)
        ? ""
        : decodeURIComponent(atob(taskData));
      this.task = JSON.parse(decodedData);
      this.task.dueDate = new Date(this.task.dueDate)
        .toISOString()
        .substr(0, 10);

      if (this.teamId) {
        await this.fetchMembers(this.teamId);
      } else {
        this.loading = false;
      }
    } catch (error) {
      console.error("Erreur lors du décodage des données de l'équipe", error);
    }
  },
  methods: {
    async fetchMembers(teamId: string) {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await axiosInstance.get(`/teams/${teamId}/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.members = response.data;
      } catch (error) {
        this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    },
    selectMember(member: { _id: string }) {
      this.selectedMember =
        this.selectedMember === member._id ? "" : member._id;
    },
    async updateTask() {
      const token = localStorage.getItem("token") || "";
      const taskId = this.task._id;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        await axiosInstance.patch(
          `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/name`,
          { name: this.task.name },
          { headers }
        );

        await axiosInstance.patch(
          `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/priority`,
          { priority: this.task.priority },
          { headers }
        );

        await axiosInstance.patch(
          `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/dueDate`,
          { dueDate: this.taskFormData.dueDate },
          { headers }
        );

        if (this.selectedMember) {
          await axiosInstance.patch(
            `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/owner`,
            { ownerId: this.selectedMember },
            { headers }
          );
        }

        await axiosInstance.patch(
          `https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api/tasks/${taskId}/timeEstimation`,
          { timeEstimation: this.task.timeEstimation },
          { headers }
        );

        this.$router.push("/");
      } catch (error) {
        this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
      }
    },
  },
});
