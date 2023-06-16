import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectExpenses,
  selectIncome,
  selectTransactions,
} from "../../redux/features/transactions/transactionSlice";
import AddButtonCircle from "../buttons/AddButtonCircle";
import Balance from "../objects/Balance";
import Dialogue from "../objects/Dialogue";
import Transaction from "../objects/Transaction";
import { TabTitle } from "../utilities/titleFunction";

function Transactions() {
  TabTitle("Transactions - Budget Ease");

  const [variable, setVariable] = useState("");
  const [array, setArray] = useState([]);
  const [sortDropdown, setSortDropdown] = useState(false);

  const transactions = useSelector(selectTransactions);
  const income = useSelector(selectIncome);
  const expenses = useSelector(selectExpenses);

  useEffect(() => {
    const income = transactions.filter(
      (transaction) => transaction.type === "income"
    );
    const expense = transactions.filter(
      (transaction) => transaction.type === "expense"
    );
    // const dates = transactions.map(
    //   (transaction) => new Date(transaction.date.seconds * 1000)
    // );

    const sortArray = (value) => {
      let data =
        value === "" ? transactions : value === "income" ? income : expense;
      setArray(data);
    };

    sortArray(variable);
  }, [transactions, variable]);

  const sortOptions = ["all", "income", "expense"];

  return (
    <Container>
      <Top>
        <Heading>Transactions</Heading>
        <Right>
          <SortArea>
            <SortBy>Sortby</SortBy>
            <Select onClick={() => setSortDropdown(!sortDropdown)}>
              <CurrentOption>
                {variable === "" ? "all" : variable}
              </CurrentOption>
              <DropDown src="/images/down-small.svg" />
              <Options style={sortDropdown ? { display: "block" } : null}>
                {sortOptions.map((value, index) => (
                  <Option
                    onClick={() => {
                      setVariable(value === "all" ? "" : value);
                      setSortDropdown(!sortDropdown);
                    }}
                    key={index}
                  >
                    <Value>{value}</Value>
                  </Option>
                ))}
              </Options>
            </Select>
          </SortArea>
          <AddButtonCircle add="transaction" />
        </Right>
      </Top>
      <Grid>
        <Scroll>
          <SmallGrid>
            {array.length === 0 ? (
              <Dialogue type="transaction" />
            ) : (
              array.map((transaction, index) => (
                <Transaction
                  transaction={transaction}
                  key={index}
                  index={index}
                />
              ))
            )}
            <EmptyTransaction />
          </SmallGrid>
          <Bottom />
        </Scroll>
        <Balance
          transactions={transactions}
          income={income}
          expenses={expenses}
          display={false}
        />
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

  @media (max-width: 768px) {
    margin-bottom: 42px;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: start;
    gap: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }
`;

const Heading = styled.h3`
  font-size: 48px;
  color: #f9f9f9;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SortArea = styled.div`
  display: flex;
`;

const SortBy = styled.h6`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 540px) {
    display: block;
  }
`;

const Select = styled.div`
  min-width: 120px;
  padding: 10px 20px;
  padding-right: 12px;
  position: relative;
  background: #202020;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentOption = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #848484;
  text-transform: capitalize;
`;

const DropDown = styled.img``;

const Options = styled.div`
  position: absolute;
  left: 0;
  top: 42px;
  width: 100%;
  background: #1a1a1a;
  border: 2px solid #2b2b2b;
  border-radius: 8px;
  display: none;
  z-index: 3;
`;

const Option = styled.div`
  padding: 10px 20px 0;
`;

const Value = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #f9f9f9;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1280px) {
    grid-template-columns: repeat(1, 1fr);
  }
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
`;

const EmptyTransaction = styled.div`
  padding: 24px 20px;
  background: #202020;
  border-radius: 12px;
  margin-bottom: 32px;
  opacity: 0;
  visibility: hidden;
`;

const Bottom = styled.div`
  position: fixed;
  bottom: 60px;
  height: 120px;
  width: 100%;
  background: linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, #191919 100%);

  @media (max-width: 768px) {
    bottom: 42px;
  }
`;

export default Transactions;
