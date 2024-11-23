import { isAxiosError } from "axios";
import { toast } from "sonner";

// Common function for showing toast notifications
const showToastError = (error: any) => {
  const defaultMessage = "An unexpected error occurred.";
  const defaultDescription = "Please try again.";

  if (isAxiosError(error)) {
    toast.error(error.response?.data?.message || defaultMessage, {
      description: error.response?.data?.description || defaultDescription,
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
      description: defaultDescription,
      action: {
        label: "Close",
        onClick: () => {},
        actionButtonStyle: {
          cursor: "pointer",
        },
      },
    });
    console.error("Unexpected error:", error);
  }
};

export default showToastError;
