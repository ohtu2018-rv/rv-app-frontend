import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Modal.css';



class Modal extends Component {
   
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal">
                {this.props.children}
            </div>
        );
    }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
