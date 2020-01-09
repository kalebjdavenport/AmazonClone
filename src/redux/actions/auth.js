import { AsyncStorage } from 'react-native'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

const API_KEY = `AIzaSyDOaMemOTpMzZsWccJdDgXbJoF-aQvgYHg`
let timer

export const authenticate = (uid, token, expiration) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiration))
    dispatch({ type: AUTHENTICATE, uid, token })
  }
}

export const signup = (email, password) => async dispatch => {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    })
  })

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const resData = await res.json()
  dispatch(authenticate(resData.uid, resData.token, parseInt(resData.expiresIn) * 1000))
  const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
  saveDateToStorage(resData.idToken, resDate.localId, expirationDate)
}

export const login = (email, password) => async (dispatch, getState) => {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    })
  })

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const resData = await res.json()
  dispatch(authenticate(resData.uid, resData.token))
  const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
  saveDateToStorage(resData.idToken, resData.localId, expirationDate)
}

const setLogoutTimer = (expiration) => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expiration)
  }

}

export const logout = () => {
  clearTimeout(timer)
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const saveDateToStorage = (token, uid, expiration) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    uid,
    expiration: expiration.toISOString()
  }))
}
