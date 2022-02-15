import jwtDecode from "jwt-decode";
import http from "./httpService";
import { LoginType } from "../types/LoginFormType";

const SECOND_URL = "auth";
const tokenKey = "token";

http.setAuthHeader(getJwt());

async function login(user: any) {
  const { data: jwt } = await http.post(
    `http://localhost:5000/api/${SECOND_URL}`,
    {
      [LoginType.email]: user[LoginType.email],
      [LoginType.password]: user[LoginType.password],
    }
  );
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt: any) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const userToken = localStorage.getItem(tokenKey) || "";
    const user = jwtDecode(userToken);
    return user;
  } catch (error) {
    return null;
  }
}

function getJwt() {
  const key = localStorage.getItem(tokenKey);
  return key;
}

const exportedObject = {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};

export default exportedObject;
