import React from "react";
import styled from "styled-components";

function Info() {
  return (
    <Container>
      <Heading>Info</Heading>
      <Direction>
        Select type of categories based on this information.
      </Direction>
      <Income>
        <SubHeading>Income Categories</SubHeading>
        <List>
          <Item>
            <Title>Primary Income:</Title>
            <Description>
              This would be the main source of income, such as your salary or
              wages from your job.
            </Description>
          </Item>
          <Item>
            <Title>Secondary Income:</Title>
            <Description>
              This would include any additional sources of income, such as
              bonuses, freelance work, or rental income
            </Description>
          </Item>
          <Item>
            <Title>Investment Income:</Title>
            <Description>
              This would include any income earned from investments, such as
              dividends, capital gains, or interest from savings accounts or
              CDs.
            </Description>
          </Item>
        </List>
      </Income>
      <Bar></Bar>
      <Expenses>
        <SubHeading>Expenses Categories</SubHeading>
        <List>
          <Item>
            <Title>Essential Expenses:</Title>
            <Description>
              This category would include all necessary expenses required for
              daily living, such as rent/mortgage payments, utilities,
              groceries, transportation costs (car payments, fuel, public
              transit fares), minimum debt payments, insurance, and healthcare.
            </Description>
          </Item>
          <Item>
            <Title>Discretionary Expenses:</Title>
            <Description>
              This category would include all non-essential expenses that are
              not required for daily living, such as dining out, entertainment,
              hobbies, shopping, travel, and other discretionary spending.
            </Description>
          </Item>
          <Item>
            <Title>Savings and Investment:</Title>
            <Description>
              This category would include all money saved or invested for future
              financial goals, such as emergency savings, retirement savings,
              college funds, or a down payment on a home.
            </Description>
          </Item>
        </List>
      </Expenses>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: -60px;
`;

const Heading = styled.h3`
  font-size: 48px;
  color: #f9f9f9;
  margin-bottom: 60px;
`;

const Direction = styled.p`
  font-size: 28px;
  font-weight: 600;
  color: #f9f9f9;
  margin-bottom: 60px;
`;

const Income = styled.div`
  margin-bottom: 60px;
`;

const SubHeading = styled.h4`
  font-size: 36px;
  font-weight: 600;
  color: #f9f9f9;
  margin-bottom: 30px;
`;

const List = styled.ul``;

const Item = styled.li`
  margin-bottom: 30px;
`;

const Title = styled.h5`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #848484;
`;

const Bar = styled.div`
  height: 2px;
  width: 100%;
  background: #2b2b2b;
  margin-bottom: 60px;
`;

const Expenses = styled(Income)``;

export default Info;
