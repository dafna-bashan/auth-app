import React from 'react'
// import { useDispatch, useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { logout } from '../store/actions/authActions'

export const UserManu = ({ closeFunc, onLogout }) => {

    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    // const onLogout = () => {
    //     console.log('logout')
    //     dispatch(logout())
    // }

    // useEffect(() => {
    //     if (!loggedInUser) navigate('/login')
    //   }, [loggedInUser, navigate])


    return (
        // <div className={isManuOpen? 'user-manu': 'user-manu none'} onClick={closeFunc}>
        <div className="user-manu"  onClick={closeFunc}>

            <div>My Profile</div>
            <div>Group Chat</div>
            <div></div>
            <div onClick={onLogout}>Logout</div>
        </div>
    )
}
