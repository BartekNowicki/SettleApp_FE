import {logout} from "../store/logOutSlice.ts";
import {jwtDecode} from "jwt-decode";

const decodeToken = (token: string) => {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export const validateTokenOrThrow = (token: string, dispatch) => {
    if (!token) {
        dispatch(logout());
        throw new Error('No token present');
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
        dispatch(logout());
        throw new Error('Token expired');
    }
};

