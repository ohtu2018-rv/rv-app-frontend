import React from 'react';

export class LoginPage extends React.Component {
    render() {
        return (
            <div style={styles.content}>
                <button onClick={this.props.login} >Login</button>
            </div>
        )
    }
}

const styles = {
    content: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    }
}