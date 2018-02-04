import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';

export class ContentLeft extends React.Component {
    render() {
        return (
            <div style={styles.content}>
                {/* REMOVE after sprint 1 */}

                <div style={styles.demoButton}>
                    <SuccessBtn onClick={() => this.props.buy(20)}>
                        Osta, 20e
                    </SuccessBtn>
                </div>
            </div>
        );
    }
}

const styles = {
    content: {
        marginTop: '-3.26%',
        height: '100.1%',
        width: '50%',
        float: 'left'
    },
    demoButton: {
        marginTop: 60,
        marginLeft: 5
    }
};
