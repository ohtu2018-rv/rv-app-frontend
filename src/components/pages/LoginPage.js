import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';

export class LoginPage extends React.Component {
    handleKeyPress = (event) => {
        switch(event.keyCode) {
            case 13:
                this.props.login();
                break;
            default:
                console.log(event.keyCode);
        }
    }

    componentDidMount(){
        document.addEventListener("keypress", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPress)
        console.log("removed eventListener loginPage")
    }

    render() {
        return (
            <div id="logincontent" style={styles.content}>
                <div style={styles.login}>
                    <SuccessBtn onClick={this.props.login}>Kirjaudu sisään (ENTER)</SuccessBtn>
                </div>
            </div>
        )
    }
}

const styles = {
    content: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    login: {
        marginTop: 5,
        marginRight: 5,
        float: 'right',
    }
}