import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import reducer from './reducer'
import logger from './middleware/logger';
//import func from './middleware/func';
import toast from './middleware/toats';
import api from './middleware/api';


export default function () {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            // logger({ destination: 'console' }),
            toast,
            api
        ]//, func]
    });
};