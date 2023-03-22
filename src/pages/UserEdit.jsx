import React, { useState } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'
import userImg from '../assets/img/user-img.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const UserEdit = () => {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const { firstName, lastName, bio, phone, imgUrl = userImg, email } = loggedInUser

    const [img, setImg] = useState({
        imgUrl: userImg,
        height: '40px',
        width: '100%',
        isUploading: false
    })

    const navigate = useNavigate()

    const uploadImg = async (ev) => {
        setImg({ ...img, isUploading: true, height: 500, width: 500 })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        setImg({ isUploading: false, imgUrl: secure_url, height, width })
    }

    const uploadMsg = () => {
        const { imgUrl, isUploading } = img
        if (imgUrl) return 'CHANGE PHOTO'
        return isUploading ? 'UPLOADING...' : 'ADD PHOTO'
    }

    const onUpdateUser = (ev) => {
        ev.preventDefault()
        console.log('updated!');
        navigate('/user/1')
    }

    return (
        <React.Fragment>
            <NavBar />
            <div className="user-edit frame">
                <div className="back"><Link to="/user/1"><span>&#60;</span> Back</Link></div>
                <div className="profile">Change Info</div>
                <div className="profile-sub">Changes will be reflected to every services</div>
                <form onSubmit={onUpdateUser} className="flex column">
                    <div className="img-con flex align-center">
                        <img src={img.imgUrl} alt="userImg" />
                        <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" style={{ display: "none" }} />
                        <label htmlFor="imgUpload" className="img-label">{uploadMsg()}</label>
                    </div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name..." />
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" cols="30" rows="5" placeholder="Enter your bio..."></textarea>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" placeholder="Enter your phone..." />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email..." />
                    <label htmlFor="pass">Password</label>
                    <input type="password" id="pass" placeholder="Enter your new password..." />
                    <button>Save</button>
                </form>
            </div>
        </React.Fragment>
    )
}
