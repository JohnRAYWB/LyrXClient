export type signInDto = {
    readonly email: string,
    readonly password: string
}

export type signInResponseDto = {
    readonly access_token: string
}

export type signUpDto = signInDto & {username: string}

export type signUpResponseDto = signInResponseDto

export type responseUserDto = {
    access_token: string
}