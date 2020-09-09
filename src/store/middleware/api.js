import axios from "axios";
import * as actions from '../api'
const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data
        });

        //general
        if (!onSuccess) dispatch(actions.apiCallSuccess(response.data));

        //specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        //general
        if (!onError) dispatch(actions.apiCallFailed(error));

        //specific
        if (onError) dispatch({ type: onError, payload: error });
    }
};

export default api;