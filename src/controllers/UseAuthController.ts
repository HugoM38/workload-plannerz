import { onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  user,
  isLoggedIn,
  setUser,
  clearUser,
  isTokenExpired,
} from "@/models/UseUser";

export default function useAuthController() {
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    console.log("Token: ", token);
    if (!token || isTokenExpired(token)) {
      router.push("/login");
    } else {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("User data:", userData);
      setUser(userData);
      console.log("isLoggedIn: ", isLoggedIn.value);
      console.log("User state:", user);
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

  const createGroup = () => {
    console.log("Creer");
  };

  onMounted(checkAuth);

  return {
    logout,
    createGroup,
  };
}
