import React, { useEffect } from 'react'
import { AuthFormCmp } from '../cmps/AuthFormCmp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/authActions'

export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    // const error = useSelector(state => state.errorModule.error)

    const onLogin = (userCredentials) => {
        dispatch(login(userCredentials))
    }

    useEffect(() => {

        //TODO - if there is an error show error modal/ msg.
        console.log(loggedInUser)
        if (loggedInUser) {
            console.log('logged in!');
            //if i try to go back it navigates me back to the users page, IS THIS A PROBLEM??
            navigate('/user/1')
        }
    }, [loggedInUser, navigate])

    const bottomLine = <div>
        Don't have an account yet? <Link to="/">Register</Link>
    </div>

    return (
        <div className="auth-container">
            {/* {error && <div>{error}</div>} */}
            {/* {error && <ErrorModal error={error} />} */}
            <AuthFormCmp type="login" title="Login" btnTxt="Login" submitFunc={onLogin} bottomLine={bottomLine} />
        </div>
    )
}
