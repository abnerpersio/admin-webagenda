import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 280px;
  /* max-width: 520px; */
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
  margin: ${({ theme }) => theme.spacing.medium} 0;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  
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
