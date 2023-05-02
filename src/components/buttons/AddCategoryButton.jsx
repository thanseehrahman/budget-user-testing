import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";

function AddCategoryButton() {
  const dispatch = useDispatch();

  return (
    <Container
      onClick={() => {
        dispatch(activateCategoryForm());
      }}
    >
      <Plus src="/images/plus-small.svg" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 8px 0px;
  background: #bedd42;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Plus = styled.img`
  width: 24px;
  display: block;
`;

export default AddCategoryButton;
