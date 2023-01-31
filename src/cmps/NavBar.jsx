import React from 'react'
import userImg from '../assets/img/user-img.png'

export const NavBar = () => {

  const testUser = {
    name: 'Xanthe Neal',
    bio: 'I am a software developer and a big fan of devchallenges...',
    phone: '908249274292',
    imgUrl: userImg,
    email: 'xanthe.neal@gmail.com',
    password: '************'
  }

  return (
    <div className="nav-bar flex space-between">
      <div>Auth App</div>
      <div><img src={userImg} alt="" />{testUser.name}</div>

    </div>
  )
}
