import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { activateTransactionForm } from "../../redux/features/transactions/transactionSlice";

function AddTransactionButton() {
  const dispatch = useDispatch();

  return (
    <Container
      onClick={() => {
        dispatch(activateTransactionForm());
      }}
    >
      <Plus src="/images/plus.svg" />
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  width: 60px;
  background: #4cbe5e;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Plus = styled.img`
  display: block;
`;

export default AddTransactionButton;
