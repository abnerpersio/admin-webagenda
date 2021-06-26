import styled, { css } from 'styled-components';

export const Container = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: ${theme.spacing.small};
  `}

  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 300;
  
  span {
    ${({ theme }) => css`
      color: ${theme.colors.orange};
      font-weight: 300;
    `}
  }
`;