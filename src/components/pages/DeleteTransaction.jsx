import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deactivateDeleteTransactionBox,
  selectDeleteTransaction,
} from "../../redux/features/transactions/transactionSlice";
import styled from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

function DeleteTransaction() {
  const transactionID = useSelector(selectDeleteTransaction);
  const dispatch = useDispatch();

  const deleteTransaction = async () => {
    await deleteDoc(doc(db, "transactions", transactionID));
    dispatch(deactivateDeleteTransactionBox());
  };

  return (
    <Background>
      <Box>
        <Alert>Are you sure want to delete this transaction?</Alert>
        <Buttons>
          <Cancel onClick={() => dispatch(deactivateDeleteTransactionBox())}>
            Cancel
          </Cancel>
          <Delete onClick={deleteTransaction}>Delete</Delete>
        </Buttons>
      </Box>
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

const Box = styled.div`
  width: 554px;
  padding: 40px;
  background: #202020;
  border-radius: 20px;
`;

const Alert = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Cancel = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 8px;
  background: #2b2b2b;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;
  border: 2px solid #4b4b4b;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Delete = styled(Cancel)`
  background: #ec3939;
  border-color: transparent;
`;

export default DeleteTransaction;
