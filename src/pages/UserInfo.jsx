import React from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../cmps/NavBar'
import userImg from '../assets/img/user-img.png'

export const UserInfo = () => {

    const testUser = {
        name: 'Xanthe Neal',
        bio: 'I am a software developer and a big fan of devchallenges...',
        phone: '908249274292',
        imgUrl: userImg,
        email: 'xanthe.neal@gmail.com',
        password: '************'
    }

    const { name, bio, phone, imgUrl, email, password } = testUser

    return (
        <React.Fragment>
            <NavBar />
            <div className="user-info">
                <div className="center">
                    <div className="title">Personal info</div>
                    <div className="subtitle">Basic info, like your name and photo</div>
                </div>
                <div className="frame">
                    <div className="profile-container flex align-center">
                        <div className="full">
                            <div className="profile" style={{ paddingLeft: 0 }}>Profile</div>
                            <div className="profile-sub">Some info may be visible to other people</div>
                        </div>
                        <Link to="/user/1/edit" className="edit">Edit</Link>
                    </div>
                    <div className="field img-con">
                        <div>PHOTO</div>
                        <img src={imgUrl} alt="userImg" />
                    </div>
                    <div className="field">
                        <div>NAME</div>
                        <div>{name}</div>
                    </div>
                    <div className="field">
                        <div>BIO</div>
                        <div>{bio}</div>
                    </div>
                    <div className="field">
                        <div>PHONE</div>
                        <div>{phone}</div>
                    </div>
                    <div className="field">
                        <div>EMAIL</div>
                        <div>{email}</div>
                    </div>
                    <div className="field">
                        <div>PASSWORD</div>
                        <div>{password}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
