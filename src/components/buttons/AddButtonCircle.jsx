import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { activateTransactionForm } from "../../redux/features/transactions/transactionSlice";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";

function AddButtonCircle({ add, display }) {
  const dispatch = useDispatch();

  return (
    <Container
      display={display}
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
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 640px) {
    display: ${(props) => (props.display ? "flex" : "none")};
    height: 42px;
    width: 42px;
  }
`;

const Plus = styled.img`
  width: 40px;
  display: block;

  @media (max-width: 640px) {
    width: 28px;
  }
`;

export default AddButtonCircle;
