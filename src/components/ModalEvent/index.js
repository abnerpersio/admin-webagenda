import PropTypes from 'prop-types';

import { Container, Flex } from './styles';
import Modal from '../Modal';

export default function ModalEvent(props) {
  function renderEvent() {
    return (
      <Container>
        <Flex>
          <p>Início</p>
          <p>{props.selectedEvent.from}</p>
        </Flex>
        <Flex>
          <p>Serviço</p>
          <p>{props.selectedEvent.from}</p>
        </Flex>
      </Container>
    );
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      {renderEvent()}
    </Modal>
  );
}

ModalEvent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  selectedEvent: PropTypes.object 
};