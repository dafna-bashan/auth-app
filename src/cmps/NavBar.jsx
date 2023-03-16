import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userImg from '../assets/img/user-img.png'
import { UserManu } from './UserManu'

export const NavBar = () => {

  const [isManuOpen, setIsManuOpen] = useState(false)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  const navigate = useNavigate()

  // const closeManu = () => {
  //   setIsManuOpen(false)
  // }

  const toggleManu = () => {
    if (isManuOpen) setIsManuOpen(false)
    else setIsManuOpen(true)
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
      <div onClick={toggleManu}><img src={userImg} alt="" />{testUser.name}</div>

      {/* <ClickAwayListener onClickAway={()=> setIsManuOpen(false)}>
        <div style={{position: 'absolute'}}> */}
          {isManuOpen && <UserManu closeFunc={()=> setIsManuOpen(false)} />}
        {/* </div> */}
      {/* </ClickAwayListener> */}
    </div>
  )
}
