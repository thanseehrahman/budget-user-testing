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
        <AddButtonCircle add="transaction" />
      </Top>
      <TopGrid>
        <GridElement subheading={countArray(transactions)} type="small">
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
        >
          <Label>
            {transactions.length <= 1 ? "Income Added" : "Income Added"}
          </Label>
        </GridElement>
        <GridElement
          subheading={countArray(transactions)}
          type="small"
          color="#c33939"
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
        />
        <Transactions transactions={transactions} />
        <Statistics />
        <Categories
          categories={categories}
          count={countArray(categories)}
          rowspan="1/3"
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
`;

const Heading = styled.h3`
  font-size: 48px;
  color: #f9f9f9;
`;

const TopGrid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #848484;
`;

export default Dashboard;
