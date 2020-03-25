import { ScreenSize } from './store';

export const SET_MEDIA_QUERY_INIT_STATE = {
    id: 'SET_MEDIA_QUERY_INIT_STATE',
    make: () => ({type: SET_MEDIA_QUERY_INIT_STATE.id, payload: null})
};

export const SET_SCREEN_SIZE = {
    id: 'SET_SCREEN_SIZE',
    make: (size: ScreenSize) => ({type: SET_SCREEN_SIZE.id, payload: size})
};
