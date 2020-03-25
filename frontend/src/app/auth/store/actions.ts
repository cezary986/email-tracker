
export const SET_USER_INIT_STATE = {
    id: 'SET_USER_INIT_STATE',
    make: () => ({type: SET_USER_INIT_STATE.id, payload: null})
};

export const SET_USER_LOGGED_IN = {
    id: 'SET_USER_LOGGED_IN',
    make: (loggedIn: boolean) => ({type: SET_USER_LOGGED_IN.id, payload: loggedIn})
};

export const SET_USER_ROLE = {
    id: 'SET_USER_ROLE',
    make: (role: string) => ({type: SET_USER_ROLE.id, payload: role})
};

export const SET_USER_USERNAME = {
    id: 'SET_USER_USERNAME',
    make: (username: string) => ({type: SET_USER_USERNAME.id, payload: username})
};
