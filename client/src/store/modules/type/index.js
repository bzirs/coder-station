import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTypesApi} from "../../../api/type.js";


const initialState = {
    types: []
}

const reducers = {}


export const getTypes = createAsyncThunk('type/getTypes', async (_, thunkAPI) => {

    try {
        const {data} = await getTypesApi();

        return data

    } catch (e) {
        console.log(e)
    }
})

export const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(getTypes.fulfilled, (state, {payload}) => {
            state.types = payload
        })
    }
})

export const selectorTypes = state => state.type.types

export const {} = typeSlice.actions


export const typeReducer = typeSlice.reducer