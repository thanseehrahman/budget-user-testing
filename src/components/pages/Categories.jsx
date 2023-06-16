import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateDeleteCategoryBox,
  selectCategories,
  setDeleteCategory,
} from "../../redux/features/categories/categorySlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TabTitle } from "../utilities/titleFunction";
import AddButtonCircle from "../buttons/AddButtonCircle";

function Categories() {
  TabTitle("Categories - Budget Ease");

  const [variable, setVariable] = useState("");
  const [array, setArray] = useState([]);
  const [sortDropdown, setSortDropdown] = useState(false);

  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    const income = categories.filter((category) => category.type === "income");
    const expense = categories.filter(
      (category) => category.type === "expense"
    );

    const sortArray = (value) => {
      let data =
        value === "" ? categories : value === "income" ? income : expense;
      setArray(data);
    };

    sortArray(variable);
  }, [categories, variable]);

  const sortOptions = ["all", "income", "expense"];

  return (
    <Container>
      <Top>
        <Heading>Categories</Heading>
        <Right>
          <SortArea>
            <SortBy>Sortby</SortBy>
            <Select onClick={() => setSortDropdown(!sortDropdown)}>
              <CurrentOption>
                {variable === "" ? "all" : variable}
              </CurrentOption>
              <DropDown src="/images/down-small.svg" />
              <Options style={sortDropdown ? { display: "block" } : null}>
                {sortOptions.map((value, index) => (
                  <Option
                    onClick={() => {
                      setVariable(value === "all" ? "" : value);
                      setSortDropdown(!sortDropdown);
                    }}
                    key={index}
                  >
                    <Value>{value}</Value>
                  </Option>
                ))}
              </Options>
            </Select>
          </SortArea>
          <AddButtonCircle add="category" />
        </Right>
      </Top>
      <ListArea>
        <Scroll>
          <Grid>
            {array.map((category, index) => (
              <Category key={index} animationDelay={index / 7 + 0.2}>
                <Content>
                  <Title>{category.title}</Title>
                  <CategoryName>{category.category}</CategoryName>
                </Content>
                <Link to={"/category/" + category.id}>
                  <Enter>
                    <Icon
                      type="enter"
                      src={
                        category.type === "income"
                          ? "/images/right-green.svg"
                          : "/images/right-red.svg"
                      }
                    />
                  </Enter>
                </Link>
                <Delete
                  onClick={() => {
                    dispatch(activateDeleteCategoryBox());
                    dispatch(setDeleteCategory({ id: category.id }));
                  }}
                >
                  <Icon src="/images/delete.svg" />
                </Delete>
              </Category>
            ))}
            <Category
              style={{
                marginBottom: "32px",
                opacity: "0",
                visibility: "hidden",
              }}
            />
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

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 42px;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: start;
    gap: 20px;
  }
`;

const Heading = styled.h3`
  font-size: 48px;
  color: #f9f9f9;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SortArea = styled.div`
  display: flex;
`;

const SortBy = styled.h6`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Select = styled.div`
  min-width: 120px;
  padding: 10px 20px;
  padding-right: 12px;
  position: relative;
  background: #202020;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentOption = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #848484;
  text-transform: capitalize;
`;

const DropDown = styled.img``;

const Options = styled.div`
  position: absolute;
  left: 0;
  top: 42px;
  width: 100%;
  background: #1a1a1a;
  border: 2px solid #2b2b2b;
  border-radius: 8px;
  display: none;
  z-index: 3;
`;

const Option = styled.div`
  padding: 10px 20px 0;
`;

const Value = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #f9f9f9;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const ListArea = styled.div``;

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
  width: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: #202020;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  @media (max-width: 1280px) {
    width: calc(100% - 70px);
  }

  @media (max-width: 768px) {
    padding: 20px;
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

const Content = styled.div``;

const Title = styled.h5`
  font-size: 36px;
  font-weight: 600;
  color: #f9f9f9;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const CategoryName = styled.h5`
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 500;
  color: #848484;

  @media (max-width: 480px) {
    font-size: 16px;
  }
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

  @media (max-width: 768px) {
    height: 60px;
    width: 60px;
  }
`;

const Icon = styled.img`
  display: block;

  @media (max-width: 768px) {
    width: ${(props) => (props.type === "enter" ? 46 : null)}px;
  }

  @media (max-width: 768px) {
    width: ${(props) => (props.type === "enter" ? 36 : null)}px;
  }
`;

const Delete = styled.div`
  height: 100%;
  width: 70px;
  position: absolute;
  left: 100%;
  display: grid;
  place-items: center;
  background: #222;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
`;

const Bottom = styled.div`
  position: fixed;
  bottom: 60px;
  height: 120px;
  width: 100%;
  background: linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, #191919 100%);

  @media (max-width: 768px) {
    bottom: 42px;
  }
`;

export default Categories;
