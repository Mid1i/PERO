import axios from "axios";

import {authURL} from "@utils/constants";


export async function fetchRegistration(user) {
    const {data} = await axios.post(`${authURL}/sign_up`, user);
    return data;
}

export async function fetchEmailConfirming(email) {
    const {data} = await axios.post(`${authURL}/send_again/${email}`, {"typeLink": "CONFIRM_LINK"});
    return data;
}

export async function fetchLogin({userData, browser, device}) {
    const {data} = await axios({
        url: `${authURL}/sign_in`,
        method: `post`,
        data: userData,
        headers: {
            'X-Browser': browser,
            'X-Device': device
        }
    });

    return data;
}

export async function fetchTokens({uuid, browser, device}) {
    const {data} = await axios({
        url: `${authURL}/confirm_email/${uuid}`, 
        method: `put`,
        data: {}, 
        headers: {
            'X-Browser': browser,
            'X-Device': device
        }
    });
    return data;
}
