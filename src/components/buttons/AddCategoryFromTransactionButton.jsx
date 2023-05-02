import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";

function AddCategoryFromTransactionButton() {
  const dispatch = useDispatch();

  return (
    <Add
      onClick={() => {
        dispatch(activateCategoryForm());
      }}
    >
      <Label>Add Category+</Label>
    </Add>
  );
}

const Add = styled.div`
  width: 100%;
  padding: 8px 0;
  background: #2b2b2b;
  border-radius: 8px;
`;

const Label = styled.h5`
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;
  text-align: center;
`;

export default AddCategoryFromTransactionButton;
