import {authService} from '../../services/authService'
// import { userService } from '../../services/userService'

export function login(userCreds) {
    return async dispatch => {
      try {
        const user = await authService.login(userCreds)
        dispatch({ type: 'SET_USER', user })
        return user
      } catch (err) {
        dispatch({type: 'SET_ERROR', err})
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
        return user
      } catch (err) {
        dispatch({type: 'SET_ERROR', err})
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
        dispatch({type: 'SET_ERROR', err})
        console.log('UserActions: err in logout', err)
      }
    }
  }