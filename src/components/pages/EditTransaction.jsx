import React from "react";
import EditTransactionForm from "../forms/EditTransactionForm";
import styled from "styled-components";

function EditTransaction() {
  return (
    <Background>
      <EditTransactionForm />
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
`;

export default EditTransaction;
