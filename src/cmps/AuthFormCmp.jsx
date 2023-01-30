import React from 'react'

export const AuthFormCmp = ({ title, btnTxt, func, bottomLine }) => {
    return (
        <div>
            <div>Auth app</div>
            <div>{title}</div>
            <form onSubmit={func}>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <button>{btnTxt}</button>
            </form>
            {bottomLine}
        </div>
    )
}
