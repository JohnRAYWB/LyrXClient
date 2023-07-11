import axios from "@/core/axios";
import {trackDto} from "@/api/dto/track.dto";

export const tracks = async (): Promise<trackDto[]> => {
    return (await axios.get('http://localhost:4221/tracks')).data
}

export const track = async (): Promise<trackDto> => {
    return (await axios.get('/tracks/:id/current')).data
}