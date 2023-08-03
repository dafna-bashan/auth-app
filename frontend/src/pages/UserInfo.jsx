import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'
import userImg from '../assets/img/noun-user-103879.png'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../store/actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

export function UserInfo() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser(loggedInUser._id))
    }, [])

    useEffect(() => {
        if (!loggedInUser?._id) navigate('/login')
        else dispatch({ type: 'RESTART' })
    }, [loggedInUser, navigate])


    if (!loggedInUser?._id) return <div></div>

    const { firstName, lastName, bio, phone, address, imgUrl = userImg, email } = loggedInUser
    return (
        <React.Fragment>
            <NavBar />
            <div className="user-info">
                <div className="center">
                    <div className="title">Personal info</div>
                    <div className="subtitle">Basic info, like your name and photo</div>
                </div>
                <div className="frame first">
                    <div className="profile-container flex align-center">
                        <div className="full">
                            {/* <div className="profile" style={{ marginLeft: 0 }}>Profile</div>
                            <div className="profile-sub">Some info may be visible to other people</div> */}
                            <img src={imgUrl ? imgUrl : userImg} alt="userImg" />
                            <div className="name">{firstName} {lastName}</div>
                        </div>
                        <Link to="/user/edit" className="edit"><FontAwesomeIcon icon={faPenToSquare} size="xl" style={{color: "#b8b8b8",}} /></Link>
                    </div>
                    {/* <div className="field img-con">
                        <div>PHOTO</div>
                        <img src={imgUrl ? imgUrl : userImg} alt="userImg" />
                    </div>
                    <div className="field">
                        <div>NAME</div>
                        <div>{firstName} {lastName}</div>
                    </div> */}
                </div>
                <div className="frame">
                    <div className="field">
                        <div>EMAIL</div>
                        <div>{email}</div>
                    </div>
                    <div className="field">
                        <div>PHONE</div>
                        <div>{phone}</div>
                    </div>
                    <div className="field">
                        <div>ADDRESS</div>
                        <div>{address}</div>
                    </div>
                    <div className="field bio">
                        <div>BIO</div>
                        <div>{bio}</div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}
