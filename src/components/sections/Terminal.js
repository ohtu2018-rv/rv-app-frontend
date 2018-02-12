import React from 'react';

import { connect } from 'react-redux';

import {
    handleInputEvent,
    handleTerminalSubmit
} from './../../reducers/terminalReducer';

class Terminal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.handleTerminalSubmit(this.props.terminalInput);
    };

    componentDidMount() {
        this.terminalFocus.focus();
    }

    render() {
        return (
            <div id='terminal'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.props.terminalInput}
                        ref={input => {
                            this.terminalFocus = input;
                        }}
                        onChange={this.props.handleInputEvent} />
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
        terminalInput: state.terminal.terminalInput
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
