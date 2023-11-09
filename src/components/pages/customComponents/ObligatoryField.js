import { CTooltip } from "@coreui/react";

export const ObligatoryField = ({ text }) => {
  return (
    <CTooltip content={text ? text : "Campo obligatorio"}>
      <span className="text-danger">
        <b>*</b>
      </span>
    </CTooltip>
  );
};
