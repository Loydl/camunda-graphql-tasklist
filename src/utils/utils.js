import jwt_decode from 'jwt-decode';

const login = (token) => {
    setToken(token);
    setProfile(JSON.stringify(jwt_decode(token)));
};

const setProfile = (profile) => {
    localStorage.setItem('profile', profile);
};

const setToken = (token) => {
    localStorage.setItem('id_token', token);
};

const getToken = () => {
    return localStorage.getItem('id_token');
};

const getProfile = () => {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : {};
};

const loggedIn = () => {
    const jwt = !!getToken() ? jwt_decode(getToken()) : {};

    return(!!getToken() && jwt.exp > Date.now() / 1000);
};

const logout = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
};

const getType = (type) => {
    const types = {
        string: 'String',
        integer: 'Int',
        number: 'Float',
        boolean: 'Boolean'
    };

    return types[type];
};

export { setToken, getToken, loggedIn, logout, getType, login, getProfile };