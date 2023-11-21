import { Tooltip } from "antd";

export const ObligatoryField = ({ text }) => {
  return (
    <Tooltip title={text ? text : "Campo obligatorio"}>
      <span className="text-danger">
        <b>*</b>
      </span>
    </Tooltip>
  );
};
