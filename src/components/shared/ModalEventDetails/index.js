import PropTypes from 'prop-types';

import { Container, Flex } from './styles';
import Modal from '../../Modal';

export default function ModalEventDetails({ open, onClose, selectedEvent }) {
  function renderEvent() {
    return (
      <Container>
        <Flex>
          <p>Cliente</p>
          <p>{selectedEvent.clientName}</p>
        </Flex>
        <Flex>
          <p>Início</p>
          <p>{selectedEvent.from}</p>
        </Flex>
        <Flex>
          <p>Fim</p>
          <p>{selectedEvent.to}</p>
        </Flex>
        <Flex>
          <p>Serviço</p>
          <p>{selectedEvent.service}</p>
        </Flex>
        <Flex>
          <p>Profissional</p>
          <p>{selectedEvent.professional}</p>
        </Flex>
        <Flex>
          <p>Telefone</p>
          <p>{selectedEvent.clientPhone}</p>
        </Flex>
      </Container>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      {renderEvent()}
    </Modal>
  );
}

ModalEventDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedEvent: PropTypes.shape({
    _id: PropTypes.string,
    clientName: PropTypes.string,
    clientPhone: PropTypes.string,
    service: PropTypes.string,
    professional: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    exclusionDate: PropTypes.string,
  }).isRequired,
};
