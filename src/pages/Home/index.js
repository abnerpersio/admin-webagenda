import { useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  Container, Header, Body, Footer,
} from './styles';

import logo from '../../assets/logo.svg';

import EventsList from './EventsList';
import FreeHours from './FreeHours';
import FloatingButton from '../../components/FloatingButton';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthProvider';
import { askNotificationsPermissions } from '../../utils/pushNotifications';
import UserService from '../../services/UserService';

export default function Home() {
  const { user } = useContext(AuthContext);

  const HelloSentence = useMemo(() => {
    const sentences = [
      `Senti saudades, ${user?.username}!`,
      `Estava te procurando, ${user?.username}!`,
      `${user?.username}, por onde esteve?`,
      `Falaê ${user?.username}, muita correria por ai?`,
      `Seja bem vindo de volta, ${user?.username}`,
    ];

    const index = Math.round(Math.random() * (sentences.length - 1));
    return sentences[index];
  }, [user?.username]);

  async function handleActiveNotifications() {
    const token = await askNotificationsPermissions();

    if (!token) {
      toast.error('Ocorreu um erro ao ativar as notificações');
      return;
    }

    const updated = await UserService.updateUser({
      user,
      body: {
        notificationsToken: token,
      },
    });

    if (updated) {
      toast.success('As notificações foram ativadas com sucesso!');
    }
  }

  return (
    <Container>
      <Header>
        <div>
          <img src={logo} alt="Logo Web Agenda" />

          <h2>
            Web
            {' '}
            <span>Agenda</span>
          </h2>
        </div>

        <p>{user?.username && HelloSentence}</p>
      </Header>

      <Body>

        <EventsList />
        <FreeHours />
        <FloatingButton />

        <Button
          onClick={handleActiveNotifications}
          transparent
        >
          Ativar notificações
        </Button>
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
