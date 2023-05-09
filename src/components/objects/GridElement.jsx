import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function GridElement({
  children,
  type,
  colspan,
  rowspan,
  subheading,
  color,
  link,
}) {
  return (
    <Container type={type} colspan={colspan} rowspan={rowspan}>
      {type === "large" ? (
        <Link to={"/" + link}>
          <SubHeading type={type} color={color}>
            {subheading}
          </SubHeading>
        </Link>
      ) : (
        <SubHeading type={type} color={color}>
          {subheading}
        </SubHeading>
      )}
      {children}
    </Container>
  );
}

const Container = styled.div`
  min-height: ${(props) => (props.type === "large" ? " 296px" : "0")};
  padding: ${(props) => (props.type === "large" ? "40px" : "20px")} 40px;
  grid-column: ${(props) => props.colspan};
  grid-row: ${(props) => props.rowspan};
  background: #202020;
  border-radius: 20px;
  z-index: 2;
`;

Container.defaultProps = {
  type: "large",
};

const SubHeading = styled.h4`
  display: inline-block;
  font-size: 28px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin-bottom: ${(props) => (props.type === "large" ? "20px" : "6px")};

  &:hover {
    text-decoration: ${(props) =>
      props.type === "large" ? "underline" : "none"};
  }
`;

SubHeading.defaultProps = {
  type: "large",
  color: "#f9f9f9",
};

export default GridElement;
