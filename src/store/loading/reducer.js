import { LOADING_TYPES } from "./types";

const init = {
    infoUser: false,
    changePassword: false,
}

const loading = (state = init, action) => {
    switch (action.type) {
        case LOADING_TYPES.infoUser:
            return {...state, infoUser: !state.infoUser}
        case LOADING_TYPES.changePassword:
            return {...state, changePassword: !state.changePassword}
        default: return state;
    }
}

export default loading;