import React from "react";
import DangerBtn from "../buttons/DangerBtn";
import BasicBtn from "../buttons/BasicBtn";
import Margin from "../helpers/Margin";

import "./styles/Header.css";

const items = [
  {
    price: 180,
    name: "Coca-Cola Zero 0.5l"
  },
  {
    price: 500,
    name: "deposit"
  }
];

export class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header-left">
          <Margin margin={5} inlineBlock>
            <BasicBtn hover onClick={() => this.props.buy(items[0])}>
              Testiostos ({parseFloat(items[0].price / 100).toFixed(2)} &euro;)
            </BasicBtn>
          </Margin>
          <Margin margin={5} inlineBlock>
            <BasicBtn hover onClick={() => this.props.store(items[1])}>
              Testitalletus ({parseFloat(items[1].price / 100).toFixed(2)}{" "}
              &euro;)
            </BasicBtn>
          </Margin>
        </div>
        <div className="header-right">
          <Margin margin={5} inlineBlock>
            <BasicBtn>
              <span>
                <b>{this.props.user.full_name}</b>{" "}
                {parseFloat(this.props.user.account_balance / 100).toFixed(2)}{" "}
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
