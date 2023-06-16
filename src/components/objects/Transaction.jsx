import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  activateDeleteTransactionBox,
  activateEditTransactionForm,
  setDeleteTransaction,
  setEditTransactionCache,
} from "../../redux/features/transactions/transactionSlice";

function Transaction({ transaction, index }) {
  const dispatch = useDispatch();

  return (
    <Item animationDelay={index / 7 + 0.2}>
      <Name>
        <Title>{transaction.title}</Title>
      </Name>
      <Category>
        <Link to={"/category/" + transaction.categoryID}>
          <Title className="category">{transaction.categoryName}</Title>
        </Link>
      </Category>
      <Type>
        <Title
          className={`type ${
            transaction.type === "income" ? "income" : "expense"
          }`}
        >
          {transaction.type}
        </Title>
      </Type>
      <Amount>
        <Title
          className={`amount ${
            transaction.type === "income" ? "income" : "expense"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {transaction.amount}
        </Title>
      </Amount>
      <Edit
        onClick={() => {
          dispatch(activateEditTransactionForm());
          dispatch(
            setEditTransactionCache({
              id: transaction.id,
              title: transaction.title,
              amount: transaction.amount,
              type: transaction.type,
              categoryID: transaction.categoryID,
              categoryName: transaction.categoryName,
              date: transaction.date,
            })
          );
        }}
      >
        <Icon src="/images/edit.svg" />
      </Edit>
      <Delete
        onClick={() => {
          dispatch(activateDeleteTransactionBox());
          dispatch(setDeleteTransaction({ id: transaction.id }));
        }}
      >
        <Icon src="/images/delete.svg" />
      </Delete>
    </Item>
  );
}

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  padding: 24px 20px;
  background: #202020;
  border-radius: 12px;
  align-items: center;

  @media (max-width: 640px) {
    grid-gap: 20px;
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }

  
  @media (max-width: 480px) {
    padding: 18px;
  }

  animation-name: fade-up;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-delay: ${(props) => props.animationDelay}s;
  animation-fill-mode: both;

  @keyframes fade-up {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

const Name = styled.div`
  grid-column: span 4;

  @media (max-width: 640px) {
    grid-column: span 8;
  }

  @media (max-width: 540px) {
    grid-column: auto;
  }
`;

const Title = styled.h5`
  font-size: 20px;
  font-weight: 600;

  &.category {
    color: #848484;

    &:hover {
      text-decoration: underline;
    }
  }

  &.type.income {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: translateY(-4px);
    }
    color: #4cbe5e;
  }
  &.type.expense {
    color: #ec3939;
  }

  &.amount.income {
    color: #4f883b;
  }
  &.amount.expense {
    color: #c33939;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const Category = styled.div`
  grid-column: span 4;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;

  @media (max-width: 640px) {
    grid-column: span 10;
    grid-row: 2;
    padding: 0;
  }

  @media (max-width: 540px) {
    display: none;
  }
`;

const Type = styled(Category)`
  grid-column: span 3;

  @media (max-width: 640px) {
    display: none;
  }
`;

const Amount = styled(Category)`
  grid-column: span 3;

  @media (max-width: 640px) {
    grid-row: 1;
    grid-column: 9 / span 8;
    text-align: right;
  }

  @media (max-width: 540px) {
    display: block;
    grid-column: auto;
    grid-row: auto;
  }
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 640px) {
    grid-column: span 4;
    justify-content: flex-end;
  }

  @media (max-width: 540px) {
    display: none;
  }
`;

const Icon = styled.img``;

const Delete = styled(Edit)`
  @media (max-width: 640px) {
    grid-column: span 2;
  }
`;

export default Transaction;
