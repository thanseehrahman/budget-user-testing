import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { activateTransactionForm } from "../../redux/features/transactions/transactionSlice";
import { useDispatch } from "react-redux";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";

function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dispatch = useDispatch();

  const links = [
    {
      title: "Dashboard",
      img: {
        img: "/images/dashboard.svg",
        active: "/images/dashboard-active.svg",
      },
      path: "/",
    },
    {
      title: "Transactions",
      img: {
        img: "/images/transactions.svg",
        active: "/images/transactions-active.svg",
      },
      path: "/transactions",
    },
    {
      title: "Categories",
      img: {
        img: "/images/categories.svg",
        active: "/images/categories-active.svg",
      },
      path: "/categories",
    },
    {
      title: "Statistics",
      img: {
        img: "/images/statistics.svg",
        active: "/images/statistics-active.svg",
      },
      path: "/statistics",
    },
    {
      title: "Info",
      img: {
        img: "/images/info.svg",
        active: "/images/info-active.svg",
      },
      path: "/info",
    },
  ];

  return (
    <Sidebar>
      <Top>
        {links.map((link, index) => (
          <Link to={link.path} onClick={() => setSelectedIndex(index)}>
            <Item key={index} selected={selectedIndex === index}>
              <Content>
                <Icon
                  src={selectedIndex === index ? link.img.active : link.img.img}
                />
                <Title selected={selectedIndex === index}>{link.title}</Title>
              </Content>
            </Item>
          </Link>
        ))}
      </Top>
      <Bottom>
        <NewTransaction onClick={() => dispatch(activateTransactionForm())}>
          <Title>
            New Transaction <Span>+</Span>
          </Title>
        </NewTransaction>
        <NewCategory onClick={() => dispatch(activateCategoryForm())}>
          <Title>
            New Category <Span className="category">+</Span>
          </Title>
        </NewCategory>
      </Bottom>
    </Sidebar>
  );
}

const Sidebar = styled.div`
  height: 100vh;
  width: 270px;
  overflow: hidden;
  position: fixed;
  padding: 60px 0;
  background: #202020;
  border-right: 1px solid #2b2b2b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div``;

const Item = styled.div`
  padding: 10px 0 10px 56px;
  background: ${(props) =>
    props.selected ? "rgba(255, 255, 255, 0.05)" : "transparent"};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.img``;

const Title = styled.h6`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => (props.selected ? "#f9f9f9" : "#848484")};
`;

const Bottom = styled.div``;

const NewTransaction = styled.div`
  padding: 10px 0 10px 56px;
  cursor: pointer;
`;

const Span = styled.span`
  color: #4cbe5e;

  &.category {
    color: #bedd42;
  }
`;

const NewCategory = styled(NewTransaction)``;

export default Navbar;
