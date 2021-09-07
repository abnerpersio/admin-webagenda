import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

import Input from '../../Input';
import Button from '../../Button';
import { CardsList } from './styles';

import { AuthContext } from '../../../context/AuthProvider';
import { API_URL } from '../../../utils/constants';

export default function SpecialClosing({ onCleanEventType, onClose }) {
  const [selectedEventDate, setselectedEventDate] = useState('');
  const [possibleHourOptions, setPossibleHourOptions] = useState([]);
  const [selectedStartHour, setSelectedStartHour] = useState('');
  const [selectedEndHour, setSelectedEndHour] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const isFormValid = (
    selectedEventDate
    && selectedStartHour
    && selectedEndHour
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
        `${API_URL}/custom/events`,
        {
          eventdate: moment(selectedEventDate, 'YYYY-MM-DD').format('DD-MM-YYYY'),
          eventstarthours: selectedStartHour,
          eventendhours: selectedEndHour,
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

  useEffect(() => {
    if (!user || !selectedEventDate) {
      return;
    }

    async function getFreeHours() {
      try {
        const response = await axios.get(`${API_URL}/webhooks/freehours?getJSON=true`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-wa-username': user.username,
            eventdate: moment(selectedEventDate, 'YYYY-MM-DD').format('DD-MM-YYYY'),
          },
        });

        if (response.data) {
          setPossibleHourOptions(response.data);
        }
      } catch (error) {
        toast.error('Oops, não consegui buscar os horários disponíveis, verifique se algo está errado');
      }
    }

    getFreeHours();
  }, [selectedEventDate, user]);

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

      <p>Horários disponíveis *</p>
      <CardsList>
        {selectedEventDate
          ? possibleHourOptions?.map((possibleHour) => (
            <button
              key={possibleHour[0]}
              type="button"
            >
              {moment(possibleHour[0], 'DD-MM-YYYY HH:mm').format('HH:mm')}
              {' '}
              até
              {' '}
              {moment(possibleHour[1], 'DD-MM-YYYY HH:mm').format('HH:mm')}
            </button>
          )) : (
            <small>
              Escolha uma data para listar os horários
            </small>
          )}
      </CardsList>

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

SpecialClosing.propTypes = {
  onCleanEventType: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
