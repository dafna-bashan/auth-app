import React from 'react'

export const AuthFormCmp = ({ title, btnTxt, func, bottomLine }) => {
    return (
        <div className="form-container">
            <div className="main-title">Auth app</div>
            <div className="title">{title}</div>
            <form onSubmit={func} className="flex column">
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <button>{btnTxt}</button>
            </form>
            <span>{bottomLine}</span>
        </div>
    )
}
