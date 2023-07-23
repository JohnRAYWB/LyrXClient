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
        fetchMostLikedTrack: build.query<trackDto, trackDto>({
            query: () => ({
                url: `tracks/top`,
            }),
            providesTags: result => ['Track']
        }),
        fetchTrackById: build.query<trackDto, string>({
            query: (tId) => ({
                url: `tracks/${tId}/current`
            }),
            providesTags: result => ['Track', 'User']
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
        })
    })
})

export const {
    useFetchAllTrackAndSearchQuery,
    useFetchMostLikedTrackQuery,
    useFetchTrackByIdQuery,
    useLeaveCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation
} = TrackApi
