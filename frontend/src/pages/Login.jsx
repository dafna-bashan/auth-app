import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/authActions'
import { FormAuth } from '../cmps/FormAuth'

export function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const onLogin = (userCredentials) => {
        dispatch(login(userCredentials))
    }

    useEffect(() => {
        console.log(loggedInUser)
        if (loggedInUser?._id) {
            console.log('logged in!');
            navigate('/user')
        }
    }, [loggedInUser, navigate])

    const bottomLine = <div>
        Don't have an account yet? <Link to="/">Register</Link>
    </div>

    return (
        <div className="auth-container">
            <FormAuth type="login" title="Login" btnTxt="Login" submitFunc={onLogin} bottomLine={bottomLine} />

        </div>
    )
}
