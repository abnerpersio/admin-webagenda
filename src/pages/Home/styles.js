import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  margin: ${({ theme }) => theme.spacing.small} 0;
`;
