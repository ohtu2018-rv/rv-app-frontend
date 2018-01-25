import React from 'react';
import DangerBtn from '../buttons/DangerBtn';
import SuccessBtn from '../buttons/SuccessBtn';

export class Header extends React.Component {
    render() {
        return (
            <div style={styles.header}>
              <div style={styles.selaa}>
                <SuccessBtn>Selaa valikoimaa</SuccessBtn>
              </div>
              <div style={styles.logout}>
                <DangerBtn onClick={this.props.logout}>Kirjaudu ulos (ENTER)</DangerBtn >
              </div>
              <div style={styles.asetukset}>
                <SuccessBtn>Asetukset</SuccessBtn>
              </div>
              <span style={styles.clientInfo}>Tuure Onnela: 15.4e</span>
            </div>
        )
    }
}

const styles = {
    header: {
        paddingTop: 5,
        paddingLeft: 5,
        width: '99%',
        height: '5%',
        display: 'inline-block'
    },
    selaa: {
        float: 'left',
    },
    logout: {
        marginRight: 5,
        float: 'right',
    },
    asetukset: {
        marginRight: 5,
        float: 'right',
    },
    clientInfo: {
        marginTop: 11,
        marginRight: 15,
        float: 'right',
        verticalAlign: 'center',
        fontWeight: 'bold'
    }
}