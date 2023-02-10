import React from 'react'
import { AuthFormCmp } from '../cmps/AuthFormCmp'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()

    const onLogin = (ev) => {
        // ev.preventDefault()
        console.log('logged in!');
        navigate('/user/1')
    }

    const bottomLine = <div>
        Don't have an account yet? <Link to="/">Register</Link>
    </div>

    return (
        <div className="auth-container">
            <AuthFormCmp type="login" title="Login" btnTxt="Login" func={onLogin} bottomLine={bottomLine} />
        </div>
    )
}
