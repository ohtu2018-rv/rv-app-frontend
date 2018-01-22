import React from 'react';
import DangerBtn from './buttons/DangerBtn';
import SuccessBtn from './buttons/SuccessBtn';

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
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5,
        width: '100%',
        height: '5%',
        display: 'inline-block'
    },
    selaa: {
        float: 'left',
    },
    logout: {
        marginRight: 10,
        float: 'right',
    },
}