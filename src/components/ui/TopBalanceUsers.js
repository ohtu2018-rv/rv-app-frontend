import React from "react";
import "./styles/TopBalanceUsers.css";

const TopBalanceUsers = ({ users }) => {
  console.log(users);
  return (
    <div className="topBalanceUsers">
      <div className="topBalanceUsers-header">Top 25 käyttäjät</div>
      <div className="topBalanceUsers-list">
        <table className="topBalanceUsersTable">
          <tbody>
            <tr>
              <td>1.</td>
              <td>Testaaja</td>
              <td>56,00 €</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>...</td>
              <td>... €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopBalanceUsers;
