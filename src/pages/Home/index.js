import { useContext, useMemo } from 'react';
import axios from 'axios';
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
import { API_URL } from '../../utils/contants';

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
    try {
      const token = await askNotificationsPermissions();

      if (!token) {
        return;
      }

      const response = await axios.put(
        `${API_URL}/users/${user.id}`,
        {
          notificationsToken: token,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-wa-username': user.username,
          },
        },
      );

      if (response) {
        toast.success('as notificações foram ativadas com sucesso!');
      }
    } catch (error) {
      toast.error(`algo deu errado ${error}`);
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

        <p>{HelloSentence}</p>
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
