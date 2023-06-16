import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  deactivateEditTransactionForm,
  deactivateTransactionForm,
} from "../../redux/features/transactions/transactionSlice";
import { deactivateCategoryForm } from "../../redux/features/categories/categorySlice";

function CloseButton() {
  const dispatch = useDispatch();

  return (
    <Close
      onClick={() => {
        dispatch(deactivateTransactionForm());
        dispatch(deactivateEditTransactionForm());
        dispatch(deactivateCategoryForm());
      }}
    >
      <Label>Close</Label>
    </Close>
  );
}

const Close = styled.div`
  width: 100%;
  padding: 8px 0;
  background: #2b2b2b;
  border: 2px solid #4b4b4b;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Label = styled.h5`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

export default CloseButton;
