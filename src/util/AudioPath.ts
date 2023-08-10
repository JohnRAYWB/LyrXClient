import {trackDto} from "@/api/dto/track.dto";

export const trackAudioPath = (track: trackDto) => `http://localhost:4221/track/${track.name[0]}/${track.audio}`