import React from "react";
import { useSelector } from "react-redux";
import {
  selectCategories,
} from "../../redux/features/categories/categorySlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useSelector(selectCategories);

  return (
    <Container>
      <Heading>Categories</Heading>
      <ListArea>
        <Scroll>
          <Grid>
            {categories.map((category, index) => (
              <Category key={index}>
                <Content>
                  <Title>{category.title}</Title>
                  <CategoryName>{category.category}</CategoryName>
                </Content>
                <Link to={"/category/" + category.id}>
                  <Enter>
                    <Icon
                      src={
                        category.type === "income"
                          ? "/images/right-income.svg"
                          : "/images/right-expense.svg"
                      }
                    />
                  </Enter>
                </Link>
              </Category>
            ))}
          </Grid>
          <Bottom />
        </Scroll>
      </ListArea>
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

const ListArea = styled.div`
  width: 50%;
`;

const Scroll = styled.div`
  position: relative;
  grid-column: span 2;
  height: calc(100vh - 90px - 64px - 60px - 60px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(1, 1fr);
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: #202020;
  border-radius: 12px;
`;

const Content = styled.div``;

const Title = styled.h5`
  font-size: 36px;
  font-weight: 600;
  color: #f9f9f9;
  margin-bottom: 10px;
`;

const CategoryName = styled.h5`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 500;
  color: #848484;
`;

const Enter = styled.div`
  height: 90px;
  width: 90px;
  background: #2b2b2b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Icon = styled.img`
  display: block;
`;

const Bottom = styled.div`
  position: fixed;
  bottom: 60px;
  height: 120px;
  width: 100%;
  background: linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, #191919 100%);
`;

export default Categories;
