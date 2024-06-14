import { ref, reactive } from "vue";
import { jwtDecode } from "jwt-decode";

interface UserData {
  firstname: string;
  lastname: string;
}

const user = reactive<UserData>({
  firstname: "",
  lastname: "",
});

const isLoggedIn = ref(false);

const setUser = (userData: UserData) => {
  user.firstname = userData.firstname || "";
  user.lastname = userData.lastname || "";
  isLoggedIn.value = !!(user.firstname && user.lastname);
};

const clearUser = () => {
  user.firstname = "";
  user.lastname = "";
  isLoggedIn.value = false;
};

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const { exp } = decodedToken || {};
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  } catch (error) {
    console.error("Invalid token", error);
    return true;
  }
};

export { user, isLoggedIn, setUser, clearUser, isTokenExpired };
