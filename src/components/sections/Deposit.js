import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Deposit.css';

export class Deposit extends Component {
    constructor() {
        super();

        this.state = {
            amount: 0
        };
        this.handleIncrementChange = this.handleIncrementChange.bind(this);
    }

    handleIncrementChange(increment) {
        return event => {
            event.preventDefault();
            this.setState({ amount: this.state.amount + increment });
        };
    }

    render() {
        return (
            <div className="deposit-wrapper">
                <div className="deposit">
                    <div className="btn money">
                        {this.state.amount % 100 === 0
                            ? this.state.amount / 100 + '.00'
                            : this.state.amount % 10 === 0
                                ? this.state.amount / 100 + '0'
                                : this.state.amount / 100}{' '}
                        &euro;
                    </div>
                    <button
                        className="btn erase-btn erase"
                        onClick={() => this.setState({ amount: 0 })}
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
                        onClick={this.props.close}
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
                        onClick={this.props.close}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
