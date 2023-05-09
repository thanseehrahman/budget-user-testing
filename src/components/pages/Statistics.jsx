import React from "react";
import styled from "styled-components";
import { TabTitle } from "../utilities/titleFunction";

function Statistics() {
  TabTitle("Statistics - Budget Ease");

  return (
    <Container>
      <Heading>Statistics</Heading>
      <Message>Coming soon</Message>
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

const Message = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #848484;
`;

export default Statistics;
