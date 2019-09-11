import {createStore} from 'redux'
import currentPictureReducer from './reducer'

const store = createStore(currentPictureReducer)

console.log(store.getState())

export default store
