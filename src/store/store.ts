import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";

export const rootReducer = combineReducers({
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

export const setupStore = () => configureStore({
    reducer: reducer,
    devTools: true,
})

export const wrapper = createWrapper<AppStore>(setupStore, {debug: true})

export type RootState = ReturnType<typeof setupStore>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']