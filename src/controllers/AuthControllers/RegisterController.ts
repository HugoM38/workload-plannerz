import { defineComponent, reactive } from "vue";
import { registerUser } from "@/services/authService";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";
import { AxiosError } from "axios";

export default defineComponent({
  name: "RegisterController",
  data() {
    return {
      form: reactive({
        firstname: "",
        lastname: "",
        job: "",
        email: "",
        password: "",
      }),
      error: "",
      snackbar: false,
    };
  },
  methods: {
    async register() {
      try {
        const response = await registerUser(this.form);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        this.$router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        this.error = handleAxiosError(error as AxiosError<AxiosErrorResponse>);
        this.snackbar = true;
      }
    },
  },
});
