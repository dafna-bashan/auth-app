import {authService} from '../../services/authService'

export function login(userCreds) {
    return async dispatch => {
      try {
        const user = await authService.login(userCreds)
        dispatch({ type: 'SET_USER', user })
        return user
      } catch (err) {
        console.log('UserActions: err in login', err)
        throw err
      }
    }
  }
  export function signup(userCreds) {
    return async dispatch => {
      try {
        const user = await authService.signup(userCreds)
        dispatch({ type: 'SET_USER', user })
        dispatch({ type: 'SET_USERS', user })
      } catch (err) {
        console.log('UserActions: err in signup', err)
      }
    }
  }
  export function logout() {
    return async dispatch => {
      try {
        await authService.logout()
        dispatch({ type: 'SET_USER', user: null })
      } catch (err) {
        console.log('UserActions: err in logout', err)
      }
    }
  }