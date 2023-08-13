import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/actions/userActions'
import { ImgUpload } from '../cmps/ImgUpload'
import topImgBg from '../assets/img/m2.png'
import { FormAuth } from '../cmps/FormAuth'
import userImg from '../assets/img/noun-user-103879.png'

export function UserEdit() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const isSuccessful = useSelector(state => state.systemModule.isSuccessful)
    const error = useSelector(state => state.errorModule.error)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState(loggedInUser)

    function uploadImg(imgUrl) {
        setUser({ ...user, imgUrl })
    }


    function onUpdateUser(updatedInfo) {
        // ev.preventDefault()
        const updatedUser = { ...user, ...updatedInfo }
        // console.log('updated!', updatedUser);
        dispatch(updateUser(updatedUser))
    }

    useEffect(() => {
        if (!loggedInUser) navigate('/login')
        if (isSuccessful && !error) {
            dispatch({ type: 'RESTART' })
            navigate('/user')
        }

        // console.log(loggedInUser)
        // eslint-disable-next-line
    }, [isSuccessful, loggedInUser, navigate])


    if (!loggedInUser?._id) return <div></div>


    return (
        <React.Fragment>
            <NavBar />
            <img className="cover-bg" src={topImgBg} alt="" />
            <div className="user-edit frame">
                <div className="back"><Link to="/user"><span>&#60;</span> Back</Link></div>
                <div className="profile">Change Info</div>
                {/* <div className="profile-sub">Changes will be reflected to every services</div> */}
                <ImgUpload defaultImgUrl={userImg} imgUrl={user?.imgUrl ? user.imgUrl : ''} alt="user-image" onUploadImg={uploadImg} />
                <FormAuth type="profile-edit" btnTxt="Save" submitFunc={onUpdateUser} user={user} />
            </div>
        </React.Fragment>
    )
}
