import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 150px 0px;
  max-width: 800px;

  & > div {
    margin-top: ${({ theme }) => theme.spacing.small};
  }
`;

export const CardsList = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 220px;
    border: 1.5px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
    margin: ${({ theme }) => theme.spacing.medium} 4px;
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  @media(max-width: 380px) {
    flex-direction: column;
    justify-content: flex-start;

    & > div {
      margin: ${({ theme }) => theme.spacing.medium} 0px;
    }
  }
`;
