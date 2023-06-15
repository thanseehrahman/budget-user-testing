import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { activateTransactionForm } from "../../redux/features/transactions/transactionSlice";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";

function AddButtonSquare({ add }) {
  const dispatch = useDispatch();

  return (
    <Container
      onClick={() => {
        dispatch(
          add === "transaction"
            ? activateTransactionForm()
            : activateCategoryForm()
        );
      }}
      style={{ background: add === "transaction" ? "#4cbe5e" : "#bedd42" }}
    >
      <Plus
        src={
          add === "transaction" ? "/images/plus.svg" : "/images/plus-dark.svg"
        }
      />
    </Container>
  );
}

const Container = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
`;

const Plus = styled.img`
  width: 20px;
  display: block;
`;

export default AddButtonSquare;
