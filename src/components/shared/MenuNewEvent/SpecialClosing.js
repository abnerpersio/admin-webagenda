import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Input from '../../Input';
import Button from '../../Button';
import Loader from '../../Loader';
import { CardsList } from './styles';

import { AuthContext } from '../../../context/AuthProvider';
import EventService from '../../../services/EventService';
import formatHours from '../../../utils/format-hours';

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

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const data = await EventService.createCustomEvent({
      user,
      selectedDate: selectedEventDate,
      selectedStartHour,
      selectedEndHour,
    });

    if (data) {
      cleanInputValues();
      onClose();
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!user || !selectedEventDate) {
      return;
    }

    async function getFreeHours() {
      setIsLoading(true);

      const data = await EventService.getFreeHours({
        user,
        returningFormat: 'json',
        selectedDate: selectedEventDate,
      });

      if (data) {
        setPossibleHourOptions(data);
      }

      setIsLoading(false);
    }

    getFreeHours();
  }, [selectedEventDate, user]);

  return (
    <form onSubmit={handleSubmit}>
      <Loader isActive={isLoading} />

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
