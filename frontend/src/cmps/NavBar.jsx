import React, { useEffect, useState } from 'react'
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userImg from '../assets/img/user-img.png'
import { UserManu } from './UserManu'

export const NavBar = ({ onLogout }) => {

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


  return (
    <div className="nav-bar flex space-between">
      <div>Auth App</div>
      <div className="user" onClick={toggleManu}><img src={loggedInUser.imgUrl ? loggedInUser.imgUrl : userImg} alt="" /><span className="username">{loggedInUser.firstName} {loggedInUser.lastName}</span></div>

      {/* <ClickAwayListener onClickAway={()=> setIsManuOpen(false)}>
        <div style={{position: 'absolute'}}> */}
      {isManuOpen && <UserManu closeFunc={() => setIsManuOpen(false)} onLogout={onLogout} />}
      {/* </div> */}
      {/* </ClickAwayListener> */}
    </div>
  )
}
