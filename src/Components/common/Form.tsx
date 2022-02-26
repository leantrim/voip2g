import { useState } from "react";
import DropDownInput from "../common/DropdownInput";
import Input from "../common/Input";
import "../../styles/Signup.css";
import "../../styles/NewChannel.css";
import { ObjectSchema } from "joi";

interface Form<Type> {
  initialData: Type;
  joiSchema: ObjectSchema;
  doSubmit: (formData: Type) => void;
  style: string;
}

export default function useForm<Type>({
  initialData,
  joiSchema,
  doSubmit,
  style,
}: Form<Type>) {
  const [data, setData] = useState<any>(initialData);
  const [errors, setErrors] = useState<any>(initialData);

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = joiSchema.validate(data, options);

    if (!error) return null;

    const errors: any = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    return errors;
  };

  interface ValidateProperty {
    name: string;
    value: string;
  }

  const validateProperty = ({ name, value }: ValidateProperty) => {
    const schema = joiSchema.extract(name);
    const { error } = schema.validate(value);

    if (!error) return null;

    return error.message;
  };

  const handleChange = ({ currentTarget: input }: any) => {
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setErrors({ ...errors });

    data[input.name] = input.value;
    setData(data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit(data);
  };

  const renderInput = (name: string, label: string, input = "text") => (
    <Input
      type={input}
      name={name}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      style={style}
    />
  );

  const renderDropDown = (name: string, label: string, options: any[]) => (
    <DropDownInput
      name={name}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      data={data}
      options={options}
      style={style}
    />
  );

  const renderButton = (input: string) => (
    <button className={style + "-button"} disabled={validate()}>
      {input}
    </button>
  );

  return {
    renderDropDown,
    renderButton,
    renderInput,
    handleSubmit,
    setData,
  };
}
