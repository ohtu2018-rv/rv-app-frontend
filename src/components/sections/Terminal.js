import React from 'react';

import { connect } from 'react-redux';

import './styles/Terminal.css';

import {
    handleInputEvent,
    handleTerminalSubmit
} from './../../reducers/terminalReducer';

class Terminal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleTerminalSubmit(
            this.props.terminalInput
        );
    }

    componentDidMount() {
        this.terminalFocus.focus();
    }

    render() {
        const className = this.props.inputValid
            ? 'input fullWidth valid'
            : 'input fullWidth invalid';
        return (
            <div className="terminal">
                Pepsi Max: 6413600013082
                <form onSubmit={this.handleSubmit}>
                    <input
                        className={className}
                        value={this.props.terminalInput}
                        ref={input => {
                            this.terminalFocus = input;
                        }}
                        onChange={this.props.handleInputEvent}
                        placeholder="Input EAN and press ENTER to buy a product. To deposit 10€ to your account: d10.00 or d10,00 and press ENTER."
                    />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    handleInputEvent,
    handleTerminalSubmit
};

const mapStateToProps = state => {
    return {
        terminalInput: state.terminal.terminalInput,
        inputValid: state.terminal.inputValid
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
