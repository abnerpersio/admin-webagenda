import React, { useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../../../context/AuthProvider';
import { Container, CardsList } from './styles';

export default function FreeHours() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <h2>Horários disponíveis</h2>
      <CardsList>
        {
          user?.freeHours?.map((freeHour) => (
            <div key={freeHour[0]}>
              {moment(freeHour[0], 'DD-MM-YYYY HH:mm').format('HH:mm')}
              {' '}
              até
              {' '}
              {moment(freeHour[1], 'DD-MM-YYYY HH:mm').format('HH:mm')}
            </div>
          ))
        }
      </CardsList>
    </Container>
  );
}
