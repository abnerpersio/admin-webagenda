import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  & p {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.colors.blue};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    width: 100%;
    max-width: 500px;
    text-align: left;
    cursor: pointer;
    margin: ${({ theme }) => theme.spacing.small} 0;
  }

  & p:hover {
    color: ${({ theme }) => theme.colors.orange};
  }

  button {
    width: 100%;
  }

  .toggle-password {
    margin-top: ${({ theme }) => theme.spacing.small};
    cursor: pointer;
    border: none;
    background: transparent;
    text-align: left;
  }
`;
