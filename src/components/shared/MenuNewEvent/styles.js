import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};

  h3 {
    margin-bottom: 24px;
  }

  form {
    p {
      opacity: 0.8;
      margin: 8px 0;
    }

    button[type="submit"] {
      margin: 24px 0;
    }
  }
`;

export const CardsList = styled.div`
  display: flex;
  flex-wrap: wrap;

  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 60px;
    border: 1.8px solid transparent;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    margin: ${({ theme }) => theme.spacing.small} 4px;
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.hover.blue};
    }

    ${({ isselected, theme }) => isselected === 'on' && css`
      background: transparent;
      border-color: ${theme.colors.blue};
      color: ${theme.colors.blue};
    `}

    &:disabled {
      background: transparent;
      border-color: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.blue};
    }
  }
`;
