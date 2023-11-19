import {authURL} from "@utils/constants";


export const fetchLogin = `${authURL}/sign/in`;

export const fetchRegistration = `${authURL}/sign/up`;

export const fetchPasswordReset = (email) => `${authURL}/password/reset/${email}`;


export const fetchEmail = (email) => `${authURL}/resend/${email}`;

export const fetchAuthVerify = (uuid) => `${authURL}/email/confirm/${uuid}`;

export const fetchAuthPasswordReset = (uuid) => `${authURL}/password/change/${uuid}`;


export const fetchAuthSignOut = `${authURL}/sign/out`;


export const refreshTokens = `${authURL}/token/refresh`;
