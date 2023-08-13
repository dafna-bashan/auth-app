import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/actions/authActions'
import { FormAuth } from '../cmps/FormAuth'

export function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const onSignUp = (userCredentials) => {
        dispatch(signup(userCredentials))
    }

    useEffect(() => {
        // console.log(loggedInUser)
        if (loggedInUser?._id) {
            // console.log('signed in!');
            navigate('/user')
        }
    }, [loggedInUser, navigate])


    const bottomLine = <div>
        Already a member? <Link to="/login">Login</Link>
    </div>

    return (
        <div className="auth-container">
            <FormAuth type="signup" title="Join us!" btnTxt="Register" submitFunc={onSignUp} bottomLine={bottomLine} />
        </div>
    )
}
