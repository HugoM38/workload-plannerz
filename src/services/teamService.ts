import axiosInstance from "@/axiosConfig";
import { User } from "@/models/User";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";
import { getUserDetails } from "./userService";
import { Team } from "@/models/Team";
import TeamDetails from "@/models/TeamDetails";

const token: string = localStorage.getItem("token") || "";

export const createTeam = async (
  name: string,
  ownerId: string
): Promise<void> => {
  try {
    const form = { name, owner: ownerId };
    await axiosInstance.post("teams/create", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const getTeamMembers = async (teamId: string): Promise<User[]> => {
  try {
    const response = await axiosInstance.get(`/teams/${teamId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const getNonMembers = async (teamId: string): Promise<User[]> => {
  try {
    const response = await axiosInstance.get(`/teams/${teamId}/nonMembers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const updateTeamName = async (
  teamId: string,
  name: string
): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/teams/${teamId}/changeName`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const addMember = async (
  teamId: string,
  userId: string
): Promise<void> => {
  try {
    await axiosInstance.post(
      `/teams/${teamId}/addMember`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const removeMember = async (
  teamId: string,
  userId: string
): Promise<void> => {
  try {
    await axiosInstance.post(
      `/teams/${teamId}/removeMember`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const getTeamDetails = async (team: Team): Promise<TeamDetails> => {
  try {
    const ownerResponse = await getUserDetails(team.owner);

    const membersResponse = await getTeamMembers(team._id);

    const tasksResponse = await axiosInstance.get(`/tasks/${team._id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const workloadResponse = await axiosInstance.get(
      `/teams/${team._id}/workload`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      owner: ownerResponse,
      members: membersResponse,
      tasks: tasksResponse.data,
      workload: workloadResponse.data.workload,
    };
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const getMemberWorkload = async (
  teamId: string,
  memberId: string
): Promise<number> => {
  try {
    const response = await axiosInstance.get(
      `/teams/${teamId}/${memberId}/workload`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.workload;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};
