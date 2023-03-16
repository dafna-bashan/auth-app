import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userImg from '../assets/img/user-img.png'
import { UserManu } from './UserManu'

export const NavBar = () => {

  const [isManuOpen, setIsManuOpen] = useState(false)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  const navigate = useNavigate()

  const closeManu = () => {
    setIsManuOpen(false)
  }

  useEffect(() => {
    if (!loggedInUser) navigate('/login')
}, [loggedInUser, navigate])

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
      <div onClick={() => setIsManuOpen(true)}><img src={userImg} alt="" />{testUser.name}</div>
      {isManuOpen && <UserManu closeFunc={closeManu}/>}
    </div>
  )
}
