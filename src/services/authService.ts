import axiosInstance from "@/axiosConfig";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";
import { User } from "@/models/User";

interface RegisterForm {
  firstname: string;
  lastname: string;
  job: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

export const registerUser = async (
  form: RegisterForm
): Promise<{ token: string; user: User }> => {
  try {
    const response = await axiosInstance.post("/auth/signup", form);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const loginUser = async (
  form: LoginForm
): Promise<{ token: string; user: User }> => {
  try {
    const response = await axiosInstance.post("/auth/signin", form);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};
