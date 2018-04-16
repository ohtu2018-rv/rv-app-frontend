import React from 'react';
import HeaderBtn from '../buttons/HeaderBtn';
import Margin from '../helpers/Margin';
import Logo from '../../images/tkoaly2.svg';
import { connect } from 'react-redux';
import './styles/Header.css';

export class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="header-title">
                    <img src={Logo} alt="logo" />
                    <h1>Ruokavälitys</h1>
                </div>
                { this.props.loggedIn && <div className="header-right">
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn fill>
                            <span>
                                <b>{this.props.user.full_name}</b>{' '}
                                {parseFloat(
                                    this.props.user.account_balance / 100
                                ).toFixed(2)}{' '}
                                &euro;
                            </span>
                        </HeaderBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn onClick={this.props.logout} hover>
                            Kirjaudu ulos (ENTER)
                        </HeaderBtn>
                    </Margin>
                </div>}
            </header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps)(Header);
