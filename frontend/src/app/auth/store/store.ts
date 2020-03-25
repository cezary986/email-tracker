import {
    SET_USER_INIT_STATE,
    SET_USER_LOGGED_IN,
    SET_USER_ROLE,
    SET_USER_USERNAME
} from './actions';
import { Action } from 'src/app/store';
import { UserRole } from 'src/app/common/models/user-role-response';

export interface IUserState {
    profile: {username: string}; // TODO potem zmienić na klase użytkownika
    loggedIn: boolean;
    role: UserRole;
}

export const USER_INIT_STATE: IUserState = {
    profile: null,
    loggedIn: false,
    role: null,
};

function setUserLoggedIn(state: IUserState, action: Action<boolean>): IUserState {
    if (!action.payload) {
        return USER_INIT_STATE;
    } else {
        return {
            ...state,
            loggedIn: true
        };
    }
}

function setUserRole(state: IUserState, action: Action<UserRole>): IUserState {
    return {
        ...state,
        role: action.payload
    };
}

function setUserUsername(state: IUserState, action: Action<string>): IUserState {
    return {
        ...state,
        profile: {
            ...state.profile,
            username: action.payload
        }
    };
}

export function userReducer(state: IUserState = USER_INIT_STATE, action): IUserState {
    switch (action.type) {
        case SET_USER_INIT_STATE.id: return state = USER_INIT_STATE;
        case SET_USER_LOGGED_IN.id: return setUserLoggedIn(state, action);
        case SET_USER_ROLE.id: return setUserRole(state, action);
        case SET_USER_USERNAME.id: return setUserUsername(state, action);
    }
    return state;
}
