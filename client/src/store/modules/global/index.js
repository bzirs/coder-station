import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLogin: false,
    userInfo: {}
}

const reducers = {
    setUserInfo: (state, {payload = {}}) => {
        state.userInfo = payload;
    },
    toggleLoginStatus: (state, {payload}) => {
        state.isLogin = payload;
    }
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers
})

export const selectorIsLogin = state => state.global.isLogin
export const selectorUserInfo = state => state.global.userInfo


export const {setUserInfo, toggleLoginStatus} = globalSlice.actions;

export const globalReducer = globalSlice.reducer