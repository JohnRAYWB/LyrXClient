import {apiSlice} from "@/store/api/apiSlice";
import {albumDto} from "@/api/dto/album.dto";

export const AlbumApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllAlbum: build.query({
           query: (page) => ({
               url: `albums?limit=10&page=${page * 10}`
           }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg
            },
        }),
        fetchAllAlbumAndSearch: build.query<albumDto[], string>({
            query: (query) => ({
                url: `albums/search?name=${query}`
            }),
            providesTags: result => ['Album']
        }),
        fetchMostLikedAlbum: build.query<albumDto[], void>({
            query: () => ({
                url: `albums/top`
            }),
            providesTags: result => ['Album']
        }),
        fetchArtistsAlbums: build.query<albumDto[], number>({
            query: (page) => ({
                url: `albums/artist?limit=10&page=${page * 10}`
            }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg
            }
        }),
        fetchArtistsAlbumsAndSearch: build.query<albumDto[], string>({
            query: (name) => ({
                url: `albums/artist/search?name=${name}`
            }),
            providesTags: result => ['Album']
        }),
        fetchArtistsSortedAlbums: build.query<albumDto[], void>({
            query: () => ({
                url: 'albums/artist/sorted'
            }),
            providesTags: result => ['Album']
        }),
        fetchAlbumById: build.query<albumDto, string>({
            query: (aId) => ({
                url: `albums/${aId}/current`
            }),
            providesTags: result => ['Album']
        }),
        addAlbum: build.mutation({
            query: (body) => ({
                url: 'albums/drop',
                method: 'POST',
                body: body,
                formData: true
            }),
            invalidatesTags: result => ['Album']
        }),
        addGenreToAlbum: build.mutation({
           query: ({aId, ...genre}) => ({
               url: `albums/genre/${aId}/add`,
               method: 'POST',
               body: genre,
               responseHandler: (response) => response.text()
           }),
           invalidatesTags: result => ['Album', 'Genre']
        }),
        editAlbumDescription: build.mutation({
            query: ({aId, ...body}) => ({
                url: `albums/edit/${aId}/description`,
                method: 'PATCH',
                body: body,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Album']
        }),
        editAlbumImage: build.mutation({
            query: ({aId, image}) => ({
                url: `albums/edit/${aId}/image`,
                method: 'PATCH',
                file: image,
                body: image,
                formData: true,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Album']
        }),
        addAlbumToUserCollection: build.mutation({
            query: (pId) => ({
                url: `albums/collection/${pId}/add`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Album', 'User']
        }),
        removeAlbumFromUserCollection: build.mutation({
            query: (pId) => ({
                url: `albums/collection/${pId}/remove`,
                method: 'POST',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Album', 'User']
        }),
        addTrackToAlbum: build.mutation({
           query: ({aId, ...tId}) => ({
               url: `albums/track/${aId}/add`,
               method: 'PATCH',
               body: tId,
               responseHandler: (response) => response.text()
           }),
            invalidatesTags: result => ['Album', 'Track', 'User']
        }),
        removeGenreFromAlbum: build.mutation({
            query: ({aId, ...genre}) => ({
                url: `albums/genre/${aId}/remove`,
                method: 'POST',
                body: genre,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Album', 'Genre']
        }),
        removeTrackFromAlbum: build.mutation({
           query: ({aId, ...tId}) => ({
               url: `albums/track/${aId}/remove`,
               method: 'PATCH',
               body: tId,
               responseHandler: (response) => response.text()
           }),
            invalidatesTags: result => ['Album', 'Track', 'User']
        }),
        deleteAlbum: build.mutation({
            query: (aId) => ({
                url: `albums/${aId}`,
                method: 'DELETE',
                responseHandler: response => response.text()
            }),
            invalidatesTags: result => ['Album']
        })
    })
})

export const {
    useFetchAllAlbumQuery,
    useFetchAllAlbumAndSearchQuery,
    useFetchMostLikedAlbumQuery,
    useFetchArtistsAlbumsQuery,
    useFetchArtistsAlbumsAndSearchQuery,
    useFetchArtistsSortedAlbumsQuery,
    useFetchAlbumByIdQuery,
    useAddAlbumMutation,
    useAddGenreToAlbumMutation,
    useEditAlbumDescriptionMutation,
    useEditAlbumImageMutation,
    useAddAlbumToUserCollectionMutation,
    useRemoveGenreFromAlbumMutation,
    useRemoveAlbumFromUserCollectionMutation,
    useAddTrackToAlbumMutation,
    useRemoveTrackFromAlbumMutation,
    useDeleteAlbumMutation
} = AlbumApi