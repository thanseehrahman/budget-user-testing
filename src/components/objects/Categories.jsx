import React from "react";
import GridElement from "./GridElement";
import AddButton from "../buttons/AddButton";
import styled from "styled-components";
import Dialogue from "./Dialogue";
import { Link } from "react-router-dom";

function Categories({ categories, count, rowspan }) {
  return (
    <GridElement
      subheading="Categories"
      type="large"
      rowspan={rowspan}
      link="categories"
    >
      <AddButton add="category" />
      <Count>{count}</Count>
      {count == null ? null : (
        <Label>
          {categories.length <= 1 ? "Category Added" : "Categories Added"}
        </Label>
      )}
      {categories.length === 0 ? (
        <Dialogue type="category" />
      ) : (
        <List>
          {categories.slice(0, 8).map((category, index) => (
            <Item key={index}>
              <Link to={"/category/" + category.id}>
                <Title>{category.title}</Title>
              </Link>
            </Item>
          ))}
        </List>
      )}
    </GridElement>
  );
}

const Count = styled.h6`
  margin-top: 20px;
  display: inline-block;
  font-size: 28px;
  font-weight: 600;
  color: #f9f9f9;
  margin-bottom: 6px;
`;

const Label = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #848484;
  margin-bottom: 20px;
`;

const List = styled.ul``;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 2px solid #2b2b2b;
  margin-bottom: 0;
`;

const Title = styled.h5`
  font-size: 20px;
  font-weight: 600;
  color: #848484;
`;

export default Categories;
