import PropTypes from 'prop-types';

import Modal from '../Modal';

export default function ModalCalendar(props) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      
    </Modal> 
  );
}

ModalCalendar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};