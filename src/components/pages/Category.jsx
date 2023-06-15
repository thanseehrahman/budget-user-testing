import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/features/transactions/transactionSlice";
import { selectCategories } from "../../redux/features/categories/categorySlice";
import Dialogue from "../objects/Dialogue";
import Categories from "../objects/Categories";
import Transaction from "../objects/Transaction";
import { TabTitle } from "../utilities/titleFunction";

function Category() {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    const foundCategory = categories.find((category) => category.id === id);

    if (foundCategory) {
      setCategory(foundCategory);
      setLoading(false);
    }
  }, [id, categories]);

  TabTitle(`${loading ? "Loading..." : category.title} - Budget Ease`);

  return (
    <Container>
      <Heading>{loading ? "Loading..." : category.title}</Heading>
      <Grid>
        <Scroll>
          <SmallGrid>
            {transactions.filter((transaction) => transaction.categoryID === id)
              .length === 0 ? (
              <Dialogue type="transactionInCategory" />
            ) : (
              transactions
                .filter((transaction) => transaction.categoryID === id)
                .map((transaction, index) => (
                  <Transaction transaction={transaction} key={index} />
                ))
            )}
            <EmptyTransaction />
          </SmallGrid>
          <Bottom />
        </Scroll>
        <Categories categories={categories} rowspan="" display={false}/>
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

  @media (max-width: 1280px) {
    grid-template-columns: repeat(1, 1fr);
  }
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

const EmptyTransaction = styled.div`
  padding: 24px 20px;
  background: #202020;
  border-radius: 12px;
  margin-bottom: 32px;
  opacity: 0;
  visibility: hidden;
`;

const Bottom = styled.div`
  position: fixed;
  bottom: 60px;
  height: 120px;
  width: 100%;
  background: linear-gradient(180deg, rgba(25, 25, 25, 0) 0%, #191919 100%);
`;

export default Category;
