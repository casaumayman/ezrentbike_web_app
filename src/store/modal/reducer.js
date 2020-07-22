import { MODAL_TYPES } from "./types";

const init = {
    showLogin: false,
    showRegister: false,
    showWarningDeleteUser: false,
    showEditUser: false,
    showAddProduct: false,
    showWarningDeleteProduct: false,
    showEditProduct: false,
    showRentBike: false
}

const modalStatus = (state = init, action) => {
    switch (action.type) {
        case MODAL_TYPES.showLogin:
            return { ...state, showLogin: true }
        case MODAL_TYPES.showRegister:
            return { ...state, showRegister: true }
        case MODAL_TYPES.closeModal:
            return init;
        case MODAL_TYPES.warningDeleteUser:
            return { ...state, showWarningDeleteUser: true }
        case MODAL_TYPES.editUser:
            return { ...state, showEditUser: true }
        case MODAL_TYPES.addProduct:
            return { ...state, showAddProduct: true }
        case MODAL_TYPES.deleteProduct:
            return { ...state, showWarningDeleteProduct: true }
        case MODAL_TYPES.editProduct:
            return { ...state, showEditProduct: true }
        case MODAL_TYPES.rentBike:
            return { ...state, showRentBike: true }
        default: return state;
    }
}

export { modalStatus };