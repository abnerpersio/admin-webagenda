import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Container } from './styles';

import Button from '../Button';

export default function Modal(props) {
  if (!props.open) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container>
        <button type="button" className="close" onClick={props.onClose}>
          &times;
        </button>
        {props.children}

        <Button
          variant="orange"
          transparent
          type="button"
          className="btn-close"
          onClick={props.onClose}
        >
          Fechar
        </Button>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
