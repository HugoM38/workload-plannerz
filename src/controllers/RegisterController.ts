import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosConfig";

export default defineComponent({
  name: "RegisterController",
  setup() {
    const router = useRouter();
    const form = reactive({
      firstname: "",
      lastname: "",
      job: "",
      email: "",
      password: "",
    });

    const register = async () => {
      try {
        const response = await axiosInstance.post("/auth/signup", form);
        console.log("Registration successful:", response.data);
        router.push("/login");
      } catch (error) {
        console.error("Registration error:", error);
      }
    };

    return {
      form,
      register,
    };
  },
});
