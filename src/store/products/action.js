import { callApi } from "services/apiService";
import { productTypes } from "./types";
import catchError from "services/catchError";
import { toast } from "react-toastify";
import { closeModal } from "store/modal/actions";

export const loadListProduct = () => dispatch => {
    callApi('product', 'get', null).then(res => {
        dispatch({
            type: productTypes.loadListProduct,
            list: res
        });
    }).catch(err => catchError(err));
}

export const deleteProduct = (id, username) => dispatch => {
    let body = {
        id,
        username: username
    };
    callApi('product/delete', 'post', body, localStorage.getItem('token')).then(res => {
        toast.success('Xóa phẩm thành công!');
        dispatch({
            type: productTypes.deleteProduct,
            id
        });
    }).catch(err => catchError(err)).finally(()=>closeModal());
}

export const addProduct = (product) => dispatch => {
    dispatch({
        type: productTypes.addProduct,
        product
    });
}

export const editProduct = (product) => dispatch => {
    dispatch({
        type: productTypes.editProduct,
        product
    });
}