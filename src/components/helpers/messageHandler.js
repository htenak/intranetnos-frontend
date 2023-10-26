import { toast } from "react-toastify";
import { FAIcon } from "src/assets/icon/FAIcon";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const messageHandler = (
  errorMessage = undefined,
  successMessage = undefined,
  status = null
) => {
  if (errorMessage !== undefined) {
    toast.error(errorMessage);
  }
  if (successMessage !== undefined) {
    if (status === "CREATED") {
      toast.success(successMessage);
    }
    if (status === "UPDATED") {
      toast.info(successMessage);
    }
    if (status === "DELETED") {
      toast.error(successMessage, {
        icon: <FAIcon customClass="icon" icon={faCheckCircle} />,
      });
    }
  }
};
