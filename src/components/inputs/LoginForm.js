import React from 'react';

/* TODO */

const LoginForm = (props) => {
    return (
        <form>
            <input 
                type="text" 
                name="username" 
                value={this.state.username} 
                onChange={this.handleInputChange}
                autoFocus />
            <input 
                type="text" 
                name="password" 
                value={this.state.password}
                onChange={this.handleInputChange} />
        </form>
    )
}