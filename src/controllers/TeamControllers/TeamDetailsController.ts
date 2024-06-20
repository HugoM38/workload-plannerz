import { defineComponent } from "vue";
import { Task } from "@/models/Task";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { getTeamDetails } from "@/services/teamService";
import { validateTask, deleteTask } from "@/services/taskService";
import TeamDetails from "@/models/TeamDetails";

export default defineComponent({
  name: "TeamDetailsPage",
  data() {
    return {
      team: {} as Team,
      members: [] as User[],
      owner: {} as User,
      tasks: [] as Task[],
      userTasks: [] as Task[],
      unownedTasks: [] as Task[],
      ownedTasks: [] as Task[],
      selectedTask: null as Task | null,
      taskDialog: false,
      error: "",
      snackbar: false,
      sortOption: "dueDate",
      hideCompleted: false,
      teamWorkload: 0,
    };
  },
  computed: {
    sortedUserTasks() {
      let tasks = [...this.userTasks];
      if (this.hideCompleted) {
        tasks = tasks.filter((task) => task.state !== "Terminée");
      }
      return tasks.sort((a, b) => {
        return this.sortOption === "dueDate"
          ? a.dueDate - b.dueDate
          : b.priority - a.priority;
      });
    },
    sortedUnownedTasks() {
      let tasks = [...this.unownedTasks];
      if (this.hideCompleted) {
        tasks = tasks.filter((task) => task.state !== "Terminée");
      }
      return tasks.sort((a, b) => {
        return this.sortOption === "dueDate"
          ? a.dueDate - b.dueDate
          : b.priority - a.priority;
      });
    },
    sortedOwnedTasks() {
      let tasks = [...this.ownedTasks];
      if (this.hideCompleted) {
        tasks = tasks.filter((task) => task.state !== "Terminée");
      }
      return tasks.sort((a, b) => {
        return this.sortOption === "dueDate"
          ? a.dueDate - b.dueDate
          : b.priority - a.priority;
      });
    },
  },
  async mounted() {
    const teamData = this.$route.params.teamData;
    try {
      const decodedData = Array.isArray(teamData)
        ? ""
        : decodeURIComponent(atob(teamData));
      this.team = JSON.parse(decodedData);
    } catch (error) {
      console.error("Erreur lors du décodage des données de l'équipe", error);
    }

    try {
      const teamDetails: TeamDetails = await getTeamDetails(this.team);
      this.owner = teamDetails.owner;
      this.members = teamDetails.members;
      this.tasks = teamDetails.tasks;
      this.teamWorkload = teamDetails.workload;

      const user: User = JSON.parse(localStorage.getItem("user") || "");
      const userId = user._id;
      this.userTasks = this.tasks.filter((task: Task) => task.owner === userId);
      this.unownedTasks = this.tasks.filter(
        (task: Task) => task.owner === undefined
      );
      this.ownedTasks = this.tasks.filter(
        (task: Task) => task.owner && task.owner !== userId
      );
    } catch (error) {
      this.error = error as string;
      this.snackbar = true;
    }
  },
  methods: {
    viewTasks(memberId: string) {
      const path = `/team/${this.team._id}/${memberId}`;
      this.$router.push(path);
    },
    getOwnerName(ownerId: string) {
      const owner = this.members.find((member) => member._id === ownerId);
      return owner ? `${owner.firstname} ${owner.lastname}` : "Inconnu";
    },
    formatDate(timestamp?: number) {
      if (!timestamp) return "Non définie";
      const date = new Date(timestamp);
      return date.toLocaleDateString("fr-FR");
    },
    navigateToCreateTask() {
      const path = `/team/${this.team._id}/task/create`;
      this.$router.push(path);
    },
    navigateToEditTeam() {
      const teamData = btoa(encodeURIComponent(JSON.stringify(this.team)));
      const path = `/team/${teamData}/edit`;
      this.$router.push(path);
    },
    navigateToUpdateTask(task: Task) {
      const taskData = btoa(encodeURIComponent(JSON.stringify(task)));
      const path = `/team/${this.team._id}/task/update/${taskData}`;
      this.$router.push(path);
    },
    openTaskDialog(task: Task) {
      this.selectedTask = task;
      this.taskDialog = true;
    },
    isOwner() {
      const user: User = JSON.parse(localStorage.getItem("user") || "");
      return this.team.owner === user._id;
    },
    async closeTask(taskId: string) {
      this.taskDialog = false;
      try {
        await validateTask(taskId);
        this.tasks = this.tasks.map((task) => {
          if (task._id === taskId) {
            task.state = "Validée";
          }
          return task;
        });
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
    async deleteTask(taskId: string) {
      this.taskDialog = false;
      try {
        await deleteTask(taskId);
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
        this.userTasks = this.userTasks.filter((task) => task._id !== taskId);
        this.unownedTasks = this.unownedTasks.filter(
          (task) => task._id !== taskId
        );
        this.ownedTasks = this.ownedTasks.filter((task) => task._id !== taskId);
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
