import PropTypes from 'prop-types';
import { Container } from './styles';
import { FaEye } from 'react-icons/fa';

export default function Schedule(props) {
  return (
    <Container>
      <div>
        <p>{props.event.clientName}</p>
      </div>
      <div>
        <p>{props.event.from}</p>
        <FaEye onClick={() => props.onOpen(props.event)} />
      </div>
    </Container>
  );
}

Schedule.propTypes = {
  event: PropTypes.shape({
    clientName: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
  }),
  onOpen: PropTypes.func
};