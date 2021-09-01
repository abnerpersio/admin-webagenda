import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(36, 37, 38, 0.4);
  z-index: 1;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.small};
  padding-top: ${({ theme }) => theme.spacing.large};
  min-height: 100%;
  height: 100%;
  width: 60%;
  max-width: 580px;
  margin: 0 auto;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
  overflow: auto;
  position: absolute;
  right: 0;
  top: 0;

  @media (max-width: 500px) {
    width: 90%;
  }

  button.btn-close {
    margin-top: ${({ theme }) => theme.spacing.medium};
    margin-left: ${({ theme }) => theme.spacing.medium};
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 30px;
    border: none;
    background: transparent;
  }
`;
