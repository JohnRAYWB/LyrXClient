import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {userReducer} from "./slice/user"
import {authReducer} from "@/store/slice/auth";
import {apiSlice} from "@/store/api/apiSlice";

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,

    user: userReducer,
    auth: authReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        if (state.count) nextState.count = state.count
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export function makeStore() {
    return configureStore({
        reducer: reducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware()
            .concat(apiSlice.middleware,)
    })
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<RootState>(makeStore, {debug: true})