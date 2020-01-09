import { LOGIN, SIGNUP, LOGOUT } from "../actions/auth"

const initialState = {
  token: null,
  uid: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        uid: action.uid
      }
    case SIGNUP:
      return {
        token: action.token,
        uid: action.uid
      }
    case LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}
