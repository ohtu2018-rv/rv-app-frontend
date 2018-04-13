import React, { Component } from 'react';
import Header from '../sections/Header';
import Content from '../sections/Content';
import { connect } from 'react-redux';
import { getProducts } from './../../reducers/productReducer';
import { logout } from '../../reducers/userReducer';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        switch (event.keyCode) {
        case 13:
            if (this.props.terminalInput === '') {
                this.props.logout();
            }
            break;
        default:
            break;
        }
    }

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress);
        this.props.getProducts();
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    render() {
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

const mapDispatchToProps = {
    getProducts,
    logout
};

const mapStateToProps = state => ({
    terminalInput: state.terminal.terminalInput
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
