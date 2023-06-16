import React from "react";
import styled from "styled-components";
import AddTransactionForm from "../forms/AddTransactionForm";

function AddTransaction() {
  return (
    <Background>
      <AddTransactionForm />
    </Background>
  );
}

const Background = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  z-index: 4;

  @media (max-width: 540px) {
    padding: 20px;
  }
`;

export default AddTransaction;
