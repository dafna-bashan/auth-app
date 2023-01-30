import React from 'react'

export const NavBar = () => {

    const testUser = {
        name: 'Xanthe Neal',
        bio: 'I am a software developer and a big fan of devchallenges...',
        phone: '908249274292',
        imgUrl: '',
        email: 'xanthe.neal@gmail.com',
        password: '************'
    }

  return (
    <div>
        <div>Auth App</div>
        {testUser.name}
    </div>
  )
}
