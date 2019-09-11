import {combineReducers} from 'redux'

import {UPDATE_CURRENT_PICTURE} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const currentPictureReducer = (state = [], action) => {
  if (action.type === UPDATE_CURRENT_PICTURE) return [...state, action.payload]
  return state
}

const reducer = combineReducers({
  currentPicture: currentPictureReducer,
})

export default reducer
