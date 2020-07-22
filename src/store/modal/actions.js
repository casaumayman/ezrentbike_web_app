import { MODAL_TYPES } from "./types";
import { store } from "store/appReducer";

export const closeModal = () => store.dispatch({
    type: MODAL_TYPES.closeModal
});

export const openModalLogin = () => store.dispatch({
    type: MODAL_TYPES.showLogin
});

export const openModalRegister = () => store.dispatch({
    type: MODAL_TYPES.showRegister
});

export const openModalWarningDeleteUser = () => store.dispatch({
    type: MODAL_TYPES.warningDeleteUser
});

export const openModalEditUser = () => store.dispatch({
    type: MODAL_TYPES.editUser
});

export const openModalAddProduct = () => store.dispatch({
    type: MODAL_TYPES.addProduct
});

export const openModalWarningDeleteProduct = () => store.dispatch({
    type: MODAL_TYPES.deleteProduct
});

export const openModalEditProduct = () => store.dispatch({
    type: MODAL_TYPES.editProduct
});

export const openModalRentBike = () => store.dispatch({
    type: MODAL_TYPES.rentBike
});