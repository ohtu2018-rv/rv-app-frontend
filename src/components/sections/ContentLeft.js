import React from 'react';

export class ContentLeft extends React.Component {
    render() {
        return (
            <div style={styles.content}>
            </div>
        )
    }
}

const styles = {
    content: {
        height: '100%',
        width: '50%',
        float: 'left'
    }
}