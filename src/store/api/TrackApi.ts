import {apiSlice} from "@/store/api/apiSlice";
import {trackDto} from "@/api/dto/track.dto";

export const TrackApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllTracks: build.query<trackDto[], number>({
            query: (page) => ({
                url: `tracks?limit=10&page=${page * 10}`,
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
        fetchAllTrackAndSearch: build.query<trackDto[], string>({
            query: (query) => ({
                url: `tracks/search?name=${query}`,
            }),
            providesTags: result => ['Track']
        }),
        fetchMostLikedTrack: build.query<trackDto[], void>({
            query: () => ({
                url: `tracks/top`,
            }),
            providesTags: result => ['Track']
        }),
        fetchMostListensTrack: build.query<trackDto[], void>({
            query: () => ({
                url: `tracks/listen`,
            }),
            providesTags: result => ['Track']
        }),
        fetchArtistsTracks: build.query<trackDto[], number>({
            query: (page) => ({
                url: `tracks/artist?limit=10&page=${page * 10}`
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
        fetchArtistsTracksAndSearch: build.query<trackDto[], string>({
            query: (name) => ({
                url: `tracks/artist/search?name=${name}`
            }),
            providesTags: result => ['Track']
        }),
        fetchArtistsSortedTracks: build.query<trackDto[], string>({
            query: (sort) => ({
                url: `tracks/artist/sorted?sort=${sort}`
            }),
            providesTags: result => ['Track']
        }),
        fetchArtistSinglesAndSearch: build.query<trackDto[], string>({
            query: (name) => ({
                url: `tracks/artist/single/search?name=${name}`
            }),
            providesTags: result => ['Track']
        }),
        fetchTrackById: build.query<trackDto, string>({
            query: (tId) => ({
                url: `tracks/${tId}/current`
            }),
            providesTags: result => ['Track', 'User']
        }),
        addTrack: build.mutation({
            query: (body) => ({
                url: 'tracks',
                method: 'POST',
                body: body,
                formData: true
            }),
            invalidatesTags: result => ['Track']
        }),
        incrementListens: build.mutation({
            query: (tId) => ({
                url: `tracks/listens/${tId}`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
        addGenreToTrack: build.mutation({
            query: ({tId, ...genres}) => ({
                url: `tracks/genre/${tId}/add`,
                method: `POST`,
                body: genres,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track', 'Genre']
        }),
        addTrackToUserCollection: build.mutation({
            query: (tId) => ({
                url: `tracks/collection/${tId}/add`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User', 'Track']
        }),
        addTrackToPlaylist: build.mutation({
            query: ({tId, ...pId}) => ({
                url: `tracks/playlist/${tId}/add`,
                method: 'POST',
                body: pId,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track', 'Playlist']
        }),
        editTrackDescription: build.mutation({
            query: ({tId, ...body}) => ({
                url: `tracks/${tId}/current/description`,
                method: 'PATCH',
                body: body,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
        editTrackAudio: build.mutation({
            query: ({tId, audio}) => ({
                url: `tracks/${tId}/current/audio`,
                method: 'PATCH',
                file: audio,
                body: audio,
                formData: true,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
        editTrackImage: build.mutation({
            query: ({tId, image}) => ({
                url: `tracks/${tId}/current/image`,
                method: 'PATCH',
                file: image,
                body: image,
                formData: true,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
        editTrackArtist: build.mutation({
            query: ({tId, ...uId}) => ({
                url: `tracks/${tId}/current/artist`,
                method: 'PATCH',
                body: uId,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track', 'User']
        }),
        removeGenreFromTrack: build.mutation({
            query: ({tId, ...genres}) => ({
                url: `tracks/genre/${tId}/remove`,
                method: `POST`,
                body: genres,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track', 'Genre']
        }),
        removeTrackFromUserCollection: build.mutation({
            query: (tId) => ({
                url: `tracks/collection/${tId}/remove`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User', 'Track']
        }),
        removeTrackFromPlaylist: build.mutation({
            query: ({tId, ...pId}) => ({
                url: `tracks/playlist/${tId}/remove`,
                method: 'POST',
                body: pId,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track', 'Playlist']
        }),
        leaveComment: build.mutation({
            query: ({tId, ...text}) => ({
                url: `tracks/comment/${tId}`,
                method: 'POST',
                body: text,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
        editComment: build.mutation({
            query: ({cId, ...text}) => ({
                url: `tracks/comment/${cId}/edit`,
                method: 'PATCH',
                body: text,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track', 'User']
        }),
        deleteComment: build.mutation({
            query: (cId) => ({
                url: `tracks/comment/${cId}/delete`,
                method: 'DELETE',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
        deleteTrack: build.mutation({
            query: (tId) => ({
                url: `tracks/${tId}`,
                method: 'DELETE',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['Track']
        }),
    })
})

export const {
    useFetchAllTracksQuery,
    useFetchAllTrackAndSearchQuery,
    useFetchMostLikedTrackQuery,
    useFetchMostListensTrackQuery,
    useFetchArtistsTracksQuery,
    useFetchArtistsTracksAndSearchQuery,
    useFetchArtistsSortedTracksQuery,
    useFetchArtistSinglesAndSearchQuery,
    useFetchTrackByIdQuery,
    useAddTrackMutation,
    useIncrementListensMutation,
    useAddGenreToTrackMutation,
    useAddTrackToUserCollectionMutation,
    useAddTrackToPlaylistMutation,
    useEditTrackDescriptionMutation,
    useEditTrackAudioMutation,
    useEditTrackImageMutation,
    useEditTrackArtistMutation,
    useRemoveGenreFromTrackMutation,
    useRemoveTrackFromUserCollectionMutation,
    useRemoveTrackFromPlaylistMutation,
    useLeaveCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
    useDeleteTrackMutation
} = TrackApi
