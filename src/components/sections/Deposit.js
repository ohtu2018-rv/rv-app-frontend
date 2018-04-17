import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Deposit.css';
import {
    increaseAmount,
    resetAmount,
    toggleConfirmationVisibility
} from './../../reducers/depositReducer';
import { increaseBalance } from './../../reducers/userReducer';
import { TransitionGroup } from 'react-transition-group';
import { Fade } from './../animations/Animations';
import Modal from './../modal/Modal';
import Confirmation from './Confirmation';

export class Deposit extends Component {
    constructor(props) {
        super(props);
        this.handleIncrementChange = this.handleIncrementChange.bind(this);
    }

    handleIncrementChange(increment) {
        return event => {
            event.preventDefault();
            this.props.increaseAmount(increment);
        };
    }

    render() {
        return (
            <div className="deposit-wrapper">
                <div className="deposit">
                    <div className="btn money">
                        {parseFloat(this.props.depositAmount / 100).toFixed(2)}
                        &euro;
                    </div>
                    <button
                        className="btn erase-btn erase"
                        onClick={this.props.resetAmount}
                    >
                        &#9003;
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(5)}
                    >
                        + 0.05 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(10)}
                    >
                        + 0.10 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(20)}
                    >
                        + 0.20 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(50)}
                    >
                        + 0.50 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(100)}
                    >
                        + 1.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(200)}
                    >
                        + 2.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(500)}
                    >
                        + 5.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(1000)}
                    >
                        + 10.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(2000)}
                    >
                        + 20.00 €
                    </button>
                    <button
                        className="btn number cancel"
                        onClick={() => {
                            this.props.resetAmount();
                            this.props.toggleVisibility(true);
                        }}
                    >
                        Peruuta
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.handleIncrementChange(5000)}
                    >
                        + 50.00 €
                    </button>
                    <button
                        className="btn number success"
                        onClick={() => {
                            this.props.toggleConfirmationVisibility(
                                this.props.confirmationVisibility
                            );
                        }}
                    >
                        OK
                    </button>
                </div>
                <TransitionGroup>
                    {this.props.confirmationVisibility && (
                        <Fade>
                            <Modal show={this.props.confirmationVisibility}>
                                <Confirmation
                                    depositAmount={this.props.depositAmount}
                                    token={this.props.token}
                                    increaseBalance={this.props.increaseBalance}
                                    resetAmount={this.props.resetAmount}
                                    toggleVisibility={
                                        this.props.toggleVisibility
                                    }
                                    toggleConfirmationVisibility={
                                        this.props.toggleConfirmationVisibility
                                    }
                                />
                            </Modal>
                        </Fade>
                    )}
                </TransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    depositAmount: state.deposit.depositAmount,
    token: state.authentication.access_token,
    confirmationVisibility: state.deposit.confirmationVisibility
});

const mapDispatchToProps = {
    increaseAmount,
    resetAmount,
    increaseBalance,
    toggleConfirmationVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
