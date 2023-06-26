import axios from "@/core/axios";
import {trackDto, tracksListDto} from "@/api/dto/track.dto";

export const tracks = async (): Promise<tracksListDto> => {
    return (await axios.get('tracks')).data
}

export const track = async (): Promise<trackDto> => {
    return (await axios.get('/tracks/:id/current')).data
}