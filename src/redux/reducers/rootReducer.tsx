import { combineReducers } from 'redux'

import { articleReducer, profileReducer } from './articleReducer'

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  articles: articleReducer,
  profile: profileReducer,
})
