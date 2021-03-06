import React from 'react';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import './styles/ModalContainer.css';
import { CSSTransition } from 'react-transition-group';

export class ModalContainer extends React.Component {
    render() {
        const ModalContent = this.props.contentComponent;
        if (!ModalContent) {
            return null;
        }
        
        return (
            <CSSTransition
                in={this.props.modalVisible}
                timeout={200}
                classNames="overlay"
                mountOnEnter
                unmountOnExit
            >
                {(state) => {
                    return (
                        <div className="modal-overlay" onClick={e => {
                            this.props.closeModal();
                        }}>
                            <div className="modal-container" onClick={e => e.stopPropagation()}>
                                <ModalContent {...this.props.modalProps}/>
                            </div>
                        </div>
                    );
                }}
            </CSSTransition>
        );
    }
}

const mapDispatchToProps = {
    closeModal
};

const mapStateToProps = state => ({
    contentComponent: state.modal.modalContent,
    modalProps: state.modal.props,
    modalVisible: state.modal.modalVisible
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
