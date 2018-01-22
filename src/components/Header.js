import React from 'react';
import DangerBtn from './DangerBtn';
import SuccessBtn from './SuccessBtn';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={styles.header}>
              <div style={styles.selaa}>
                <SuccessBtn>Selaa valikoimaa</SuccessBtn>
              </div>
              <div style={styles.logout}>
                <DangerBtn>Kirjaudu ulos (ENTER)</DangerBtn >
              </div>
            </div>
        )
    }
}

const styles = {
    header: {
        width: '100%',
        height: '5%',
        display: 'inline-block'
    },
    selaa: {
        paddingTop: 5,
        float: 'left',
    },
    logout: {
        paddingTop: 5,
        paddingRight: 5,
        float: 'right',
    },
}