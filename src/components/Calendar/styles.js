import styled, { css } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Title = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

export const PrevIcon = styled(FaChevronLeft)`
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

export const NextIcon = styled(FaChevronRight)`
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
`;

export const WeekDayBlock = styled.p`
  opacity: 0.6;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-align: center;
  cursor: default;
`;

export const DayBlock = styled.p`
  text-align: center;
  cursor: pointer;

  &:hover {
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.blue};
  }

  ${(props) => props.disabled
    && css`
      color: ${({ theme }) => theme.colors.disabled};
      font-weight: ${({ theme }) => theme.fontWeight.light};
    `}

  ${(props) => props.selected
    && css`
      color: ${props.theme.colors.orange};
    `}
`;
