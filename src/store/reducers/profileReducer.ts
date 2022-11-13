import { ProfileState } from '../../components/interfaces'
import { ProfileActions, ProfileActionTypes } from '../actions/actionCreators'

const initialState = {
  registration: false,
  isLogin: false,
  error: null,
}

export const profileReducer = (
  state: ProfileState = initialState,
  action: ProfileActions
): ProfileState => {
  switch (action.type) {
  case ProfileActionTypes.LOGIN_SUCCESS:
    return {
      ...state,
      isLogin: true,
    }
  case ProfileActionTypes.REGISTRATION_SUCCESS:
    return {
      ...state,
      registration: !state.registration
    }
  case ProfileActionTypes.LOG_OUT:
    return {
      ...state,
      isLogin: false,
    }
  case ProfileActionTypes.PROFILE_EDITED:
    return {
      ...state
    }

  case ProfileActionTypes.ARTICLE_POST_SUCCESS:
    return {
      ...state,
    }
  case ProfileActionTypes.ARTICLE_UPDATE_SUCCESS:
    return {
      ...state,
    }
  default:
    return {
      ...state
    }
  }
}
