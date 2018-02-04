import React from 'react';
import './styles/Button.css';
import './styles/DangerBtn.css';
import Loader from './../loaders/Loader';

const DangerBtn = ({ onClick, children, fill, hover, loader, ...props }) => {
    let className = 'btn';
    fill ? (className += ' danger-fill') : (className += ' danger');
    hover &&
        (fill
            ? (className += ' danger-fill-hover')
            : (className += ' danger-hover'));
    return (
        <button {...props} onClick={onClick} className={className}>
            {!loader ? (
                <span className="btnContent">{children}</span>
            ) : (
                <Loader />
            )}
        </button>
    );
};

export default DangerBtn;
