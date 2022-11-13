import { combineReducers } from 'redux'

import { articleReducer } from './articleReducer'
import { profileReducer } from './profileReducer'

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  articles: articleReducer,
  profile: profileReducer,
})
