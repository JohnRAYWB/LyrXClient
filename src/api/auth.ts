import axios from "@/core/axios";
import {signInDto, signInResponseDto, signUpDto, signUpResponseDto, User} from "@/api/dto/auth.dto";
import {destroyCookie} from "nookies";

export const signIn = async (values: signInDto): Promise<signInResponseDto> => {
    return (await axios.post('/auth/login', values)).data
}

export const signUp = async (values: signUpDto): Promise<signUpResponseDto> => {
    return (await axios.post('/auth/reg', values)).data
}

export const getProfile = async (): Promise<User> => {
    return (await axios.get('/users/profile')).data
}

export const logout = async () => {
    destroyCookie(null, '_token', {path: '/'})
}