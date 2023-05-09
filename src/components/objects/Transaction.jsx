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

function Transaction({ transaction }) {
  const dispatch = useDispatch();

  return (
    <Item>
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
`;

const Name = styled.div`
  grid-column: span 4;
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
`;

const Category = styled.div`
  grid-column: span 4;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
`;

const Type = styled(Category)`
  grid-column: span 3;
`;

const Amount = styled(Category)`
  grid-column: span 3;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Icon = styled.img``;

const Delete = styled(Edit)``;

export default Transaction;
