import { defineComponent, reactive } from "vue";
import TaskForm from "@/views/CustomsComponents/TaskForm.vue";
import { createTask } from "@/services/taskService";
import { getTeamMembers } from "@/services/teamService";
import { User } from "@/models/User";
import { TaskFormData } from "@/models/TaskFormData";

export default defineComponent({
  name: "TaskPage",
  components: {
    TaskForm,
  },
  data() {
    return {
      form: reactive({
        taskName: "",
        priority: "1",
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
        this.members = await getTeamMembers(teamId);
      } catch (error) {
        this.error = error as string;
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
        const data: TaskFormData = { ...this.taskData };
        if (this.form.selectedMember) {
          data.owner = this.form.selectedMember;
        } else {
          delete data.owner;
        }
        await createTask(data);
        this.$router.push("/");
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
