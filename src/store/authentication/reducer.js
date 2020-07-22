import { AUTHEN_TYPES } from "./types";
import * as jwt from 'jsonwebtoken';


const init = {
    username: '',
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    avatar: '',
    role: 0,
    cardLength: 0
}
export const authen = (state = init, action) => {
    switch (action.type) {
        case AUTHEN_TYPES.login: {
            let user = jwt.verify(action.token, AUTHEN_TYPES.secretKey);
            return {...state, ...user};
        }
        case AUTHEN_TYPES.logout: return init;
        case AUTHEN_TYPES.updateAvatar: {
            return {...state, avatar: action.avatar}
        }
        case AUTHEN_TYPES.editInfo:
            return {...state, ...action.user}
        default: return state;
    }
}