import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { activateTransactionForm } from "../../redux/features/transactions/transactionSlice";
import { useDispatch } from "react-redux";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";

function Navbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const setBackground = (path) => {
    return pathname === path
      ? { backgroundColor: "rgba(255,255,255,0.05)" }
      : null;
  };

  const setColor = (path) => {
    return pathname === path ? { color: "#f9f9f9" } : null;
  };

  return (
    <Sidebar>
      <Top>
        <Dashboard style={setBackground("/")}>
          <Link to="/">
            <Title style={setColor("/")}>Dashboard</Title>
          </Link>
        </Dashboard>
        <Transactions style={setBackground("/transactions")}>
          <Link to="/transactions">
            <Title style={setColor("/transactions")}>Transactions</Title>
          </Link>
        </Transactions>
        <Categories style={setBackground("/categories")}>
          <Link to="/categories">
            <Title style={setColor("/categories")}>Categories</Title>
          </Link>
        </Categories>
        <Statistics style={setBackground("/statistics")}>
          <Link to="/statistics">
            <Title style={setColor("/statistics")}>Statistics</Title>
          </Link>
        </Statistics>
        <Info style={setBackground("/info")}>
          <Link to="/info">
            <Title style={setColor("/info")}>Info</Title>
          </Link>
        </Info>
      </Top>
      <Bottom>
        <NewTransaction onClick={() => dispatch(activateTransactionForm())}>
          <Title>
            New Transaction <Span>+</Span>
          </Title>
        </NewTransaction>
        <NewCategory onClick={() => dispatch(activateCategoryForm())}>
          <Title>
            New Category <Span className="category">+</Span>
          </Title>
        </NewCategory>
      </Bottom>
    </Sidebar>
  );
}

const Sidebar = styled.div`
  height: 100vh;
  width: 270px;
  overflow: hidden;
  position: fixed;
  padding: 60px 0;
  background: #202020;
  border-right: 1px solid #2b2b2b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div``;

const Dashboard = styled.div`
  padding: 10px 0 10px 56px;
`;

const Title = styled.h6`
  font-size: 20px;
  font-weight: 500;
  color: #848484;
`;

const Transactions = styled(Dashboard)``;

const Categories = styled(Dashboard)``;

const Statistics = styled(Dashboard)``;

const Info = styled(Dashboard)``;

const Bottom = styled.div``;

const NewTransaction = styled.div`
  padding: 10px 0 10px 56px;
  cursor: pointer;
`;

const Span = styled.span`
  color: #4cbe5e;

  &.category {
    color: #bedd42;
  }
`;

const NewCategory = styled(NewTransaction)``;

export default Navbar;
