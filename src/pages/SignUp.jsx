import React from 'react'
import { AuthFormCmp } from '../cmps/AuthFormCmp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/authActions'

export const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSignUp = async (userCredentials) => {
        try {
            dispatch(signup(userCredentials))
        } catch (err) {
            console.log('error in signup', err);
        }

        console.log('signed up!');
        navigate('/login')
    }

    const bottomLine = <div>
        Already a member? <Link to="/login">Login</Link>
    </div>

    return (
        <div className="auth-container">
            <AuthFormCmp type="signup" title="Join us!" btnTxt="Register" submitFunc={onSignUp} bottomLine={bottomLine} />
        </div>
    )
}
