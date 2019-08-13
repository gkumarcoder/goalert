import { SET_USER_SETTINGS_OPEN } from '../actions'

const initialState = () => {
  return {
    userSettingsOpen: false,
  }
}

/*
 * Updates state depending on what action type given
 *
 * Returns the immutable final state afterwards (reduce)
 */
export default function userReducer(state = initialState(), action) {
  switch (action.type) {
    case SET_USER_SETTINGS_OPEN: {
      return {
        ...state,
        userSettingsOpen: action.payload,
      }
    }
  }

  return state
}
