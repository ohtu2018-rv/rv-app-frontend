import React from 'react';
import DangerBtn from '../buttons/DangerBtn';
import BasicBtn from '../buttons/BasicBtn';
import Margin from '../helpers/Margin';

import './styles/Header.css';

const items = [
    {
        barcode: '0001',
        price: 180,
        product_name: 'Coca-Cola Zero 0.5l'
    },
    {
        barcode: '0002',
        price: 500,
        product_name: 'deposit'
    },
    {
        barcode: '0003',
        price: 120,
        product_name: 'Twix'
    }
];

export class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="header-left">
                    <Margin margin={5} inlineBlock>
                        <BasicBtn
                            hover
                            onClick={() =>
                                this.props.buy(
                                    Object.assign({}, items[0], { quantity: 1 })
                                )
                            }
                        >
                            Testiostos 1 ({parseFloat(
                                items[0].price / 100
                            ).toFixed(2)}{' '}
                            &euro;)
                        </BasicBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <BasicBtn
                            hover
                            onClick={() =>
                                this.props.buy(
                                    Object.assign({}, items[2], { quantity: 1 })
                                )
                            }
                        >
                            Testiostos 2 ({parseFloat(
                                items[2].price / 100
                            ).toFixed(2)}{' '}
                            &euro;)
                        </BasicBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <BasicBtn
                            hover
                            onClick={() => this.props.deposit(items[1])}
                        >
                            Testitalletus ({parseFloat(
                                items[1].price / 100
                            ).toFixed(2)}{' '}
                            &euro;)
                        </BasicBtn>
                    </Margin>
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
