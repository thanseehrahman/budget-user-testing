import React, { useEffect, useState } from "react";
import GridElement from "./GridElement";
import styled from "styled-components";
import Dialogue from "./Dialogue";

function Balance({ transactions, income, expenses }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
    const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
  }, [income, expenses]);

  return (
    <GridElement subheading="Balance" type="large" link="transactions">
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
  width: 100%;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2b2b;
  border: 2px solid #4b4b4b;
  border-radius: 8px;
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
  font-size: 32px;
  font-weight: 600;
`;

export default Balance;
