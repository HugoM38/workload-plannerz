import axiosInstance from "@/axiosConfig";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/errorHandler";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";
import { TaskFormData } from "@/models/TaskFormData";
import { Task } from "@/models/Task";

const token: string = localStorage.getItem("token") || "";

export const createTask = async (data: TaskFormData): Promise<void> => {
  try {
    await axiosInstance.post(`/tasks/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const validateTask = async (taskId: string): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/tasks/${taskId}/validate`,
      {},
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

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};

export const updateTaskName = async (
  taskId: string,
  name: string
): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/tasks/${taskId}/name`,
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

export const updateTaskPriority = async (
  taskId: string,
  priority: string | number
): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/tasks/${taskId}/priority`,
      { priority },
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

export const updateTaskDueDate = async (
  taskId: string,
  dueDate: number
): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/tasks/${taskId}/dueDate`,
      { dueDate },
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

export const updateTaskOwner = async (
  taskId: string,
  ownerId: string
): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/tasks/${taskId}/owner`,
      { ownerId },
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

export const updateTaskTimeEstimation = async (
  taskId: string,
  timeEstimation: number
): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/tasks/${taskId}/timeEstimation`,
      { timeEstimation },
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

export const getTasksByTeam = async (teamId: string): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get(`/tasks/${teamId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error as AxiosError<AxiosErrorResponse>);
  }
};
