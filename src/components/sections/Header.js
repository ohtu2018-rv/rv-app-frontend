import React from "react";
import DangerBtn from "../buttons/DangerBtn";
import SuccessBtn from "../buttons/SuccessBtn";
import BasicBtn from "../buttons/BasicBtn";
import Margin from "../helpers/Margin";

import "./styles/Header.css";

export class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header-left">
          <Margin margin={5} inlineBlock>
            <BasicBtn
              hover
              onClick={() =>
                this.props.buy({
                  price: 2,
                  name: "Coca-Cola Zero 0.5l"
                })
              }
            >
              Testiostos (2 &euro;)
            </BasicBtn>
          </Margin>
        </div>
        <div className="header-right">
          <Margin margin={5} inlineBlock>
            <BasicBtn>
              <span>
                <b>{this.props.user.full_name}</b>{" "}
                {parseFloat(this.props.user.account_balance).toFixed(2)} &euro;
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
