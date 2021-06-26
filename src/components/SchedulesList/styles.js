import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  div p {
    font-weight: ${({ theme }) => theme.fontWeight.light};
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
