import {
  loginUtil,
  loginWithCookieUtil,
  logoutUtil,
  removeFriendUtil,
  addFriendUtil,
} from "../apiUtils";

const initialstate = {
  message: "",
  success: false,
  name: "",
  username: "",
  loading: false,
  friendList: [],
};

const ACTIONS = {
  LOGIN: "LOGIN",
  ERROR: "ERROR",
  LOGOUT: "LOGOUT",
  ADD_FRIEND: "ADD_FRIEND",
  REMOVE_FRIEND: "REMOVE_FRIEND",
  LOADING: "LOADING",
  RESET_MSG: "RESET_MSG",
};

export const errorActionCreator = (payload) => {
  return { type: ACTIONS.ERROR, payload };
};

const resetMessageAction = () => ({ type: ACTIONS.RESET_MSG });

const asyncActionCreator = (apiUtil, type, apiPayload) => {
  return async (dispatch) => {
    try {
      dispatch(resetMessageAction());
      dispatch(loadingAction(true));
      const data = (await apiUtil(apiPayload))?.data;
      dispatch({ type, payload: data });
    } catch (error) {
      const payload = error.response.data;
      dispatch(errorActionCreator(payload));
    } finally {
      dispatch(loadingAction(false));
    }
  };
};

export const loginWithCookieActionCreator = () => {
  return asyncActionCreator(loginWithCookieUtil, ACTIONS.LOGIN);
};

export const loginActionCreator = (payload) => {
  return asyncActionCreator(loginUtil, ACTIONS.LOGIN, payload);
};

export const addFriendAction = (payload) => {
  return asyncActionCreator(addFriendUtil, ACTIONS.ADD_FRIEND, payload);
};

export const removeFriendAction = (payload) => {
  return asyncActionCreator(removeFriendUtil, ACTIONS.REMOVE_FRIEND, payload);
};

export const logoutAction = (payload) => {
  return asyncActionCreator(logoutUtil, ACTIONS.LOGOUT);
};

export const loadingAction = (payload) => {
  return { type: ACTIONS.LOADING, payload };
};

export const userReducer = (state = initialstate, action) => {
  const { success, data, message } = action?.payload || {};
  switch (action.type) {
    case ACTIONS.LOGIN:
      var { name, username, friendList } = data;
      console.log(success, message);
      return { ...state, message, success, name, username, friendList };
    case ACTIONS.ERROR:
      return { ...state, message, success };

    case ACTIONS.ADD_FRIEND:
    case ACTIONS.REMOVE_FRIEND:
      return { ...state, message, success, friendList: data };
    case ACTIONS.LOADING:
      const { payload } = action;
      return { ...state, loading: payload };

    case ACTIONS.LOGOUT:
      return { ...initialstate, message, success };
    case ACTIONS.RESET_MSG:
      return { ...state, message: "" };

    default:
      return state;
  }
};
