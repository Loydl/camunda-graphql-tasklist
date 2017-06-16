import jwt_decode from 'jwt-decode';

const setToken = (token) => {
    localStorage.setItem('id_token', token);
};

const getToken = () => {
    return localStorage.getItem('id_token');
};

const loggedIn = () => {
    const jwt = !!getToken() ? jwt_decode(getToken()) : {};

    return(!!getToken() && jwt.exp > Date.now() / 1000);
};

const logout = () => {
    localStorage.removeItem('id_token');
};

export { setToken, getToken, loggedIn, logout };