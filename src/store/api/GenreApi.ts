import {apiSlice} from "@/store/api/apiSlice";
import {genreDto} from "@/api/dto/genre.dto";

export const GenreApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllGenre: build.query<genreDto[], void>({
            query: () => ({
                url: `genres`,
            }),
            providesTags: result => ['Genre']
        }),
        fetchGenreById: build.query<genreDto, string>({
            query: (gId) => ({
                url: `genres/${gId}`
            }),
            providesTags: result => ['Genre']
        }),
        createGenre: build.mutation({
            query: ({...body}) => ({
                url: 'genres',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: result => ['Genre']
        })
    })
})

export const {
    useFetchAllGenreQuery,
    useFetchGenreByIdQuery,
    useCreateGenreMutation
} = GenreApi