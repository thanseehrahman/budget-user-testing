import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { activateTransactionForm } from "../../redux/features/transactions/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { activateCategoryForm } from "../../redux/features/categories/categorySlice";
import {
  expandNavbar,
  minimizeNavbar,
  selectNavbar,
} from "../../redux/features/navbar/navbarSlice";
import AddButtonSquare from "../buttons/AddButtonSquare";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const navbar = useSelector(selectNavbar);
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
    <>
      <Sidebar expand={navbar}>
        <Hamburger active={navbar} onClick={() => dispatch(expandNavbar())}>
          <Icon src="/images/hamburger.svg" />
        </Hamburger>
        <Top>
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => dispatch(minimizeNavbar())}
            >
              <Item selected={link.path === path} expand={navbar}>
                <Content>
                  <Icon
                    src={link.path === path ? link.img.active : link.img.img}
                    type="link"
                  />
                  <Title selected={link.path === path} expand={navbar}>
                    {link.title}
                  </Title>
                </Content>
              </Item>
            </Link>
          ))}
        </Top>
        <Bottom>
          <NewTransaction
            onClick={() => {
              dispatch(activateTransactionForm());
              dispatch(minimizeNavbar());
            }}
          >
            <Title expand={navbar}>
              New Transaction <Span>+</Span>
            </Title>
          </NewTransaction>
          <NewCategory
            onClick={() => {
              dispatch(activateCategoryForm());
              dispatch(minimizeNavbar());
            }}
          >
            <Title expand={navbar}>
              New Category <Span className="category">+</Span>
            </Title>
          </NewCategory>
        </Bottom>
        <Buttons active={navbar}>
          <AddButtonSquare add="transaction" />
          <AddButtonSquare add="category" />
        </Buttons>
      </Sidebar>
      <Topbar active={navbar}>
        <TopHamburger onClick={() => dispatch(expandNavbar())}>
          <Icon src="/images/hamburger.svg" />
        </TopHamburger>
      </Topbar>
    </>
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
  z-index: 3;
  transition: all 0.6s ease-in-out;

  @media (max-width: 1024px) {
    width: ${(props) => (props.expand ? 270 : 100)}px;
  }

  @media (max-width: 768px) {
    padding: 60px 0px 42px;
  }

  @media (max-width: 480px) {
    transform: translateX(${(props) => (props.expand ? 0 : -270)}px);
  }
`;

const Top = styled.div``;

const Hamburger = styled.button`
  position: absolute;
  top: 25px;
  left: 38px;
  display: none;
  transition: all 0.6s ease-in-out;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: block;
    visibility: ${(props) => (props.active ? "hidden" : "visible")};
    opacity: ${(props) => (props.active ? 0 : 1)};
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Item = styled.div`
  padding: 10px 0 10px 56px;
  background: ${(props) =>
    props.selected ? "rgba(255, 255, 255, 0.05)" : "transparent"};

  @media (max-width: 1024px) {
    padding: ${(props) => (props.expand ? null : "10px 0")};
    display: ${(props) => (props.expand ? "block" : "grid")};
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    justify-content: start;
    padding: 10px 0 10px 56px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.img`
  @media (max-width: 480px) {
    display: ${(props) => (props.type === "link" ? "none" : null)};
  }
`;

const Title = styled.h6`
  white-space: nowrap;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => (props.selected ? "#f9f9f9" : "#848484")};

  @media (max-width: 1024px) {
    display: ${(props) => (props.expand ? "block" : "none")};
  }

  @media (max-width: 480px) {
    display: block;
  }
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

const Buttons = styled.div`
  display: none;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media (max-width: 1024px) {
    display: ${(props) => (props.active ? "none" : "flex")};
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Topbar = styled.div`
  height: 40px;
  width: 100%;
  display: none;
  background: #202020;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  border-bottom: 1px solid #2b2b2b;
  padding: 0 18px;

  @media (max-width: 480px) {
    display: ${(props) => (props.active ? "none" : "flex")};
    align-items: center;
    justify-content: space-between;
  }
`;

const TopHamburger = styled.button``;

export default Navbar;
