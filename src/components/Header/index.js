import { Container, MainText } from './styles';

import { ReactComponent as Logo } from '../../assets/logo.svg'

const helloSentence = (username) => { 
  let sentences = [
    `Senti saudades, ${username}!`,
    `Estava te procurando, ${username}!`,
    `${username}, por onde esteve?`,
    `Falaê ${username}, muita correria por ai?`,
  ];

  let index = Math.round(Math.random() * (sentences.length - 1));
  return sentences[index];
}

export default function Header() {
  return (
    <Container>
      <Logo />
      <MainText>
        Web <span>Agenda</span>
      </MainText>
      <p>{helloSentence('abnerpersio')}</p>
    </Container>
  );
}