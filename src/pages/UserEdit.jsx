import React, { useState } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'

export const UserEdit = () => {

    const [img, setImg] = useState({
        imgUrl: null,
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
        if (imgUrl) return 'UPLOADED'
        return isUploading ? 'UPLOADING...' : 'CHANGE PHOTO'
    }

    const onUpdateUser = (ev) => {
        ev.preventDefault()
        console.log('updated!');
        navigate('/user/1')
    }

    return (
        <React.Fragment>
            <NavBar />
            <div>
                <div>Change Info</div>
                <div>Changes will be reflected to every services</div>
                <form onSubmit={onUpdateUser}>
                    <img src={img.imgUrl} alt="userImg" />
                    <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" style={{ display: "none" }} />
                    <label htmlFor="imgUpload">{uploadMsg()}</label>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name..." />
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" cols="30" rows="5" placeholder="Enter your bio..."></textarea>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" placeholder="Enter your phone..." />
                    <label htmlFor="email"></label>
                    <input type="email" id="email" placeholder="Enter your email..." />
                    <label htmlFor="pass"></label>
                    <input type="password" id="pass" placeholder="Enter your new password..." />
                    <button>Save</button>
                </form>
            </div>
        </React.Fragment>
    )
}
