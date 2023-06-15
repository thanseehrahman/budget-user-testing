import React from "react";
import GridElement from "./GridElement";
import AddButton from "../buttons/AddButton";
import Dialogue from "./Dialogue";
import styled from "styled-components";

function Transactions({ transactions, animationDelay }) {
  return (
    <GridElement subheading="Transactions" type="large" link="transactions" animationDelay={animationDelay}>
      <AddButton add="transaction" />
      {transactions.length === 0 ? (
        <Dialogue type="transaction" margin="20"/>
      ) : (
        <List>
          {transactions.slice(0, 3).map((transaction, index) => (
            <Item key={index}>
              <Title>{transaction.title}</Title>
              <Amount
                className={transaction.type === "income" ? "income" : "expense"}
              >
                {transaction.type === "income" ? "+" : "-"}
                {transaction.amount}
              </Amount>
            </Item>
          ))}
        </List>
      )}
    </GridElement>
  );
}

const List = styled.ul`
  margin-top: 20px;
`;

const Item = styled.li`
  padding: 8px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #2b2b2b;
  margin-bottom: 8px;
`;

const Title = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #848484;
`;

const Amount = styled(Title)``;

export default Transactions;
