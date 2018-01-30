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
              onClick={() => this.props.buy(20)}
            >
              Testiostos (20 &euro;)
            </BasicBtn>
          </Margin>
        </div>
        <div className="header-right">
          <Margin margin={5} inlineBlock>
            <span><b>{this.props.user.full_name}</b> {this.props.user.account_balance} &euro;</span>
          </Margin>
          <Margin margin={5} inlineBlock>
            <SuccessBtn hover>Asetukset</SuccessBtn>
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
