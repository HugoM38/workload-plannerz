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
  name: "TaskPage",
  components: {
    TaskForm,
  },
  data() {
    return {
      form: reactive({
        taskName: "",
        priority: "0",
        dueDate: new Date().toISOString().substr(0, 10),
        timeEstimation: 0,
        selectedMember: "",
      }),
      members: [] as User[],
      loading: true,
      error: "",
      snackbar: false,
    };
  },
  computed: {
    taskData() {
      const dueDateTimestamp = new Date(this.form.dueDate).getTime();
      return {
        name: this.form.taskName,
        priority: this.form.priority,
        dueDate: dueDateTimestamp,
        team: this.$route.params.id,
        timeEstimation: this.form.timeEstimation,
      };
    },
    formattedTaskData(): string {
      const data: TaskData = { ...this.taskData };
      if (this.form.selectedMember) {
        data.owner = this.form.selectedMember;
      }
      return JSON.stringify(data, null, 2);
    },
  },
  async mounted() {
    const teamId = this.$route.params.id as string;
    if (teamId) {
      await this.fetchMembers(teamId);
    } else {
      this.loading = false;
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
      } catch (err) {
        this.error = handleAxiosError(err as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    },
    selectMember(member: { _id: string }) {
      this.form.selectedMember =
        this.form.selectedMember === member._id ? "" : member._id;
    },
    async submitTask() {
      try {
        const token = localStorage.getItem("token") || "";
        const data: TaskData = { ...this.taskData };
        if (this.form.selectedMember) {
          data.owner = this.form.selectedMember;
        } else {
          delete data.owner;
        }
        const response = await axiosInstance.post(`/tasks/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$router.push("/");
      } catch (error) {
        console.error("Erreur lors de la création de la tâche", error);
        this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
      }
    },
  },
});
