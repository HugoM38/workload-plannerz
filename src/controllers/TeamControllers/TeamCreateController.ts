import { defineComponent, reactive, ref } from "vue";
import TeamForm from "@/views/components/TeamForm.vue";
import axiosInstance from "@/axiosConfig";
import router from "@/router";

export default defineComponent({
  name: "TeamCreation",
  components: {
    TeamForm,
  },
  setup() {
    const name = ref("");
    const logged_user = JSON.parse(localStorage.getItem("user") || "{}");
    const token: string = localStorage.getItem("token") || "";
    const createTeam = async () => {
      try {
        const form = reactive({
          name: name.value,
          owner: logged_user._id,
        });
        console.log("Créer le groupe");
        console.log(form);
        const response = await axiosInstance.post("teams/create", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push("/");
      } catch (error) {
        console.error("Team creation error:", error);
      }
    };

    return {
      teamName: name,
      createTeam,
    };
  },
});
