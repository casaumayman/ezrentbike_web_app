import { serviceTypes } from "./types";
import { callApi } from "services/apiService";

export const getListProducer = () => dispatch => {
    callApi('service/list-producer', 'get').then(res => {
        dispatch({
            type: serviceTypes.getListProducer,
            list: res
        });
    }).catch(err => console.log('err: '+err.message));
}

export const getListFeedback = body => dispatch => {
    callApi('feedback', 'post', body, localStorage.getItem('token')).then(res => {
        dispatch({
            type: serviceTypes.getListFeedback,
            list: res
        });
    }).catch(err => console.log('err: ' + err.message));
}