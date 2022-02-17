import DropDownInputType from "../../types/DropdownInput";
import "../../styles/Signup.css";

function DropDownInput({
  name,
  label,
  error,
  data,
  options,
  onChange,
  style,
  ...restProps
}: DropDownInputType) {
  return (
    <div>
      <label htmlFor={name} className={style + "-form-label"}>
        {label}
      </label>
      <select
        name={name}
        onChange={onChange}
        selected={options.selected}
        className={style + "-form-select"}
      >
        {options.map((opt: any) => (
          <option value={opt.name} key={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
      {error && <div className={style + "-alert"}>{error}</div>}
    </div>
  );
}

export default DropDownInput;
