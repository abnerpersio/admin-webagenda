import {
  Container, Header, Body, Footer,
} from './styles';

import logo from '../../assets/logo.svg';

import LoginForm from '../../components/LoginForm';

export default function Login() {
  return (
    <Container>

      <Header>
        <img src={logo} alt="Logo Web Agenda" />
        <h2>
          Web
          {' '}
          <span>Agenda</span>
        </h2>
      </Header>

      <Body>
        <LoginForm />
      </Body>

      <Footer>
        <p>
          v 1.0.1 |
          Feito com
          <span> ❤ </span>
          pela galera da
          <a target="_blank" rel="noreferrer" href="https://webatom.com.br/"> Web Atom </a>
        </p>
      </Footer>

    </Container>
  );
}
