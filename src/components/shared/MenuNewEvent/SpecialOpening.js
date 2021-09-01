import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

import Input from '../../Input';
import Button from '../../Button';

import { AuthContext } from '../../../context/AuthProvider';
import { API_URL } from '../../../utils/contants';

export default function SpecialOpening({ onCleanEventType, onClose }) {
  const [selectedEventDate, setselectedEventDate] = useState('');
  const [selectedStartHour, setSelectedStartHour] = useState('');
  const [selectedEndHour, setSelectedEndHour] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const hourRegex = /\d{2}:\d{2}/;

  const isFormValid = (
    selectedEventDate
    && selectedStartHour
    && selectedEndHour
    && hourRegex.test(selectedStartHour)
    && hourRegex.test(selectedEndHour)
  );

  function cleanInputValues() {
    onCleanEventType();
    setselectedEventDate('');
    setSelectedStartHour('');
    setSelectedEndHour('');
  }

  function handleStartHourChange(e) {
    setSelectedStartHour(
      e.target.value
        .replace(/\D/, '')
        .replace(/(\d{2})(\d{2})/, '$1:$2'),
    );
  }

  function handleEndHourChange(e) {
    setSelectedEndHour(
      e.target.value
        .replace(/\D/, '')
        .replace(/(\d{2})(\d{2})/, '$1:$2'),
    );
  }

  function handleDateChange(e) {
    setselectedEventDate(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${API_URL}/users/${user.id}/special-hours`,
        {
          eventdate: moment(selectedEventDate, 'YYYY-MM-DD').format('DD-MM-YYYY'),
          from: selectedStartHour,
          to: selectedEndHour,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-wa-username': user.username,
          },
        },
      );

      if (response.status === 201) {
        toast.success('Evento salvo com sucesso!');
        cleanInputValues();
        onClose();
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao salvar este evento!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}

SpecialOpening.propTypes = {
  onCleanEventType: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
