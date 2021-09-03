import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};

  button {
    margin: 16px 0;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
