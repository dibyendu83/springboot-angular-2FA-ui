export interface signupRequest {
    "firstname": string,
    "lastname": string,
    "email": string,
    "password": string,
    "phoneNo": string,
    "address": string,
    "sex": string,
    "dob": string,
}

export interface loginRequest {
    "email": string,
    "password": string
}

export interface loginResponse {
    "name": string,
    "firstname": string,
    "lastname": string,
    "email": string,
    "phoneNo": string,
    "address": string,
    "sex": string,
    "accessToken": string,
    "authenticated": boolean,
    "lastLogIn": string,
    "dob": string,
    "twoFactorAuthEnabled": boolean,
    "qrCodeUrl": string
}

export interface updateProfileRequest {
    "firstname": string,
    "lastname": string,
    "email": string,
    "phoneNo": string,
    "address": string,
    "sex": string,
    "dob": string
}

export interface TwoFactorAuthResponse {
    "id": Number,
    "email": string,
    "qrCodeUrl": string,
    "enabled": boolean
}

export interface TwoFactorAuthRequest {
    "username": string,
    "otpCode": string
}

