import { authActions } from "./authSlice";

const baseURL = "";

export const sendLoginRequest = () => {
  return async (dispatch) => {
    // call API
    const sendRequest = async () => {
      // fetch Logic
    };

    try {
      
      dispatch(authActions.login(token));
    } catch (err) {
      console.log(err);
    }
  };
};
