import {authURL} from "@utils/constants";


export const fetchRegistration = `${authURL}/sign/up`;

export const fetchLogin = `${authURL}/sign/in`;

export const fetchEmail = (email) => `${authURL}/resend/${email}`;

export const fetchAuthVerify = (uuid) => `${authURL}/email/confirm/${uuid}`;

export const fetchAuthSignOut = `${authURL}/sign/out`;
