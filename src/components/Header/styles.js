import styled from 'styled-components';

export const Container = styled.header`
  padding: ${({ theme }) => theme.spacing.medium};

  svg {
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }

  p {
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
`;

export const MainText = styled.h2`
  display: inline-block;
  vertical-align: middle;

  color: ${({ theme }) => theme.colors.orange};
  font-weight: ${({ theme }) => theme.fontWeight.light};

  span {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;