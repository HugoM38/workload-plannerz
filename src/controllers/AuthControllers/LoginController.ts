import { defineComponent, reactive } from "vue";
import { loginUser } from "@/services/authService";

export default defineComponent({
  name: "LoginController",
  data() {
    return {
      form: reactive({
        email: "",
        password: "",
      }),
      error: "",
      snackbar: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginUser(this.form);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        this.$router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        this.error = error as string;
        this.snackbar = true;
      }
    },
  },
});
