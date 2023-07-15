import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";
import {userDto} from "@/api/dto/user.dto";
import {HYDRATE} from "next-redux-wrapper";

export interface UserState {
    data: userDto | null
}

const initialState: UserState = {
    data: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<userDto>) => {
            state.data = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.user
            }
        })
    }
})

export const {setUserData} = userSlice.actions

export const selectUserData = (state: RootState) => state.user.data

export const {reducer: userReducer} =  userSlice