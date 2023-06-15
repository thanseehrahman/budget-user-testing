import React from "react";
import GridElement from "./GridElement";
import styled from "styled-components";

function Statistics({ animationDelay }) {
  return (
    <GridElement
      subheading="Statistics"
      type="large"
      colspan="1/3"
      rowspan="2"
      link="statistics"
      animationDelay={animationDelay}
    >
      <Title>Coming soon</Title>
    </GridElement>
  );
}

const Title = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #848484;
`;

export default Statistics;
