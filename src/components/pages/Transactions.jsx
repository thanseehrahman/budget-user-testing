import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  activateDeleteTransactionBox,
  activateEditTransactionForm,
  activateTransactionForm,
  selectExpenses,
  selectIncome,
  selectTransactions,
  setDeleteTransaction,
  setEditTransaction,
} from "../../redux/features/transactions/transactionSlice";
import { Link } from "react-router-dom";

function Transactions() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const transactions = useSelector(selectTransactions);
  const income = useSelector(selectIncome);
  const expenses = useSelector(selectExpenses);
  const dispatch = useDispatch();

  useEffect(() => {
    const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
    const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
  }, [income, expenses]);

  return (
    <Container>
      <Top>
        <Heading>Transactions</Heading>
      </Top>
      <Grid>
        <Scroll>
          <SmallGrid>
            {transactions.map((transaction, index) => (
              <Transaction key={index}>
                <Name>
                  <Title>{transaction.title}</Title>
                </Name>
                <Category>
                  <Link to={"/category/" + transaction.categoryID}>
                    <Title className="category">
                      {transaction.categoryName}
                    </Title>
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
                      setEditTransaction({
                        id: transaction.id,
                        title: transaction.title,
                        amount: transaction.amount,
                        type: transaction.type,
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
              </Transaction>
            ))}
          </SmallGrid>
          <Bottom />
        </Scroll>
        <Balance>
          <SubHeading>Balance</SubHeading>
          {transactions.length === 0 ? (
            <Title
              className="add"
              onClick={() => dispatch(activateTransactionForm())}
            >
              Click to add Transaction <Span>+</Span>
            </Title>
          ) : (
            <Box>
              <Flex>
                <Calc>
                  <TotalIncome>+{totalIncome}</TotalIncome>
                  <TotalExpense>-{totalExpense}</TotalExpense>
                </Calc>
                <Equal>= {totalIncome - totalExpense}</Equal>
              </Flex>
            </Box>
          )}
        </Balance>
      </Grid>
    </Container>
  );
}

const Container = styled.div``;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;
`;

const Heading = styled.h3`
  font-size: 48px;
  color: #f9f9f9;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
`;

const Scroll = styled.div`
  position: relative;
  grid-column: span 2;
  height: calc(100vh - 90px - 64px - 60px - 60px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SmallGrid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(1, 1fr);
  padding-bottom: 90px;
`;

const Transaction = styled.div`
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

const Bottom = styled.div`
  position: fixed;
  bottom: 60px;
  height: 120px;
  width: 100%;
  background: linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, #191919 100%);
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

const Balance = styled.div`
  padding: 40px;
  background: #202020;
  border-radius: 20px;
  z-index: 2;
`;

const SubHeading = styled.h4`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Span = styled.span`
  color: #4cbe5e;
`;

const Box = styled.div`
  width: 100%;
  padding: 40px 0;
  background: #2b2b2b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid #4b4b4b;
`;

const Flex = styled.div``;

const Calc = styled.div``;

const TotalIncome = styled.h6`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  display: inline-block;
  margin-right: 10px;
  color: #4f883b;
`;

const TotalExpense = styled(TotalIncome)`
  color: #c33939;
`;

const Equal = styled.h5`
  font-size: 32px;
  font-weight: 600;
`;

export default Transactions;
