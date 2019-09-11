// action types
export const UPDATE_CURRENT_PICTURE = 'UPDATE_CURRENT_PICTURE'
export const UPDATE_CART = 'UPDATE_CART'

// action creators
export const updateCurrent = newUrl => ({
  type: UPDATE_CURRENT_PICTURE,
  payload: newUrl,
})
