import http from "./httpService";
import { RegisterType } from "../types/RegisterFormType";
import { DATABASE_URL } from "../config.json";

const SECOND_URL = "users";

interface User {
  [RegisterType.email]: string;
  [RegisterType.name]: string;
  [RegisterType.password]: string;
}

function register(user: User) {
  return http.post(`${DATABASE_URL}/api/${SECOND_URL}`, {
    [RegisterType.email]: user[RegisterType.email],
    [RegisterType.name]: user[RegisterType.name],
    [RegisterType.password]: user[RegisterType.password],
  });
}

function getUser() {
  return http.get(`${DATABASE_URL}/api/users/me`);
}

function getCustomUser(_id: string) {
  console.log(_id);
  return http.get(`${DATABASE_URL}/api/users/${_id}`);
}

const exportObject = {
  register,
  getUser,
  getCustomUser,
};

export default exportObject;
