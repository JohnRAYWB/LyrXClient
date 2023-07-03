export interface signInDto {
    email: string,
    password: string
}

export interface signInResponseDto {
    access_token: string
}

export type signUpDto = signInDto & {username: string}

export type signUpResponseDto = signInResponseDto