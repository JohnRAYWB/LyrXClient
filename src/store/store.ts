import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import TrackApi from "@/store/reducer/TrackApi";
import PlaylistApi from "@/store/reducer/PlaylistApi";
import AlbumApi from "@/store/reducer/AlbumApi";

export const rootReducer = combineReducers({
    [TrackApi.reducerPath]: TrackApi.reducer,
    [PlaylistApi.reducerPath]: PlaylistApi.reducer,
    [AlbumApi.reducerPath]: AlbumApi.reducer,
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
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(TrackApi.middleware, PlaylistApi.middleware, AlbumApi.middleware)
})

export const wrapper = createWrapper<AppStore>(setupStore, {debug: true})

export type RootState = ReturnType<typeof setupStore>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']