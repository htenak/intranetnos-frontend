import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const FAIcon = ({ icon, customClass }) => {
  return <FontAwesomeIcon className={customClass} icon={icon} />;
};
