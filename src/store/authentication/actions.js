import { callApi } from "../../services/apiService";
import { rootHistory } from "../../App";
import { AUTHEN_TYPES } from "./types";
import { closeModal } from "../modal/actions";
import { infoUser } from "../loading/actions";
import { store } from "store/appReducer";
import catchError from "services/catchError";
import { toastify } from "services/toastService";

export const login = (user) => dispatch => {
    let temp = {...user};
    delete temp.rememberPass;
    callApi('login', 'post' , temp, null).then(res => {
        rootHistory.push('/');
        localStorage.setItem('token', res.token);
        if (user.rememberPass) localStorage.setItem('remember', 'true');
        else localStorage.setItem('remember', 'false');
        dispatch(autoLogin(res.token));
        toastify.success('Đăng nhập thành công!');
    }).catch(err => {
        catchError(err);
    });
    dispatch(closeModal());
}
export const autoLogin = (token) => ({
    type: AUTHEN_TYPES.login,
    token
});

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    rootHistory.push('/');
    toastify.success('Đăng xuất thành công!');
    store.dispatch({type: AUTHEN_TYPES.logout});
}

export const updateAvatar = (avatar) => dispatch => dispatch({
    type: AUTHEN_TYPES.updateAvatar,
    avatar
});

export const editInfo = (user) => dispatch => {
    callApi('/user/edit', 'post', user, localStorage.getItem('token')).then(res => {
        toastify.success('Cập nhật thông tin thành công!');
        dispatch({
            type: AUTHEN_TYPES.editInfo,
            user
        });
        localStorage.setItem('token', res.token);
        autoLogin(res.token);
    }).catch(err => {
        if (err.response.data) toastify.error('Lỗi: ' + err.response.data.err);
        else toastify.error('Lỗi: ' + err.message);
    });
    dispatch(infoUser());
}