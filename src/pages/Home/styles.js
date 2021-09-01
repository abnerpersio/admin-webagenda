import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.medium};

  div {
    display: flex;
    align-items: center;

    h2 {
      color: ${({ theme }) => theme.colors.orange};
      font-weight: ${({ theme }) => theme.fontWeight.light};

      span {
        font-weight: ${({ theme }) => theme.fontWeight.bold};
      }
    }

    img {
      width: 40px;
    }
  }

  p {
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.small} 0;
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: ${theme.spacing.small};
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.25);
  text-align: center;

  p {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 300;

    span, a {
      ${({ theme }) => css`
        text-decoration: none;
        color: ${theme.colors.orange};
        font-weight: 300;
      `}
    }
  }
`;
