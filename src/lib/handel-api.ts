import { isAxiosError } from "axios";
import api from "./axios";
import { toast } from "sonner";

const handelAPI = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
): Promise<T> => {
  try {
    const response = await api[method](url, data);
    return response.data as T;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Request failed", {
        description: error.response?.data.description || "Please try again.",
        action: {
          label: "Close",
          onClick: () => {},
          actionButtonStyle: {
            cursor: "pointer",
          },
        },
      });
    } else {
      toast.error("Internal Server Error", {
        description: "Please try again.",
        action: {
          label: "Close",
          onClick: () => {},
          actionButtonStyle: {
            cursor: "pointer",
          },
        },
      });
      console.error("Error occurred while fetching data", error);
    }
    throw error;
  }
};

export default handelAPI;
