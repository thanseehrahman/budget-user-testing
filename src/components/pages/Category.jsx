import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  activateTransactionForm,
  selectTransactions,
} from "../../redux/features/transactions/transactionSlice";
import { selectCategories } from "../../redux/features/categories/categorySlice";
import AddCategoryButton from "../buttons/AddCategoryButton";

function Category() {
  const { id } = useParams();

  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  return (
    <Container>
      {categories
        .filter((category) => category.id === id)
        .map((category, index) => (
          <Heading key={index}>{category.title}</Heading>
        ))}
      <Grid>
        <Scroll>
          <SmallGrid>
            {transactions.filter((transaction) => transaction.categoryID === id)
              .length === 0 ? (
              <Dialogue>
                <Note>No transactions found in this category.</Note>
                <Add onClick={() => dispatch(activateTransactionForm())}>
                  Click to add Transaction <Span>+</Span>
                </Add>
              </Dialogue>
            ) : (
              transactions
                .filter((transaction) => transaction.categoryID === id)
                .map((transaction, index) => (
                  <Transaction key={index}>
                    <Name>
                      <Title>{transaction.title}</Title>
                    </Name>
                    <Type>
                      <Title
                        className={`type ${
                          transaction.type === "income" ? "income" : "expense"
                        }`}
                      >
                        {transaction.type}
                      </Title>
                    </Type>
                    <Amount>
                      <Title
                        className={`amount ${
                          transaction.type === "income" ? "income" : "expense"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {transaction.amount}
                      </Title>
                    </Amount>
                  </Transaction>
                ))
            )}
          </SmallGrid>
          <Bottom />
        </Scroll>
        <Categories>
          <SubHeading>Categories</SubHeading>
          <AddCategoryButton />
          <List>
            {categories.slice(0, 4).map((category, index) => (
              <Item key={index}>
                <Link to={"/category/" + category.id}>
                  <Title className="category">{category.title}</Title>
                </Link>
              </Item>
            ))}
          </List>
        </Categories>
      </Grid>
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

const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
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

const SmallGrid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(1, 1fr);
`;

const Transaction = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 24px 20px;
  background: #202020;
  border-radius: 12px;
`;

const Name = styled.div`
  grid-column: span 2;
`;

const Title = styled.h5`
  font-size: 20px;
  font-weight: 600;

  &.add {
    cursor: pointer;
  }

  &.category {
    color: #848484;
  }

  &.type.income {
    color: #4cbe5e;
  }
  &.type.expense {
    color: #ec3939;
  }

  &.amount.income {
    color: #4f883b;
  }
  &.amount.expense {
    color: #c33939;
  }
`;

const Dialogue = styled.div``;

const Note = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #848484;
  margin-bottom: 10px;
`;

const Add = styled(Note)`
  margin-bottom: 0;
  cursor: pointer;
`;

const Span = styled.span`
  color: #4cbe5e;
`;

const Bottom = styled.div`
  position: fixed;
  bottom: 60px;
  height: 120px;
  width: 100%;
  background: linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, #191919 100%);
`;

const CategoryName = styled.div`
  grid-column: span 2;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
`;

const Type = styled(CategoryName)`
  text-align: center;
`;

const Amount = styled(CategoryName)`
  text-align: right;
`;

const Categories = styled.div`
  padding: 40px;
  background: #202020;
  border-radius: 20px;
  z-index: 2;
`;

const SubHeading = styled.h4`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const List = styled.ul`
  margin-top: 20px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0px;
  border-bottom: 2px solid #2b2b2b;
  margin-bottom: 8px;
`;

export default Category;
