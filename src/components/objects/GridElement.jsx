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
  display,
  animationDelay,
}) {
  return (
    <Container
      type={type}
      colspan={colspan}
      rowspan={rowspan}
      display={display}
      animationDelay={animationDelay}
    >
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

  @media (max-width: 1280px) {
    grid-column: auto;
    grid-row: auto;
    display: ${(props) => (props.display ? "block" : "none")};
    padding: ${(props) => (props.type === "large" ? "40px 40px" : "20px 20px")};
  }

  @media (max-width: 768px) {
    padding: ${(props) => (props.type === "large" ? "28px" : "14px")} 28px;
    display: ${(props) => (props.type === "small" ? "flex" : null)};
    align-items: center;
    gap: 10px;
  }

  animation-name: fade-up;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-delay: ${(props) => props.animationDelay}s;
  animation-fill-mode: both;

  @keyframes fade-up {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

Container.defaultProps = {
  type: "large",
  display: "block",
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

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

SubHeading.defaultProps = {
  type: "large",
  color: "#f9f9f9",
};

export default GridElement;
