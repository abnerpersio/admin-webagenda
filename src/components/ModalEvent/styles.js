import styled from "styled-components";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;