// import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Container } from './styles';

// import Button from '../Button';

export default function RightMenu(props) {
  const { onClose } = props;

  if (!props.open) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container>
        <button type="button" className="close" onClick={onClose}>
          &times;
        </button>
        {props.children}
        {/*
        <Button transparent type="button" className="btn-close" onClick={props.onClose}>
          Fechar
        </Button> */}
      </Container>
    </Overlay>,
    document.getElementById('menu-root'),
  );
}

RightMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
