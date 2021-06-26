import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Container } from './styles';

export default function Modal(props) {
  const clickRef = useRef(null);
  const { onClose } = props;

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (clickRef.current && !clickRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [clickRef, onClose]);

  if (!props.open) {
    return null;
  }

  return (
    <Overlay>
      <Container ref={clickRef}>
        <span className="close-modal" onClick={props.onClose}>
          &times;
        </span>
        {props.children}
      </Container>
    </Overlay>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
