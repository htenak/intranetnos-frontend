import Select from "react-select";
import { FAIcon } from "src/assets/icon/FAIcon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SelectSearch = ({
  arraySearch,
  placeholder,
  icon,
  iconSize,
  noResultsMessage,
  ...restProps
}) => {
  const SearchIconDropDown = () => (
    <div style={{ paddingLeft: 12, paddingRight: 12 }}>
      <FAIcon customClass="icon" icon={!icon ? faSearch : icon} />
    </div>
  );

  return (
    <Select
      placeholder={placeholder}
      noOptionsMessage={
        !noResultsMessage ? () => "Sin resultados" : () => noResultsMessage
      }
      components={{
        DropdownIndicator: SearchIconDropDown,
      }}
      {...restProps} // propagando todas las demás props de react-select
    />
  );
};
