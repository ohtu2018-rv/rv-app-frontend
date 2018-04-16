import React from 'react';
import DangerBtn from '../buttons/DangerBtn';
import BasicBtn from '../buttons/BasicBtn';
import Margin from '../helpers/Margin';
import Logo from '../../images/tkoaly.svg';
import './styles/Header.css';

export class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="header-title">
                    <img src={Logo} alt="logo"/>
                    <h1>Ruokavälitys</h1>
                </div>
                <div className="header-right">
                    <Margin margin={5} inlineBlock>
                        <BasicBtn>
                            <span>
                                <b>{this.props.user.full_name}</b>{' '}
                                {parseFloat(
                                    this.props.user.account_balance / 100
                                ).toFixed(2)}{' '}
                                &euro;
                            </span>
                        </BasicBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <DangerBtn onClick={this.props.logout} hover>
                            Kirjaudu ulos (ENTER)
                        </DangerBtn>
                    </Margin>
                </div>
            </header>
        );
    }
}
