import {toast} from "react-toastify";

const catchError = (err) => {
    if (err.response && err.response.data) {
        toast.error(err.response.data.err)
    } else toast.error((err.message));
};

export default catchError;