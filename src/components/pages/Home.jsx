import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase";
import {
  selectDeleteTransactionBox,
  selectEditTransactionForm,
  selectTransactionForm,
  setTransactions,
} from "../../redux/features/transactions/transactionSlice";
import AddTransaction from "./AddTransaction";
import {
  selectCategoryForm,
  selectDeleteCategoryBox,
  setCategories,
} from "../../redux/features/categories/categorySlice";
import AddCategory from "../pages/AddCategory";
import EditTransaction from "./EditTransaction";
import DeleteTransaction from "./DeleteTransaction";
import Navbar from "../objects/Navbar";
import DeleteCategory from "./DeleteCategory";
import { selectNavbar } from "../../redux/features/navbar/navbarSlice";

function Home() {
  const transactionForm = useSelector(selectTransactionForm);
  const categoryForm = useSelector(selectCategoryForm);
  const editTransactionForm = useSelector(selectEditTransactionForm);
  const deleteTransactionBox = useSelector(selectDeleteTransactionBox);
  const deleteCategoryBox = useSelector(selectDeleteCategoryBox);
  const navbar = useSelector(selectNavbar);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const r = query(collection(db, "categories"), orderBy("time", "desc"));

    onSnapshot(q, (querySnapshot) => {
      let transactions = [];
      let income = [];
      let expenses = [];

      querySnapshot.forEach((doc) => {
        transactions.push({ ...doc.data(), id: doc.id });

        switch (doc.data().type) {
          case "income":
            income = [...income, { ...doc.data(), id: doc.id }];
            break;
          case "expense":
            expenses = [...expenses, { ...doc.data(), id: doc.id }];
            break;
          default:
            console.log("No data");
        }
      });

      dispatch(
        setTransactions({
          transactions: transactions,
          income: income,
          expenses: expenses,
        })
      );
    });

    onSnapshot(r, (querySnapshot) => {
      let categories = [];
      let incomeCategories = [];
      let expenseCategories = [];

      querySnapshot.forEach((doc) => {
        categories.push({ ...doc.data(), id: doc.id });

        switch (doc.data().type) {
          case "income":
            incomeCategories = [
              ...incomeCategories,
              { ...doc.data(), id: doc.id },
            ];
            break;
          case "expense":
            expenseCategories = [
              ...expenseCategories,
              { ...doc.data(), id: doc.id },
            ];
            break;
          default:
            console.log("No data");
        }
      });

      dispatch(
        setCategories({
          categories: categories,
          incomeCategories: incomeCategories,
          expenseCategories: expenseCategories,
        })
      );
    });
  }, [dispatch]);

  return (
    <Container>
      {transactionForm ? <AddTransaction /> : null}
      {editTransactionForm ? <EditTransaction /> : null}
      {deleteTransactionBox ? <DeleteTransaction /> : null}
      {categoryForm ? <AddCategory /> : null}
      {deleteCategoryBox ? <DeleteCategory /> : null}
      <Navbar />
      <Background expand={navbar}>
        <Outlet />
        <Freeze active={navbar} />
      </Background>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Background = styled.div`
  height: 100vh;
  width: calc(100% - 270px);
  overflow-x: hidden;
  position: relative;
  left: 270px;
  padding: 90px 60px 60px;
  background: #191919;
  transition: all 0.6 ease-in-out;

  @media (max-width: 1024px) {
    width: calc(100% - 100px);
    left: 100px;
  }

  @media (max-width: 768px) {
    padding: 64px 42px 42px;
  }

  @media (max-width: 480px) {
    width: 100%;
    left: 0;
    padding: 102px 32px 32px;
  }
`;

const Freeze = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  z-index: 2;

  @media (max-width: 1024px) {
    display: ${(props) => (props.active ? "block" : "none")};
  }
`;

export default Home;
