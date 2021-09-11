import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

import { useContext, useState } from 'react';
import { Container, Flex } from './styles';
import Modal from '../../Modal';
import Button from '../../Button';
import Loader from '../../Loader';
import { AuthContext } from '../../../context/AuthProvider';
import EventService from '../../../services/EventService';

export default function ModalEventDetails({ open, onClose, selectedEvent }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  async function handleRemoveEvent() {
    setIsLoading(true);

    await EventService.deleteEvent({
      user,
      eventId: selectedEvent._id,
    });

    onClose();
    setIsLoading(false);
  }

  function renderEvent() {
    return (
      <Container>
        <Loader isActive={isLoading} />

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

        <Button
          type="button"
          variant="orange"
          onClick={handleRemoveEvent}
          disabled={isLoading}
        >
          <span>
            Excluir evento
          </span>
          <FaTrash />
        </Button>
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
