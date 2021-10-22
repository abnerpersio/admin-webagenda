import moment from 'moment';
import { toast } from 'react-toastify';
import { API_URL } from '../utils/constants';
import HttpClient from './utils/HttpClient';

class EventService {
  async getFreeHours({ user, selectedDate, serviceoption, returningFormat = 'default' }) {
    try {
      const response = await HttpClient.get({
        url: `${API_URL}/webhooks/freehours?format=${returningFormat}`,
        options: {
          headers: {
            eventdate: selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : null,
            serviceoption,
          },
        },
        credentials: {
          type: 'token',
          data: user,
        },
      });

      return response.data;
    } catch (error) {
      toast.error(`Ocorreu um erro ao buscar os horários disponíveis: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }

  async getScheduleData({ user, selectedDate }) {
    try {
      const response = await HttpClient.get({
        url: `${API_URL}/events?dateRange=${moment(selectedDate).format('DD-MM-YYYY')}`,
        credentials: {
          type: 'token',
          data: user,
        },
      });

      return response.data;
    } catch (error) {
      toast.error(`Ocorreu um erro ao buscar sua agenda: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }

  async createEvent({ user, clientName, service, professional, selectedDate, selectedHour }) {
    try {
      const response = await HttpClient.post({
        url: `${API_URL}/events`,
        body: {
          clientName,
          service,
          professional,
          eventdate: selectedDate ? moment(selectedDate, 'YYYY-MM-DD').format('DD-MM-YYYY') : null,
          eventhours: selectedHour,
        },
        credentials: {
          type: 'token',
          data: user,
        },
      });

      if (response) {
        toast.success('Evento salvo com sucesso!');
        return true;
      }

      throw new Error('Falha ao salvar evento');
    } catch (error) {
      toast.error(`Ocorreu um erro ao salvar este evento: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }

  async createCustomEvent({ user, selectedDate, selectedStartHour, selectedEndHour }) {
    try {
      const response = await HttpClient.post({
        url: `${API_URL}/custom/events`,
        body: {
          eventdate: selectedDate ? moment(selectedDate, 'YYYY-MM-DD').format('DD-MM-YYYY') : null,
          eventstarthours: selectedStartHour,
          eventendhours: selectedEndHour,
        },
        credentials: {
          type: 'token',
          data: user,
        },
      });

      if (response) {
        toast.success('Evento salvo com sucesso!');
        return true;
      }

      throw new Error('Falha ao salvar evento');
    } catch (error) {
      toast.error(`Ocorreu um erro ao salvar este evento: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }

  async createSpecialHours({ user, selectedDate, selectedStartHour, selectedEndHour, operation = 'default' }) {
    try {
      const response = await HttpClient.post({
        url: `${API_URL}/users/${user.id}/special-hours?operation=${operation}`,
        body: {
          eventdate: selectedDate ? moment(selectedDate, 'YYYY-MM-DD').format('DD-MM-YYYY') : null,
          from: selectedStartHour,
          to: selectedEndHour,
        },
        credentials: {
          type: 'token',
          data: user,
        },
      });

      if (response) {
        toast.success('Evento salvo com sucesso!');
        return response.data;
      }

      throw new Error('Falha ao salvar evento');
    } catch (error) {
      if (error?.response?.data?.message?.includes('horário especial para essa data')) {
        return {
          error: 'duplicated',
        };
      }

      toast.error(`Ocorreu um erro ao adicionar novo horário: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }

  async deleteEvent({ user, eventId }) {
    try {
      const response = await HttpClient.delete({
        url: `${API_URL}/events/${eventId}`,
        credentials: {
          type: 'token',
          data: user,
        },
      });

      toast.success('Evento deletado com sucesso');

      return response.data;
    } catch (error) {
      toast.error(`Ocorreu um erro ao remover seu evento: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }
}

export default new EventService();
