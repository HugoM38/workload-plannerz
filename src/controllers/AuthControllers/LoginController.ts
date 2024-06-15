import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosConfig";

export default defineComponent({
  name: "LoginController",
  setup() {
    const router = useRouter();
    const form = reactive({
      email: "",
      password: "",
    });

    const login = async () => {
      try {
        console.log("Sending login request", form);
        const response = await axiosInstance.post("/auth/signin", form);
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    return {
      form,
      login,
    };
  },
});
