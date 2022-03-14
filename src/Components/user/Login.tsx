import { useState } from "react";
import styled from "styled-components";
import Joi from "joi";
import auth from "../../services/authService";
import useForm from "../common/Form";
import { logo } from "../../config.json";
import { login } from "../../types/LoginType";
import { LoginType } from "../../types/LoginFormType";
import { Link } from "react-router-dom";
import "../../styles/Login.css";

export default function Login() {
  const data = { email: "", password: "" };
  const [errors, setErrors] = useState<any>();

  const style = LoginType.classname;

  const joiSchema = Joi.object({
    [LoginType.email]: Joi.string()
      .email({ tlds: { allow: false } })
      .label(LoginType.emailSubject),
    [LoginType.password]: Joi.string()
      .min(6)
      .required()
      .label(LoginType.passwordSubject),
  });

  const doSubmit = async (data: login) => {
    try {
      await auth.login(data);
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        setErrors(errors);
      }
    }
  };

  const { renderButton, renderInput, handleSubmit } = useForm<login>({
    initialData: data,
    joiSchema,
    doSubmit,
    style,
  });

  return (
    <div className={style + "-container"}>
      <form onSubmit={handleSubmit} className={style + "-form-container"}>
        <h1 className={style + "-login-title"}> {LoginType.title}</h1>
        <img className="logo" src={logo} alt="pic-of-brand-Logo" />
        {errors && <h4 className="register-errorresponse">{errors}</h4>}
        {renderInput("email", LoginType.emailSubject)}
        {renderInput("password", LoginType.passwordSubject, "password")}
        {renderButton(LoginType.button)}
        <h3 className="has-account">
          Har du inget konto? Registrera dig{" "}
          <Link className="here" to="/register">
            här
          </Link>
        </h3>
        <EarlyText>
          {`This application is in EARLY ACCESS STAGE, CTRL + R to reload the
          application.`}
        </EarlyText>
      </form>
    </div>
  );
}

const EarlyText = styled.h5`
  color: #b40606;
`;
