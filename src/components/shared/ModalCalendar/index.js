import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';

import Modal from '../../Modal';
import Calendar from '../../Calendar';

export default function ModalCalendar({
  open, onClose, selectedDate, onChangeDate,
}) {
  const [currentMonth, setCurrentMonth] = useState(
    moment().format('MMMM YYYY'),
  );

  function handlePrevMonth() {
    setCurrentMonth((prevState) => moment(prevState, 'MMMM YYYY').subtract(1, 'month').format('MMMM YYYY'));
  }

  function handleNextMonth() {
    setCurrentMonth((prevState) => moment(prevState, 'MMMM YYYY').add(1, 'month').format('MMMM YYYY'));
  }

  const handleChangeDate = (day) => {
    onChangeDate(day);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Calendar
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onChangeDate={handleChangeDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
    </Modal>
  );
}

ModalCalendar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired,
};
