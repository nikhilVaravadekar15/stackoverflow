
export type TEmail = {
    email: string
}

export type TUserAuth = TEmail & {
    password: string
}

export type TUSerSignUp = TUserAuth & {
    username: string
}

export type TOtp = {
    otp: string
}

export type TVerifyOtp = TEmail & TOtp & {
    hash: string
}
