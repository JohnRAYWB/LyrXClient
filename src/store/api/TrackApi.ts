import {apiSlice} from "@/store/api/apiSlice";
import {trackDto} from "@/api/dto/track.dto";

export const TrackApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
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
        fetchTrackById: build.query<trackDto, string>({
            query: (tId) => ({
                url: `tracks/${tId}/current`
            }),
            providesTags: result => ['Track', 'User']
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
        addTrackToUserCollection: build.mutation({
            query: (tId) => ({
                url: `tracks/collection/${tId}/add`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User', 'Track']
        }),
        removeTrackFromUserCollection: build.mutation({
            query: (tId) => ({
                url: `tracks/collection/${tId}/remove`,
                method: 'POST',
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: result => ['User', 'Track']
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
            query: ({tId, ...uId}) => ({
                url: ``
            })
        }),
    })
})

export const {
    useFetchAllTrackAndSearchQuery,
    useFetchMostLikedTrackQuery,
    useFetchMostListensTrackQuery,
    useFetchTrackByIdQuery,
    useEditTrackArtistMutation,
    useAddTrackToUserCollectionMutation,
    useRemoveTrackFromUserCollectionMutation,
    useLeaveCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation
} = TrackApi
