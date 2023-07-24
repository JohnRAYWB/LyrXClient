import {apiSlice} from "@/store/api/apiSlice";
import {genreDto} from "@/api/dto/genre.dto";

export const GenreApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        fetchAllGenre: build.query<genreDto[], number>({
            query: (page) => ({
                url: `genres?limit=20&page=${page}`,
            }),
            providesTags: result => ['Genre']
        }),
        fetchGenreById: build.query<genreDto, string>({
            query: (gId) => ({
                url: `genres/${gId}`
            }),
            providesTags: result => ['Genre']
        })
    })
})

export const {useFetchAllGenreQuery, useFetchGenreByIdQuery} = GenreApi