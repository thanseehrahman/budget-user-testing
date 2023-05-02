import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddTransactionButton from "../buttons/AddTransactionButton";
import { useDispatch, useSelector } from "react-redux";
import {
  activateTransactionForm,
  selectExpenses,
  selectIncome,
  selectTransactions,
} from "../../redux/features/transactions/transactionSlice";
import AddCategoryButton from "../buttons/AddCategoryButton";
import { Link } from "react-router-dom";
import { selectCategories } from "../../redux/features/categories/categorySlice";

function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const transactions = useSelector(selectTransactions);
  const income = useSelector(selectIncome);
  const expenses = useSelector(selectExpenses);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
    const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
  }, [income, expenses]);

  const countTransaction = (array) => {
    let count = array.length;
    return count;
  };

  return (
    <Container>
      <Top>
        <Heading>Dashboard</Heading>
        <AddTransactionButton />
      </Top>
      <Grid>
        <Transactions>
          <Count>{countTransaction(transactions)}</Count>
          <Label>
            {transactions.length <= 1
              ? "Transaction Added"
              : "Transactions Added"}
          </Label>
        </Transactions>
        <Income>
          <Count className="income">{countTransaction(income)}</Count>
          <Label>Income Added</Label>
        </Income>
        <Expenses>
          <Count className="expenses">{countTransaction(expenses)}</Count>
          <Label>
            {expenses.length <= 1 ? "Expense Added" : "Expenses Added"}
          </Label>
        </Expenses>
        <Balance>
          <SubHeading>
            <Link to="/transactions">Balance</Link>
          </SubHeading>
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
        <LatestTransactions>
          <SubHeading>
            <Link to="/transactions">Transactions</Link>
          </SubHeading>
          {transactions.length === 0 ? (
            <Title
              className="add"
              onClick={() => dispatch(activateTransactionForm())}
            >
              Click to add Transaction <Span>+</Span>
            </Title>
          ) : (
            <List>
              {transactions.slice(0, 4).map((transaction, index) => (
                <Item key={index}>
                  <Title>{transaction.title}</Title>
                  <Amount
                    className={
                      transaction.type === "income" ? "income" : "expense"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {transaction.amount}
                  </Amount>
                </Item>
              ))}
            </List>
          )}
        </LatestTransactions>
        <Statistics>
          <SubHeading>
            <Link to="/statistics">Statistics</Link>
          </SubHeading>
          <Title>Coming soon</Title>
        </Statistics>
        <Categories>
          <SubHeading>
            <Link to="/categories">Categories</Link>
          </SubHeading>
          <AddCategoryButton />
          <Count className="categories">{countTransaction(categories)}</Count>
          <Label className="categories">
            {categories.length <= 1 ? "Category Added" : "Categories Added"}
          </Label>
          <List>
            {categories.slice(0, 8).map((category, index) => (
              <Item key={index} className="category">
                <Link to={"/category/" + category.id}>
                  <Title className="category">{category.title}</Title>
                </Link>
              </Item>
            ))}
          </List>
        </Categories>
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

const Transactions = styled.div`
  padding: 20px 40px;
  background: #202020;
  border-radius: 20px;
`;

const Count = styled.h6`
  font-size: 28px;
  font-weight: 600;
  color: #f9f9f9;
  margin-bottom: 6px;

  &.income {
    color: #4f883b;
  }

  &.expenses {
    color: #c33939;
  }

  &.categories {
    margin-top: 20px;
  }
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #848484;

  &.categories {
    margin-bottom: 20px;
  }
`;

const Income = styled(Transactions)``;

const Expenses = styled(Transactions)``;

const Balance = styled.div`
  min-height: 296px;
  padding: 40px;
  background: #202020;
  border-radius: 20px;
`;

const SubHeading = styled.h4`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
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

const List = styled.ul``;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0px;
  border-bottom: 2px solid #2b2b2b;
  margin-bottom: 8px;

  &.category {
    padding: 8px 0;
    margin-bottom: 0;
  }
`;

const Title = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #848484;

  &.add {
    cursor: pointer;
  }

  &.category {
    font-size: 20px;
    font-weight: 600;
  }
`;

const Span = styled.span`
  color: #4cbe5e;
`;

const Amount = styled.h5`
  font-size: 16px;
  font-weight: 500;

  &.income {
    color: #4f883b;
  }

  &.expense {
    color: #c33939;
  }
`;

const LatestTransactions = styled(Balance)``;

const Statistics = styled(Balance)`
  grid-column: 1/3;
  grid-row: 3;
`;

const Categories = styled(Balance)`
  grid-row: 2/4;
`;

export default Dashboard;
