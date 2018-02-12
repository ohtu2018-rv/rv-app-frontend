import React from 'react';

import { connect } from 'react-redux';

import {
    handleInputEvent
} from './../../reducers/terminalReducer';

class Terminal extends React.Component {
    render() {
        return (
            <div id='terminal'>
                <input />
                
            </div>
        );
    }
}

const mapDispatchToProps = {
    handleInputEvent
};

const mapStateToProps = state => {
    return {
        terminalInput: state.terminal.terminalInput
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
