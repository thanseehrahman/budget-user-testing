import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  activateCategoryForm,
  deactivateCategoryForm,
} from "../../redux/features/categories/categorySlice";
import {
  activateTransactionForm,
  deactivateTransactionForm,
} from "../../redux/features/transactions/transactionSlice";

function AddButtonForm({ add }) {
  const dispatch = useDispatch();

  const activateTransaction = () => {
    dispatch(activateTransactionForm());
    dispatch(deactivateCategoryForm());
  };

  const activateCategory = () => {
    dispatch(activateCategoryForm());
    dispatch(deactivateTransactionForm());
  };

  return (
    <Add
      onClick={add === "transaction" ? activateTransaction : activateCategory}
    >
      <Label>Add {add}+</Label>
    </Add>
  );
}

const Add = styled.div`
  width: 100%;
  padding: 8px 0;
  background: #2b2b2b;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Label = styled.h5`
  text-align: center;
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

export default AddButtonForm;
