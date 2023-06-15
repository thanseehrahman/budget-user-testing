import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectExpenses,
  selectIncome,
  selectTransactions,
} from "../../redux/features/transactions/transactionSlice";
import { selectCategories } from "../../redux/features/categories/categorySlice";
import AddButtonCircle from "../buttons/AddButtonCircle";
import GridElement from "../objects/GridElement";
import Balance from "../objects/Balance";
import Categories from "../objects/Categories";
import { TabTitle } from "../utilities/titleFunction";
import Transactions from "../objects/Transactions";
import Statistics from "../objects/Statistics";

function Dashboard() {
  TabTitle("Dashboard - Budget Ease");

  const transactions = useSelector(selectTransactions);
  const income = useSelector(selectIncome);
  const expenses = useSelector(selectExpenses);
  const categories = useSelector(selectCategories);

  const countArray = (array) => {
    let count = array.length;
    return count;
  };

  return (
    <Container>
      <Top>
        <Heading>Dashboard</Heading>
        <AddButtonCircle add="transaction" display={true}/>
      </Top>
      <TopGrid>
        <GridElement
          subheading={countArray(transactions)}
          type="small"
          animationDelay={0 / 7 + 0.2}
        >
          <Label>
            {transactions.length <= 1
              ? "Transaction Added"
              : "Transactions Added"}
          </Label>
        </GridElement>
        <GridElement
          subheading={countArray(income)}
          type="small"
          color="#4f883b"
          animationDelay={1 / 7 + 0.2}
        >
          <Label>
            {transactions.length <= 1 ? "Income Added" : "Income Added"}
          </Label>
        </GridElement>
        <GridElement
          subheading={countArray(transactions)}
          type="small"
          color="#c33939"
          animationDelay={2 / 7 + 0.2}
        >
          <Label>
            {transactions.length <= 1 ? "Expense Added" : "Expenses Added"}
          </Label>
        </GridElement>
      </TopGrid>
      <Grid>
        <Balance
          transactions={transactions}
          income={income}
          expenses={expenses}
          animationDelay={3 / 7 + 0.2}
        />
        <Transactions
          transactions={transactions}
          animationDelay={4 / 7 + 0.2}
        />
        <Statistics animationDelay={5 / 7 + 0.2} />
        <Categories
          categories={categories}
          count={countArray(categories)}
          rowspan="1/3"
          animationDelay={6 / 7 + 0.2}
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
`;

const Heading = styled.h3`
  font-size: 48px;
  color: #f9f9f9;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const TopGrid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 24px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #848484;
`;

export default Dashboard;
