import jwtDecode from "jwt-decode";
import http from "./httpService";
import { DATABASE_URL } from "../config.json";
import { LoginType } from "../types/LoginFormType";

const SECOND_URL = "auth";
const tokenKey = "x-auth-token";

http.setAuthHeader(getJwt());

interface User {
  email: string;
  password: string;
}

async function login(user: User) {
  const { data: jwt } = await http.post(`${DATABASE_URL}/api/${SECOND_URL}`, {
    [LoginType.email]: user[LoginType.email],
    [LoginType.password]: user[LoginType.password],
  });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt: string) {
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
