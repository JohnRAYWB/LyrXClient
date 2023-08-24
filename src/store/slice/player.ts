import {trackDto} from "@/api/dto/track.dto";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "@/store/store";

interface Player {
    tracksList: []
    activeTrack: trackDto
    isPlaying: boolean
}

const initialState: Player = {
    tracksList: [],
    activeTrack: null,
    isPlaying: false
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerTrack: (state, action: PayloadAction<Player>) => {
            state.tracksList = action.payload.tracksList
            state.activeTrack = action.payload.activeTrack
            state.isPlaying = action.payload.isPlaying
        },
        setPlayPause: (state, action) => {
            state.isPlaying = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
    }
})

export const {setPlayerTrack, setPlayPause} = playerSlice.actions

export const selectTrackData = (state: RootState) => state.player

export const {reducer: playerReducer} = playerSlice