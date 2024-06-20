import axiosInstance from "@/axiosConfig";
import { User } from "@/models/User";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";
import { Team } from "@/models/Team";

const token: string = localStorage.getItem("token") || "";

export const getUserDetails = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const getUserTeams = async (): Promise<Team[]> => {
  try {
    const response = await axiosInstance.get("/users/teams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};
