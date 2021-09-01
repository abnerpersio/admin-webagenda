import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

import Input from '../../Input';
import Select from '../../Select';
import Button from '../../Button';
import { CardsList } from './styles';

import { AuthContext } from '../../../context/AuthProvider';
import { API_URL } from '../../../utils/contants';

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

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${API_URL}/events`,
        {
          clientName,
          service: selectedServices,
          professional,
          eventdate: moment(selectedEventDate, 'YYYY-MM-DD').format('DD-MM-YYYY'),
          eventhours: selectedHour,
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
    if (!user || !selectedEventDate || !selectedServices) {
      return;
    }

    async function getFreeHours() {
      try {
        const response = await axios.get(`${API_URL}/webhooks/freehours`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-wa-username': user.username,
            eventdate: moment(selectedEventDate, 'YYYY-MM-DD').format('DD-MM-YYYY'),
            serviceoption: selectedServices,
          },
        });

        if (response.data) {
          setPossibleHourOptions(response.data?.options);
        }
      } catch (error) {
        toast.error('Oops, não consegui buscar os horários disponíveis, verifique se algo está errado');
      }
    }

    getFreeHours();
  }, [selectedEventDate, selectedServices, user]);

  return (
    <form onSubmit={handleSubmit}>
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
        {selectedEventDate
          ? possibleHourOptions?.map((possibleHour) => (
            <button
              disabled={possibleHour.value === selectedHour}
              onClick={() => setSelectedHour(possibleHour.value)}
              key={possibleHour.value}
              type="button"
            >
              {possibleHour.value}
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

ClientAttendance.propTypes = {
  onCleanEventType: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
