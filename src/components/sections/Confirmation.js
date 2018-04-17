import React, { Component } from 'react';
import './styles/Confirmation.css';

export class Confirmation extends Component {
    render() {
        return (
            <div class="confirm-overlay">
                <div class="confirm">
                    Vahvista{' '}
                    <b>
                        {parseFloat(this.props.depositAmount / 100).toFixed(2)}{' '}
                        &euro;
                    </b>{' '}
                    deposit
                    <br />
                    <br />
                    <button
                        class="btn number cancel cancelBtn"
                        onClick={() => {
                            this.props.toggleConfirmationVisibility(true);
                        }}
                    >
                        Peruuta
                    </button>
                    <button
                        class="btn number success confirmBtn"
                        onClick={() => {
                            this.props.increaseBalance(
                                this.props.token,
                                this.props.depositAmount
                            );
                            this.props.resetAmount();
                            this.props.toggleConfirmationVisibility(true);
                            this.props.toggleVisibility(true);
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}

export default Confirmation;
