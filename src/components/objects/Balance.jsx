import React, { useEffect, useState } from "react";
import GridElement from "./GridElement";
import styled from "styled-components";
import Dialogue from "./Dialogue";

function Balance({ transactions, income, expenses, display, animationDelay }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
    const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
  }, [income, expenses]);

  return (
    <GridElement
      subheading="Balance"
      type="large"
      link="transactions"
      display={display}
      animationDelay={animationDelay}
    >
      {transactions.length === 0 ? (
        <Dialogue type="transaction" />
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
    </GridElement>
  );
}

const Box = styled.div`
  height: calc(100% - 40px - 20px);
  width: 100%;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2b2b;
  border: 2px solid #4b4b4b;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 28px 0;
  }
`;

const Flex = styled.div``;

const Calc = styled.div``;

const TotalIncome = styled.h6`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  color: #4f883b;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TotalExpense = styled(TotalIncome)`
  color: #c33939;
`;

const Equal = styled.h5`
  font-size: 28px;
  font-weight: 600;
`;

export default Balance;
