export interface signInDto {
    readonly email: string,
    readonly password: string
}

export interface signInResponseDto {
    readonly access_token: string
}

export type signUpDto = signInDto & {username: string}

export type signUpResponseDto = signInResponseDto