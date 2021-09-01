import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container } from './styles';
import 'moment/locale/pt-br';

import Select from '../../Select';
import RightMenu from '../../RightMenu';

import ClientAttendance from './ClientAttendance';
import SpecialClosing from './SpecialClosing';
import SpecialOpening from './SpecialOpening';

export default function MenuNewEvent({ open, onClose }) {
  const [eventType, setEventType] = useState('');

  function handleCleanEventType() {
    setEventType('');
  }

  return (
    <RightMenu open={open} onClose={onClose}>
      <Container>
        <h3>Novo Evento</h3>

        <p>Tipo de evento *</p>
        <Select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option disabled value="">Escolha um tipo de evento</option>
          <option value="client_attendance">Atendimento de cliente</option>
          <option value="special_opening">Horário de abertura especial</option>
          <option value="special_closing">Horário de fechamento</option>
        </Select>

        {
          eventType === 'client_attendance' && (
            <ClientAttendance
              onCleanEventType={handleCleanEventType}
              onClose={onClose}
            />
          )
        }

        {
          eventType === 'special_opening' && (
            <SpecialOpening
              onCleanEventType={handleCleanEventType}
              onClose={onClose}
            />
          )
        }

        {
          eventType === 'special_closing' && (
            <SpecialClosing
              onCleanEventType={handleCleanEventType}
              onClose={onClose}
            />
          )
        }

      </Container>
    </RightMenu>
  );
}

MenuNewEvent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
