import {jwtDecode} from "jwt-decode";
import {ErrorMessage} from "../enums/ErrorMessage";

const decodeToken = (token: string) => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error(ErrorMessage.ERROR_DECODING_TOKEN, error);
        return null;
    }
}

export const validateTokenOrThrow = (token: string) => {
    if (!token) {
        throw new Error(ErrorMessage.NO_TOKEN_PRESENT);
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken) {
        throw new Error(ErrorMessage.TOKEN_INVALID);
    }
    if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error(ErrorMessage.TOKEN_EXPIRED);
    }
};

