import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';

import {
  Header, PrevIcon, NextIcon, Title, GridLayout, WeekDayBlock, DayBlock,
} from './styles';

function CalendarHeader({
  onPrevMonth,
  currentMonth,
  onNextMonth,
}) {
  return (
    <Header>
      <PrevIcon onClick={onPrevMonth} />
      <Title>{currentMonth}</Title>
      <NextIcon onClick={onNextMonth} />
    </Header>
  );
}

function CalendarBody({ selectedDate, currentMonth, onChangeDate }) {
  const momentSelectedDate = moment(selectedDate, 'DD/MM/YYYY');
  const momentCurrentMonth = moment(currentMonth, 'MMMM YYYY');

  function renderDays() {
    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const fullDaysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    function renderDaysOfWeek() {
      return daysOfWeek.map((day, index) => (
        <WeekDayBlock key={fullDaysOfWeek[index]}>{day}</WeekDayBlock>
      ));
    }

    return <GridLayout>{renderDaysOfWeek()}</GridLayout>;
  }

  function renderCells() {
    const monthStart = momentCurrentMonth.clone().startOf('month');
    const monthEnd = monthStart.clone().endOf('month');
    const startDate = monthStart.clone().startOf('week');
    const endDate = monthEnd.endOf('week');

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        formattedDate = moment(day).format('D');
        const cloneDay = day;
        days.push(
          <DayBlock
            key={day}
            disabled={!day.isSame(monthStart, 'month')}
            selected={day.isSame(momentSelectedDate, 'day')}
            onClick={() => onChangeDate(cloneDay.toISOString())}
          >
            {formattedDate}
          </DayBlock>,
        );
        day = moment(day).add(1, 'days');
      }

      rows.push(days);
      days = [];
    }

    return <GridLayout>{rows}</GridLayout>;
  }

  return (
    <>
      {renderDays()}
      {renderCells()}
    </>
  );
}

export default function Calendar({
  onPrevMonth, onNextMonth, onChangeDate, selectedDate, currentMonth,
}) {
  return (
    <>
      <CalendarHeader
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        currentMonth={currentMonth}
      />
      <CalendarBody
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onChangeDate={onChangeDate}
      />
    </>
  );
}

CalendarHeader.propTypes = {
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
  currentMonth: PropTypes.string.isRequired,
};

CalendarBody.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired,
};

Calendar.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
};
