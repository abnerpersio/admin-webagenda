import styled, { css } from 'styled-components';

export default styled.select`
  width: 100%;
  display: block;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.text};
  padding: ${({ theme }) => theme.spacing.small};
  transition: border-color 0.2s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  & + div,
  & + input {
    margin-top: ${({ theme }) => theme.spacing.medium};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.5;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  ${({ error, theme }) => error
    && css`
      & {
        border-color: ${theme.colors.error} !important;
      }
    `}
`;
