import React from 'react';
import { ContentLeft } from './ContentLeft';
import { ContentRight } from './ContentRight';

export class Content extends React.Component {
    render() {
        return (
            <div style={styles.content}>
                <p style={styles.infoText}>Osta leimaamalla.</p>
                <ContentLeft />
                <ContentRight />
            </div>
        )
    }
}

const styles = {
    content: {
        height: '94.8%',
        width: '100%',
        position: 'absolute'
    },
    infoText: {
        top: '25%',
        textAlign: 'center',
        position: 'relative'
    }
}