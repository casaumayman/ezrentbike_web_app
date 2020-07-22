import { LOADING_TYPES } from "./types";

export const infoUser = () => dispatch => dispatch({type: LOADING_TYPES.infoUser});
export const changePassword = () => dispatch => dispatch({type: LOADING_TYPES.changePassword});