import {configureStore} from "@reduxjs/toolkit";
import {globalReducer} from "./modules/global";


const store = configureStore({
    reducer: {
        global: globalReducer,
    }
})


export default store