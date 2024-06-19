import { AxiosError } from "axios";
import { AxiosErrorResponse } from "@/models/AxiosErrorResponse";

export function handleAxiosError(
  error: AxiosError<AxiosErrorResponse>
): string {
  if (error.response && error.response.data) {
    return error.response.data.error || "An error occurred";
  } else if (error.request) {
    return "No response received from server";
  } else {
    return error.message || "An error occurred";
  }
}
