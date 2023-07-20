import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "@/store/api/headers";
import {HYDRATE} from "next-redux-wrapper";

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['User', 'Track', 'Playlist', 'Album', 'Genre'],
    baseQuery: baseQuery,
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: build => ({})
})