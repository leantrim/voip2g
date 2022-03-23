import "../../styles/Signup.css";

function Input({ name, label, style, error, ...restProps }: any) {
  return (
    <div>
      <label htmlFor={name} className={style + "-form-label"}>
        {label}
      </label>
      <input
        {...restProps}
        className={style + "-form-control"}
        id={name}
        name={name}
      />
      {error && <div className={style + "-alert"}>{error}</div>}
    </div>
  );
}

export default Input;
