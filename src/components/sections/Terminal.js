import React from 'react';

import { connect } from 'react-redux';

import {
    handleInputEvent,
    handleTerminalSubmit
} from './../../reducers/terminalReducer';

class Terminal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.handleTerminalSubmit(
            this.props.terminalInput,
            this.props.deposit
        );
    };

    componentDidMount() {
        this.terminalFocus.focus();
    }

    render() {
        const className = this.props.inputValid ? 'valid' : 'invalid';
        return (
            <div className={className}>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="input"
                        value={this.props.terminalInput}
                        ref={input => {
                            this.terminalFocus = input;
                        }}
                        onChange={this.props.handleInputEvent}
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
