import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Container, Flex } from './styles';
import Modal from '../../Modal';
import Button from '../../Button';
import { API_URL } from '../../../utils/constants';
import { AuthContext } from '../../../context/AuthProvider';

export default function ModalEventDetails({ open, onClose, selectedEvent }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  async function handleRemoveEvent() {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/events/${selectedEvent._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-wa-username': user.username,
          },
        });

      toast.success('Evento excluido com sucesso');
      onClose();
    } catch (error) {
      toast.error('Ocorreu um erro ao excluir esse evento!', error.message);
    } finally {
      setIsLoading(false);
    }
  }

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
