import {apiSlice} from "@/store/api/apiSlice";

export const GenreApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllGenre: build.query({
            query: (page) => ({
                url: `genres?limit=20&page=${page}`,
            }),
            providesTags: result => ['Genre']
        }),
        fetchGenreById: build.query({
            query: (gId) => ({
                url: `genres/${gId}`
            }),
            providesTags: result => ['Genre']
        })
    })
})

export const {useFetchAllGenreQuery, useFetchGenreByIdQuery} = GenreApi