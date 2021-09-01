import { useState, useContext, useMemo } from 'react';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';
import moment from 'moment';
import {
  Container, Header, EventCard,
} from './styles';

// import Skeleton from 'react-loading-skeleton';

import { AuthContext } from '../../../context/AuthProvider';
import ModalCalendar from '../../../components/shared/ModalCalendar';
import ModalEventDetails from '../../../components/shared/ModalEventDetails';
import Button from '../../../components/Button';

export default function EventsList() {
  const [isCalendarModalOpen, setCalendarModal] = useState(false);
  const [isEventDetailsModalOpen, setEventDetailsModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const { user, setSelectedDate, selectedDate } = useContext(AuthContext);

  function handleToggleCalendarModal() {
    setCalendarModal((prevState) => !prevState);
  }

  function handleToggleEventDetails() {
    setEventDetailsModal((prevState) => !prevState);
  }

  function openEventDetailsModal(event) {
    setEventDetailsModal(true);
    setEventDetails(event);
  }

  function handleChangeDate(date) {
    setSelectedDate(date);
  }

  const filteredSchedule = useMemo(() => user?.schedule
    ?.filter((item) => (
      moment(item.from, 'DD-MM-YYYY HH:mm').isSame(selectedDate, 'day')
      && moment(item.to, 'DD-MM-YYYY HH:mm').isSame(selectedDate, 'day')
    ))
    .sort((a, b) => {
      if (moment(a.from, 'DD-MM-YYYY HH:mm').diff(moment(b.from, 'DD-MM-YYYY HH:mm'), 'minutes') < 0) {
        return -1;
      }

      if (moment(a.from, 'DD-MM-YYYY HH:mm').diff(moment(b.from, 'DD-MM-YYYY HH:mm'), 'minutes') > 0) {
        return 1;
      }

      return 0;
    }), [user?.schedule, selectedDate]);

  return (
    <Container>
      <Header>
        <div>
          <h2>Atendimentos</h2>
          <p>
            {moment(selectedDate).isSame(moment(), 'day') && (
              <>
                Hoje
                <span> | </span>
              </>
            )}
            {moment(selectedDate).format('DD/MM/YYYY')}
            <span> | </span>
            {moment(selectedDate).format('dddd')}
          </p>
        </div>
        <div>
          <Button variant="asdas" onClick={handleToggleCalendarModal}>
            <FaCalendarAlt />
          </Button>
        </div>
      </Header>

      <div>
        {filteredSchedule?.map((event) => (
          <EventCard onClick={() => openEventDetailsModal(event)} key={event._id}>
            <div>
              <p>{event.clientName}</p>
            </div>
            <div>
              <p>{moment(event.from, 'DD-MM-YYYY HH:mm').format('HH:mm')}</p>
              <FaEye />
            </div>
          </EventCard>
        ))}
      </div>

      <ModalCalendar
        open={isCalendarModalOpen}
        onClose={handleToggleCalendarModal}
        selectedDate={selectedDate}
        onChangeDate={handleChangeDate}
      />

      <ModalEventDetails
        open={isEventDetailsModalOpen}
        onClose={handleToggleEventDetails}
        selectedEvent={eventDetails}
      />
    </Container>
  );
}
