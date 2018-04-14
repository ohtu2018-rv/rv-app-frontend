import React from 'react';
import DangerBtn from '../buttons/DangerBtn';
import BasicBtn from '../buttons/BasicBtn';
import { deposit, logout } from '../../reducers/userReducer';
import { connect } from 'react-redux';

import './styles/Header.css';

export class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="header-left">
                    <BasicBtn
                        hover
                        onClick={() => this.props.deposit(500)}
                    >
                        Testitalletus 5,00 &euro;
                    </BasicBtn>
                </div>
                <div className="header-right">
                    <BasicBtn>
                        <span>
                            <b>{this.props.user.full_name}</b>{' '}
                            {parseFloat(
                                this.props.user.account_balance / 100
                            ).toFixed(2)}{' '}
                            &euro;
                        </span>
                    </BasicBtn>
                    <DangerBtn onClick={this.props.logout} hover>
                        Kirjaudu ulos (ENTER)
                    </DangerBtn>
                </div>
            </header>
        );
    }
}

const mapDispatchToProps = {
    deposit,
    logout
};

const mapStateToProps = state => ({
    user: state.user.profile
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
