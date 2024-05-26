import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLogin: false,
    userInfo: {}
}

const reducers = {
    setUserInfo: (state, {payload = {}}) => {
        state.userInfo = payload;
    },
    toggleLoginStatus: (state) => {
        state.isLogin = !state.isLogin;
    }
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers
})

export const selectorIsLogin = state => state.global.isLogin


export const {setUserInfo, toggleLoginStatus} = globalSlice.actions;

export const globalReducer = globalSlice.reducer