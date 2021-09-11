import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Container } from './styles';

export default function Loader({ isActive }) {
  if (!isActive) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container>
        <div className="clock-loader" />
      </Container>
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
