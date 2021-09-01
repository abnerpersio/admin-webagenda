import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  max-width: 800px;

  div p {
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }

  @media (max-width: 360px) {
    flex-direction: column;

    div + div {
      margin-top: ${({ theme }) => theme.spacing.medium};
    }
  }
`;

export const Button = styled.button`
  border: none;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.15);

  ${({ theme }) => css`
    font-size: ${theme.fontSize.medium};
    background: ${theme.colors.orange};
    color: ${theme.colors.white};
    border: 1.5px solid ${theme.colors.orange};
    padding: ${theme.spacing.small};
    border-radius: ${theme.borderRadius};
  `};

  &:hover {
    transition: 0.6s;
    cursor: pointer;
    background: transparent;
    color: ${({ theme }) => theme.colors.orange};
  }
`;

export const EventCard = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  margin: ${({ theme }) => theme.spacing.medium} 0;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  @media(max-width: 380px) {
    flex-direction: column;
    justify-content: flex-start;
  }

  div * {
    display: inline-block;
    vertical-align: middle;
  }

  div p + svg {
    margin-left: 15px;
  }

  div p + svg:hover {
    transition: .4s;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.orange};
  }
`;
