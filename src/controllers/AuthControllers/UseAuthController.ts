import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { setUser, clearUser, isTokenExpired } from "@/models/UseUser";

export default function useAuthController() {
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      router.push("/login");
    } else {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();
    router.push("/login").then(() => {
      window.location.reload();
    });
  };

  onMounted(checkAuth);

  return {
    logout,
  };
}
