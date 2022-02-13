import { useState } from "react";
import Joi from "joi";
import user from "../services/userService";
import auth from "../services/authService";
import useForm from "./common/Form";
import { logo } from "../config.json";
import { signup } from "../types/Signup";
import { RegisterType } from "../types/RegisterFormType";
import "../styles/Signup.css";

export default function Signup() {
  const data = { email: "", password: "", name: "" };
  const [errors, setErrors] = useState<any>();

  const style = RegisterType.classname;

  const joiSchema = Joi.object({
    [RegisterType.email]: Joi.string()
      .email({ tlds: { allow: false } })
      .label(RegisterType.emailSubject),
    [RegisterType.password]: Joi.string()
      .min(6)
      .required()
      .label(RegisterType.passwordSubject),
    [RegisterType.name]: Joi.string()
      .min(3)
      .required()
      .label(RegisterType.nameSubject),
  });

  const doSubmit = async (data: signup) => {
    try {
      const { headers } = await user.register(data);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location.href = "/"; // Fungerar ej
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        setErrors(errors);
      }
    }
  };

  const { renderButton, renderInput, handleSubmit } = useForm<signup>({
    initialData: data,
    joiSchema,
    doSubmit,
    style,
  });

  return (
    <div className={style + "-container"}>
      <form onSubmit={handleSubmit} className={style + "-form-container"}>
        <h1 className={style + "-signup-title"}> {RegisterType.title}</h1>
        <img className="logo" src={logo} alt="pic-of-brand-Logo" />
        {errors && <h4 className="register-errorresponse">{errors}</h4>}
        {renderInput("email", RegisterType.emailSubject)}
        {renderInput("password", RegisterType.passwordSubject, "password")}
        {renderInput("name", RegisterType.nameSubject)}
        {renderButton(RegisterType.button)}
        <h5 className="has-account">Har du redan ett konto? Logga in här</h5>
      </form>
    </div>
  );
}
