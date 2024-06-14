import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api",
});

export default axiosInstance;
