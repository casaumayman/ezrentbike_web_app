import { serviceTypes } from "./types";

const init = {
    listProducer: [],
    listFeedback: []
}

const services = (state = init, action) => {
    switch (action.type) {
        case serviceTypes.getListProducer:
            return {...state, listProducer: action.list}
        case serviceTypes.getListFeedback:
            return {...state, listFeedback: action.list}
        default:
            return state;
    }
}

export default services;