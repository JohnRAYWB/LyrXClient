import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import TrackApi from "@/store/api/TrackApi";
import PlaylistApi from "@/store/api/PlaylistApi";
import AlbumApi from "@/store/api/AlbumApi";
import UserApi from "@/store/api/UserApi";
import {userReducer} from "./slice/user"
import {authReducer} from "@/store/slice/auth";
import GenreApi from "@/store/api/GenreApi";

export const rootReducer = combineReducers({
    [TrackApi.reducerPath]: TrackApi.reducer,
    [PlaylistApi.reducerPath]: PlaylistApi.reducer,
    [AlbumApi.reducerPath]: AlbumApi.reducer,
    [GenreApi.reducerPath]: GenreApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
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
            .concat(
                TrackApi.middleware,
                PlaylistApi.middleware,
                AlbumApi.middleware,
                GenreApi.middleware,
                UserApi.middleware
            )
    })
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<RootState>(makeStore, {debug: true})