import React from 'react';
import { ContentLeft } from './ContentLeft';
import { ContentRight } from './ContentRight';
import PurchaseNotification from './../notifications/PurchaseNotification';

export class Content extends React.Component {
    render() {
        return (
            <div style={styles.content}>
                <p style={styles.infoText}>Osta leimaamalla.</p>
                <ContentLeft />
                <ContentRight />
                <PurchaseNotification price={1.85} product="Coca-cola Zero" shadow={true}/>
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