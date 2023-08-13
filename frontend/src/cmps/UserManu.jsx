import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authActions'

export function UserManu({ closeFunc }) {

    const dispatch = useDispatch()

    const onLogout = () => {
        // console.log('logout')
        dispatch(logout())
    }


    return (
        <div className="user-manu" onClick={closeFunc}>
            <div>My Profile</div>
            <div>Main app (demo)</div>
            <div></div>
            <div onClick={onLogout}>Logout</div>
        </div>
    )
}
