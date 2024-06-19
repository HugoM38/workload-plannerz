import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskForm",
  props: {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    timeEstimation: {
      type: Number,
      required: true,
      default: 0,
    },
    isUpdateMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localTaskName: this.taskName,
      localTaskDescription: this.taskDescription,
      localPriority: this.priority,
      localDueDate: new Date(this.dueDate),
      formattedDueDate: this.formatDate(new Date(this.dueDate)),
      localTimeEstimation: this.timeEstimation,
      menu: false,
      priorityLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      error: "",
      snackbar: false,
    };
  },
  watch: {
    localTaskName(newValue) {
      this.$emit("update:taskName", newValue);
    },
    localTaskDescription(newValue) {
      this.$emit("update:taskDescription", newValue);
    },
    localPriority(newValue) {
      this.$emit("update:priority", newValue);
    },
    localDueDate(newValue) {
      const adjustedDate = this.adjustDate(newValue);
      this.$emit("update:dueDate", adjustedDate.toISOString().substr(0, 10));
      this.formattedDueDate = this.formatDate(adjustedDate);
    },
    localTimeEstimation(newValue) {
      const validValue = Math.max(0, Math.floor(newValue));
      if (validValue !== newValue) {
        this.localTimeEstimation = validValue;
      }
      this.$emit("update:timeEstimation", validValue);
    },
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    },
    handleInput(event: Event) {
      const input = event.target as HTMLInputElement;
      const value = parseInt(input.value, 10);
      if (!isNaN(value) && value >= 0) {
        this.localTimeEstimation = value;
      } else {
        input.value = this.localTimeEstimation.toString();
      }
    },
    adjustDate(date: Date) {
      // Utiliser des méthodes UTC pour ajuster la date
      return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
    },
    formatDate(date: Date) {
      // Formater la date sans tenir compte du fuseau horaire
      return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      ).toLocaleDateString();
    },
  },
});
