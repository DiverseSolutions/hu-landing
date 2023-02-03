import Cookies from "js-cookie"

type StoreAuthCookieParams = {
    cognito: {
        idToken: {
            value: string;
            expiresIn: number;
        };
        accessToken: {
            value: string;
            expiresIn: number;
        };
    },
    ardArt: {
        accessToken: {
            value: string;
            expiresIn: number;
        },
        accountId: {
            value: number;
            expiresIn: number;
        }
    },
}

export const storeAuthCookie = (params: StoreAuthCookieParams) => {
    Cookies.set("cognitoIdToken", params.cognito.idToken.value, { expires: params.cognito.idToken.expiresIn });
    Cookies.set("cognitoAccessToken", params.cognito.accessToken.value, { expires: params.cognito.accessToken.expiresIn });
    Cookies.set("ardArtAccessToken", params.ardArt.accessToken.value, { expires: params.ardArt.accountId.expiresIn });
    Cookies.set("ardArtAccountId", params.ardArt.accountId.value.toString(), { expires: params.ardArt.accountId.expiresIn });
}

export const clearAuthcookie = () => {
    Cookies.remove('cognitoIdToken');
    Cookies.remove('cognitoAccessToken');
    Cookies.remove('ardArtAccessToken');
    Cookies.remove('ardArtAccountId');
}

export const getArdArdAccessToken = () => Cookies.get('ardArtAccessToken')