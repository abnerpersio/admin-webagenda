import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import Button from '../Button';

import MenuNewEvent from '../shared/MenuNewEvent';

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 100px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.blue};
    border-color: ${({ theme }) => theme.colors.hover.blue};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default function FloatingButton() {
  const [isModalOpen, setModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen((prevState) => !prevState);
  }

  return (
    <>
      <FixedButton onClick={toggleModal}>
        <FaPlus />
      </FixedButton>

      <MenuNewEvent
        open={isModalOpen}
        onClose={toggleModal}
      />
    </>
  );
}
