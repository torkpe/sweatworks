import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-responsive-modal';
import styled from 'styled-components';

import { toggleModal } from '../actionCreators';

const Div = styled.div({
  padding: '1rem'
});

function Modal(props) {
  return (
    <ReactModal
      open={props.openModal}
      onClose={()=> props.toggleModal(false)}
    >
      <Div>
        {props.body}
      </Div>
    </ReactModal>
  )
}

const mapStateToProps = (state) => ({
  body: state.modal.body,
  openModal: state.modal.openModal
});

const mapDispatchToProps = {
  toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);