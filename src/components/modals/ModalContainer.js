import React from 'react';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import './styles/ModalContainer.css';

export class ModalContainer extends React.Component {
    render() {
        const ModalContent = this.props.contentComponent;

        return this.props.modalVisible && (
            <div className="modal-overlay" onClick={e => {
                this.props.closeModal();
            }}>
                <div className="modal-container" onClick={e => e.stopPropagation()}>
                    <ModalContent {...this.props.modalProps}/>
                </div>
            </div>
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
