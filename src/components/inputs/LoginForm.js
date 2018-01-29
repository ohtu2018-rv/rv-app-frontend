import React from 'react';

/* TODO */

const LoginForm = ({username, password, handleInputChange}) => {
    return (
        <form>
            <input 
                type="text" 
                name="username" 
                value={username} 
                onChange={handleInputChange}
                autoFocus />
            <input 
                type="text" 
                name="password" 
                value={password}
                onChange={handleInputChange} />
        </form>
    )
}

export default LoginForm;