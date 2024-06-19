import { defineComponent, reactive } from "vue";
import axiosInstance from "@/axiosConfig";
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
        const response = await axiosInstance.post("/auth/signup", this.form);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
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
