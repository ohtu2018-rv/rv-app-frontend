import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "admin", password: "admin" };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    authenticate() {
        /* TODO: DB-Search here, backend url? */
        const loggedIn = this.state.username === "admin" && this.state.password === "admin";
        if (loggedIn) {
            this.props.login()
        } else {
            alert("Wrong username/password.");
            this.setState({ username: "admin", password: "admin" });
        }
        
    }

    handleKeyPress = (event) => {
        switch(event.keyCode) {
            case 13:
                this.authenticate();
                break;
            default:
                console.log(event.keyCode);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    componentDidMount(){
        document.addEventListener("keypress", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPress)
    }

    render() {
        return (
            <div id="logincontent" style={styles.content}>
                <div style={styles.login}>
                    <SuccessBtn onClick={this.props.login}>Kirjaudu sisään (ENTER)</SuccessBtn>
                </div>
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