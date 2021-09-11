import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Input';
import Select from '../../Select';
import Button from '../../Button';
import Loader from '../../Loader';
import { CardsList } from './styles';

import { AuthContext } from '../../../context/AuthProvider';
import EventService from '../../../services/EventService';

export default function ClientAttendance({ onCleanEventType, onClose }) {
  const [clientName, setClientName] = useState('');
  const [professional, setProfessional] = useState('');
  const [selectedServices, setSelectedServices] = useState('');
  const [selectedEventDate, setselectedEventDate] = useState('');
  const [possibleHourOptions, setPossibleHourOptions] = useState([]);
  const [selectedHour, setSelectedHour] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const isFormValid = (
    clientName
    && selectedServices
    && selectedEventDate
    && selectedHour
  );

  function handleChangeSelectedServices(e) {
    setSelectedServices(
      Array.from(
        e.target.selectedOptions,
        (service) => service.value,
      ).reduce(
        (acc, item) => `${acc},${item}`,
      ),
    );
  }

  console.log(possibleHourOptions);

  function handleDateChange(e) {
    setselectedEventDate(e.target.value);
  }

  function cleanInputValues() {
    onCleanEventType();
    setClientName('');
    setProfessional('');
    setSelectedServices('');
    setselectedEventDate('');
    setSelectedHour('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const data = await EventService.createEvent({
      user,
      clientName,
      professional,
      service: selectedServices,
      selectedDate: selectedEventDate,
      selectedHour,
    });

    if (data) {
      cleanInputValues();
      onClose();
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!user || !selectedEventDate || !selectedServices) {
      return;
    }

    async function getFreeHours() {
      setIsLoading(true);

      const data = await EventService.getFreeHours({
        user,
        selectedDate: selectedEventDate,
        serviceoption: selectedServices,
      });

      if (data) {
        console.log(data?.options);
        setPossibleHourOptions(data?.options);
      }

      setIsLoading(false);
    }

    getFreeHours();
  }, [selectedEventDate, selectedServices, user]);

  return (
    <form onSubmit={handleSubmit}>
      <Loader isActive={isLoading} />

      <p>Nome do cliente *</p>
      <Input
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        placeholder="Nome do cliente"
      />

      <p>Serviços escolhidos *</p>
      <Select
        multiple
        size="4"
        onChange={handleChangeSelectedServices}
      >
        <option disabled value="">Escolha um ou mais serviços</option>
        { user?.services?.map((service) => (
          <option
            key={service.serviceName}
            value={service.serviceName}
          >
            {service.serviceName}
          </option>
        ))}
      </Select>

      <p>Profissional *</p>
      <Input
        value={professional}
        onChange={(e) => setProfessional(e.target.value)}
        placeholder="Profissional"
      />

      <p>Data *</p>
      <Input
        type="date"
        value={selectedEventDate}
        onChange={handleDateChange}
      />

      <p>Horários disponíveis *</p>
      <CardsList>
        {possibleHourOptions?.map((possibleHour) => (
          <button
            disabled={possibleHour.value === selectedHour}
            onClick={() => setSelectedHour(possibleHour.value)}
            key={possibleHour.value}
            type="button"
          >
            {possibleHour.value}
          </button>
        ))}

        {!selectedEventDate && (
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

ClientAttendance.propTypes = {
  onCleanEventType: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
