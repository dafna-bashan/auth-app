import React from 'react'
import {Link} from 'react-router-dom'

export const UserInfo = () => {

    const testUser = {
        name: 'Xanthe Neal',
        bio: 'I am a software developer and a big fan of devchallenges...',
        phone: '908249274292',
        imgUrl: '',
        email: 'xanthe.neal@gmail.com',
        password: '************'
    }

    const { name, bio, phone, imgUrl, email, password } = testUser

    return (
        <div>
            <div>
                <div>Personal info</div>
                <div>Basic info, like your name and photo</div>
            </div>
            <div>
                <div>
                    <div>
                        <div>Profile</div>
                        <div>Some info may be visible to other people</div>
                    </div>
                    <Link to="/user/1/edit">Edit</Link>
                </div>
                <div>
                    <div>PHOTO</div>
                    <img src={imgUrl} alt="userImg" />
                </div>
                <div>
                    <div>NAME</div>
                    <div>{name}</div>
                </div>
                <div>
                    <div>BIO</div>
                    <div>{bio}</div>
                </div>
                <div>
                    <div>PHONE</div>
                    <div>{phone}</div>
                </div>
                <div>
                    <div>EMAIL</div>
                    <div>{email}</div>
                </div>
                <div>
                    <div>PASSWORD</div>
                    <div>{password}</div>
                </div>
            </div>
        </div>
    )
}
