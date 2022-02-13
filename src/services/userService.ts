import http from "./httpService";
import { RegisterType } from "../types/RegisterFormType";

const SECOND_URL = "users";

interface User {
  [RegisterType.email]: string;
  [RegisterType.name]: string;
  [RegisterType.password]: string;
}

function register(user: User) {
  return http.post(`http://localhost:5000/api/${SECOND_URL}`, {
    [RegisterType.email]: user[RegisterType.email],
    [RegisterType.name]: user[RegisterType.name],
    [RegisterType.password]: user[RegisterType.password],
  });
}

const exportObject = {
  register,
};

export default exportObject;
