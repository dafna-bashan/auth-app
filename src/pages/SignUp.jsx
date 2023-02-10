import React from 'react'
import { AuthFormCmp } from '../cmps/AuthFormCmp'
import { Link, useNavigate } from 'react-router-dom'

export const SignUp = () => {

    const navigate = useNavigate()

    const onSignUp = (ev) => {
        // ev.preventDefault()
        console.log('signed up!');
        navigate('/login')
    }

    const bottomLine = <div>
        Already a member? <Link to="/login">Login</Link>
    </div>

    return (
        <div className="auth-container">
            <AuthFormCmp type="signup" title="Join us!" btnTxt="Register" func={onSignUp} bottomLine={bottomLine} />
        </div>
    )
}
