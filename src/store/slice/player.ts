import {trackDto} from "@/api/dto/track.dto";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "@/store/store";

export interface Player {
    tracksList: trackDto[]
    currentIndex: number
    currentTrack: trackDto
    isActive: boolean
    isPlaying: boolean
}

const initialState: Player = {
    tracksList: [],
    currentIndex: 0,
    currentTrack: null,
    isActive: false,
    isPlaying: false
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<Player>) => {
            state.tracksList = action.payload.tracksList
            state.currentIndex = action.payload.currentIndex
            state.currentTrack = action.payload.currentTrack
            state.isActive = action.payload.isActive
            state.isPlaying = action.payload.isPlaying

            localStorage.setItem('player', JSON.stringify({
                tracksList: state.tracksList,
                currentIndex: state.currentIndex,
                currentTrack: state.currentTrack,
                isActive: state.isActive,
                isPlaying: state.isPlaying
            }))
        },
        setChangeTrack: (state, action) => {
            state.currentTrack = state.tracksList[action.payload]
            state.currentIndex = action.payload
            state.isActive = true
            localStorage.setItem('player', JSON.stringify({
                tracksList: state.tracksList,
                currentIndex: state.currentIndex,
                currentTrack: state.currentTrack,
                isActive: state.isActive,
                isPlaying: state.isPlaying
            }))
        },
        setPlayPause: (state, action) => {
            state.isPlaying = action.payload
        },
        resetTracksList: (state, action) => {
            state.tracksList = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ...action.payload.player
                }
            })
    }
})

export const {setCurrentTrack, setChangeTrack, setPlayPause, resetTracksList} = playerSlice.actions

export const selectTrackData = (state: RootState) => state.player

export const {reducer: playerReducer} = playerSlice