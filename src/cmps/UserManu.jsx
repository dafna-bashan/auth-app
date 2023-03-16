import React from 'react'

export const UserManu = ({closeFunc}) => {
  return (
    <div onClick={closeFunc}>
        <div>My Profile</div>
        <div>Group Chat</div>
        <div>Logout</div>
    </div>
  )
}
