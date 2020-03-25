import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { combineReducers } from 'redux';
import { IUserState, USER_INIT_STATE, userReducer } from './auth/store/store';
import { IMediaStore, MEDIA_INIT_STATE, mediaQueryReducer } from './common/directives/media-query/store/store';

export interface Action<T> {
    type: string;
    payload: T;
}

export interface IAppState {
    user: IUserState;
    media: IMediaStore;
}

export const INITIAL_STATE: IAppState = {
    user: USER_INIT_STATE,
    media: MEDIA_INIT_STATE,
};

const appReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
        user: userReducer,
        media: mediaQueryReducer,
    })
);

export const rootReducer = (state: IAppState, action): IAppState => {
    return appReducer(state, action);
};
