import axios from "@/core/axios";
import {responseUserDto, signInDto, signUpDto} from "@/api/dto/auth.dto";
import {destroyCookie} from "nookies";
import {userDto} from "@/api/dto/user.dto";

export const signIn = async (values: signInDto): Promise<responseUserDto> => {
    return (await axios.post('/auth/login', values)).data
}

export const signUp = async (values: signUpDto): Promise<responseUserDto> => {
    return (await axios.post('/auth/reg', values)).data
}

export const getProfile = async (token: string) => {
    const {data} = await axios.get<userDto>('/users/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}