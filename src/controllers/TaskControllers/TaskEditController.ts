import { defineComponent, reactive } from "vue";
import TaskForm from "@/views/CustomsComponents/TaskForm.vue";
import { getTeamMembers } from "@/services/teamService";
import {
  updateTaskName,
  updateTaskPriority,
  updateTaskDueDate,
  updateTaskOwner,
  updateTaskTimeEstimation,
} from "@/services/taskService";
import { User } from "@/models/User";

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
        this.members = await getTeamMembers(teamId);
      } catch (error) {
        this.error = error as string;
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
      const taskId = this.task._id;

      try {
        await updateTaskName(taskId, this.task.name);
        await updateTaskPriority(taskId, this.task.priority);
        await updateTaskDueDate(taskId, this.taskFormData.dueDate);

        if (this.selectedMember) {
          await updateTaskOwner(taskId, this.selectedMember);
        }

        await updateTaskTimeEstimation(taskId, this.task.timeEstimation);

        this.$router.push("/");
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
