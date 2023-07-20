import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "@/store/api/headers";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: build => ({})
})