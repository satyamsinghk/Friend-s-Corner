import axios from "axios";

const BASE_URL = "http://localhost:5000";

const endpoints = {
  SIGNUP: "/user/signup",
  LOGIN: "/user/login",
  ADD_FRIEND: "/user/addfriend",
  REMOVE_FRIEND: "/user/removefriend",
  LOGOUT: "/user/logout",
};

export const signupUtil = (payload) => {
  const url = BASE_URL + endpoints.SIGNUP;
  return axios.post(url, payload);
};

export const loginUtil = (payload) => {
  const url = BASE_URL + endpoints.LOGIN;
  return axios.post(url, payload, { withCredentials: true });
};

export const loginWithCookieUtil = () => {
  const url = BASE_URL + endpoints.LOGIN;
  return axios.get(url, { withCredentials: true });
};

export const addFriendUtil = (payload) => {
  const url = BASE_URL + endpoints.ADD_FRIEND;
  return axios.patch(url, payload, { withCredentials: true });
};

export const removeFriendUtil = (payload) => {
  const url = BASE_URL + endpoints.REMOVE_FRIEND;
  return axios.patch(url, payload, { withCredentials: true });
};

export const logoutUtil = (payload) => {
  const url = BASE_URL + endpoints.LOGOUT;
  return axios.get(url, { withCredentials: true });
};
