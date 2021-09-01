import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Saira', sans-serif;
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    padding: 0;
    margin: 0;
    outline: none;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.main};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize.large};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.medium};
  }

  h4, p {
    font-size: ${({ theme }) => theme.fontSize.text};
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.white};
    color: ${(props) => props.theme.colors.black};
    padding: 0;
    margin: 0;
  }
`;
