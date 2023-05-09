import React from "react";
import { useDispatch } from "react-redux";
import { activateTransactionForm } from "../../redux/features/transactions/transactionSlice";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";
import styled from "styled-components";

function Dialogue({ type, margin }) {
  const dispatch = useDispatch();

  const dialogues = {
    transaction: {
      note: "No transactions found.",
      action: () => {
        dispatch(activateTransactionForm());
      },
      add: "Transaction",
    },
    category: {
      note: "No categories found.",
      action: () => {
        dispatch(activateCategoryForm());
      },
      add: "Category",
    },
    transactionInCategory: {
      note: "No transactions found in this category.",
      action: () => {
        dispatch(activateTransactionForm());
      },
      add: "Transaction",
    },
  };

  return (
    <DialogueBox margin={margin}>
      <Note>
        {type === "transaction"
          ? dialogues.transaction.note
          : type === "category"
          ? dialogues.category.note
          : dialogues.transactionInCategory.note}
      </Note>
      <Add
        onClick={
          type === "transaction"
            ? dialogues.transaction.action
            : type === "category"
            ? dialogues.category.action
            : dialogues.transactionInCategory.action
        }
      >
        Click to add{" "}
        {type === "transaction"
          ? dialogues.transaction.add
          : type === "category"
          ? dialogues.category.add
          : dialogues.transactionInCategory.add}{" "}
        <Span>+</Span>
      </Add>
    </DialogueBox>
  );
}

const DialogueBox = styled.div`
margin-top: ${props => props.margin}px;
`;

DialogueBox.defaultProps = {
  margin: "0",
};

const Note = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #848484;
  margin-bottom: 10px;
`;

const Add = styled(Note)`
  margin-bottom: 0;
  cursor: pointer;
`;

const Span = styled.span`
  color: #4cbe5e;
`;

export default Dialogue;
