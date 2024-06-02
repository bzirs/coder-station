import {configureStore} from "@reduxjs/toolkit";
import {globalReducer} from "./modules/global";
import {typeReducer} from "./modules/type/index.js";


const store = configureStore({
    reducer: {
        global: globalReducer,
        type: typeReducer
    }
})


export default store