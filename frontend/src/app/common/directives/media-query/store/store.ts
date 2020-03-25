import { Action } from 'src/app/store';
import { SET_MEDIA_QUERY_INIT_STATE, SET_SCREEN_SIZE } from './actions';

export enum ScreenSize {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP'
}

export type IMediaStore = ScreenSize;

export const MEDIA_INIT_STATE: IMediaStore = null;

function setScreenSize(state: IMediaStore, action: Action<ScreenSize>): IMediaStore {
    return JSON.parse(JSON.stringify(action.payload));
}


export function mediaQueryReducer(state: IMediaStore = MEDIA_INIT_STATE, action): IMediaStore {
    switch (action.type) {
        case SET_MEDIA_QUERY_INIT_STATE.id: return state = MEDIA_INIT_STATE;
        case SET_SCREEN_SIZE.id: return setScreenSize(state, action);
    }
    return state;
}
