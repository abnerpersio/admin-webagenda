import { useState } from 'react';
import { Container, Header, Button } from './styles';
import { FaCalendarAlt } from 'react-icons/fa';

import Schedule from './Schedule';
import ModalCalendar from '../ModalCalendar';
import ModalEvent from '../ModalEvent';

const eventMock = [
  {
    clientName: 'Abner',
    from: '25-06-2021 10:00',
    to: '25-06-2021 10:40',
  },
  {
    clientName: 'Gabriel',
    from: '25-06-2021 12:00',
    to: '25-06-2021 12:40',
  },
  {
    clientName: 'Samuel',
    from: '25-06-2021 13:00',
    to: '25-06-2021 13:40',
  },
  {
    clientName: 'Daniel',
    from: '25-06-2021 14:00',
    to: '25-06-2021 14:40',
  },
  {
    clientName: 'Davi',
    from: '25-06-2021 16:00',
    to: '25-06-2021 16:40',
  },
];


export default function SchedulesList() {
  const [isCalendarModalOpen, setCalendarModal] = useState(false);
  const [isEventModalOpen, setEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  
  function selectEventModal(event) {
    setSelectedEvent(event);
    setEventModal(true);
  }

  function renderScheduleList() {
    return eventMock.map((event) => (
      <Schedule event={event} onOpen={selectEventModal} />
    ));
  }
  
  function handleToggleCalendarModal() {
    setCalendarModal((prevState) => !prevState)
  }

  function handleToggleEventModal() {
    setEventModal((prevState) => !prevState);
  }

  return (
    <Container>
      <Header>
        <div>
          <h3>Atendimentos</h3>
          <p>Hoje | sexta</p>
        </div>
        <div>
          <Button onClick={handleToggleCalendarModal}>
            <FaCalendarAlt />
          </Button>
        </div>
      </Header>

      <div>{renderScheduleList()}</div>

      <ModalCalendar
        open={isCalendarModalOpen}
        onClose={handleToggleCalendarModal}
      />

      <ModalEvent
        open={isEventModalOpen}
        onClose={handleToggleEventModal}
        selectedEvent={selectedEvent}
      />
    </Container>
  );
}