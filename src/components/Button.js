import styled, { css } from 'styled-components';

export default styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.small};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: ${({ theme }) => theme.spacing.large};
  }

  svg {
    width: ${({ theme }) => theme.spacing.medium};
    height: ${({ theme }) => theme.spacing.medium};
  }

  & > * + svg {
    margin-left: 8px;
  }

  &.large-icon svg {
    width: ${({ theme }) => theme.spacing.large};
    height: ${({ theme }) => theme.spacing.large};
  }


  ${({ isLoading, theme }) => isLoading
    && css`
      background: ${theme.colors.black};
      cursor: default;
    `}

  ${({ transparent, theme }) => transparent
    && css`
      background-color: transparent;
      border: 2px solid ${theme.colors.blue};
      color: ${theme.colors.blue};
  `}

  ${({ variant, theme }) => variant === 'orange'
  && css`
    background: ${theme.colors.orange};
    color: ${theme.colors.white};
  `}

  ${({ variant, transparent, theme }) => variant === 'orange' && transparent
  && css`
    background-color: transparent;
    border: 2px solid ${theme.colors.orange};
    color: ${theme.colors.orange};
  `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.blue};

    ${({ transparent, theme }) => transparent
    && css`
      border-color: ${theme.colors.hover.blue};
      background: transparent;
      color: ${theme.colors.hover.blue};
    `}

    ${({ variant, theme }) => variant === 'orange'
    && css`
      border-color: ${theme.colors.hover.orange};
      background-color: transparent;
      color: ${theme.colors.hover.orange};
    `}
  }

  &:disabled {
    border-color: transparent;
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.white};
    cursor: default;
  }

  ${({ error, theme }) => error
    && css`
      border-color: transparent;
      background: ${theme.colors.disabled};
      color: ${theme.colors.white};
      cursor: default;
    `}

`;
