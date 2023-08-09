import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userImg from '../assets/img/noun-user-103879.png'
import { UserManu } from './UserManu'
import topImg from '../assets/img/m3.png'
import topImgBg from '../assets/img/33.png'

export function NavBar({ onLogout }) {

  const [isManuOpen, setIsManuOpen] = useState(false)
  const loggedInUser = useSelector(state => state.userModule.loggedInUser)
  const navigate = useNavigate()

  const toggleManu = () => {
    if (isManuOpen) setIsManuOpen(false)
    else setIsManuOpen(true)
  }
  // useEffect(() => {
  //   if (!loggedInUser) navigate('/login')
  // }, [loggedInUser, navigate])


  return (
    <div className="nav-bar flex space-between">
      {/* <img className="cover" src={topImg} alt="" /> */}
      {/* <img className="cover-bg" src={topImgBg} alt="" /> */}
      <div>Auth App</div>
      <ClickAwayListener onClickAway={() => setIsManuOpen(false)}>
        <div className="user" onClick={toggleManu}><img className="user-img" src={loggedInUser.imgUrl ? loggedInUser.imgUrl : userImg} alt="" /><span className="username">{loggedInUser.firstName} {loggedInUser.lastName}</span>
          {isManuOpen && <UserManu closeFunc={() => setIsManuOpen(false)} onLogout={onLogout} />}
        </div>
      </ClickAwayListener>

    </div>
  )
}
