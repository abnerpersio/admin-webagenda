import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Input from '../../Input';
import Button from '../../Button';
import Modal from '../../Modal';

import { AuthContext } from '../../../context/AuthProvider';
import EventService from '../../../services/EventService';
import Loader from '../../Loader';
import { Container } from './styles';
import formatHours from '../../../utils/format-hours';

export default function SpecialOpening({ onCleanEventType, onClose }) {
  const [selectedEventDate, setselectedEventDate] = useState('');
  const [selectedStartHour, setSelectedStartHour] = useState('');
  const [selectedEndHour, setSelectedEndHour] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setConfirmModal] = useState(false);

  const { user } = useContext(AuthContext);

  const hourRegex = /\d{2}:\d{2}/;

  const isFormValid = (
    selectedEventDate
    && selectedStartHour
    && selectedEndHour
    && hourRegex.test(selectedStartHour)
    && hourRegex.test(selectedEndHour)
  );

  function toggleConfirmModal() {
    setConfirmModal((prevState) => !prevState);
  }

  function cleanInputValues() {
    onCleanEventType();
    setselectedEventDate('');
    setSelectedStartHour('');
    setSelectedEndHour('');
  }

  function handleStartHourChange(e) {
    setSelectedStartHour(
      formatHours(e.target.value),
    );
  }

  function handleEndHourChange(e) {
    setSelectedEndHour(
      formatHours(e.target.value),
    );
  }

  function handleDateChange(e) {
    setselectedEventDate(e.target.value);
  }

  async function addSpecialOpening(operation) {
    const data = await EventService.createSpecialHours({
      user,
      selectedDate: selectedEventDate,
      selectedStartHour,
      selectedEndHour,
      operation,
    });

    if (data?.error === 'duplicated') {
      toggleConfirmModal();
      return;
    }

    if (data) {
      cleanInputValues();
      onClose();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    await addSpecialOpening();
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Loader isActive={isLoading} />

      <p>
        Escolha uma data para atender em horários diferentes nesse dia
      </p>

      <p>Data *</p>
      <Input
        type="date"
        value={selectedEventDate}
        onChange={handleDateChange}
      />

      <p>Inicio *</p>
      <Input
        maxLength="5"
        value={selectedStartHour}
        onChange={handleStartHourChange}
      />

      <p>Fim *</p>
      <Input
        maxLength="5"
        value={selectedEndHour}
        onChange={handleEndHourChange}
      />

      <Button
        disabled={!isFormValid}
        variant="orange"
        transparent
        type="submit"
        isLoading={isLoading}
      >
        Salvar evento
      </Button>

      <Modal
        open={isConfirmModalOpen}
        onClose={toggleConfirmModal}
      >
        <Container>
          <h3>
            Deseja excluir o horário do dia e salvar um novo?
          </h3>

          <p>Novo horário para o dia {moment(selectedEventDate, 'YYYY-MM-DD').format('DD/MM')}: {selectedStartHour} até {selectedEndHour}</p>

          <Button
            onClick={() => addSpecialOpening('delete_old_and_create')}
          >
            Sim, quero salvar
          </Button>

        </Container>
      </Modal>
    </form>
  );
}

SpecialOpening.propTypes = {
  onCleanEventType: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
