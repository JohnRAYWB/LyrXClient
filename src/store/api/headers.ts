import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";

const baseUrl = 'http://localhost:4221'

export const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState, endpoint}) => {
        const access_token = (getState() as RootState).auth.access_token

        if(access_token && endpoint !== 'refresh') {
            headers.set('Authorization', `Bearer ${access_token}`)
        }

        return headers
    }
})