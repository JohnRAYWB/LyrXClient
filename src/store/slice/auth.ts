import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "@/store/store";

export interface authToken {
    access_token: string | null
}

const initialState: authToken = {
    access_token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<authToken>) => {
            state.access_token = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ...action.payload.auth
                }
            })
    }
})

export const {setAuthToken} = authSlice.actions

export const selectAuthToken = (state: RootState) => state.auth.access_token

export const {reducer: authReducer} = authSlice