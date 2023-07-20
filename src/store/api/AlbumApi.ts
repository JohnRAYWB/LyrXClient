import {apiSlice} from "@/store/api/apiSlice";

export const AlbumApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllAlbumAndSearch: build.query({
            query: (query) => ({
                url: `albums/search?name=${query}`
            }),
            providesTags: result => ['Album']
        }),
        fetchMostLikedAlbum: build.query({
            query: () => ({
                url: `albums/top`
            }),
            providesTags: result => ['Album']
        }),
        fetchAlbumById: build.query({
            query: (aId) => ({
                url: `albums/${aId}/current`
            }),
            providesTags: result => ['Album']
        })
    })
})

export const {
    useFetchAllAlbumAndSearchQuery,
    useFetchMostLikedAlbumQuery,
    useFetchAlbumByIdQuery
} = AlbumApi