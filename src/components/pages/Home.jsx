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
  setCategories,
} from "../../redux/features/categories/categorySlice";
import AddCategory from "../pages/AddCategory";
import EditTransaction from "./EditTransaction";
import DeleteTransaction from "./DeleteTransaction";
import { selectNavbar } from "../../redux/features/nav/navbarSlice";
import Navbar from "../objects/Navbar";

function Home() {
  const transactionForm = useSelector(selectTransactionForm);
  const categoryForm = useSelector(selectCategoryForm);
  const editTransactionForm = useSelector(selectEditTransactionForm);
  const deleteTransactionBox = useSelector(selectDeleteTransactionBox);
  const navbar = useSelector(selectNavbar);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("time", "desc"));
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
      {navbar ? <Navbar /> : null}
      <Background navbar={navbar}>
          <Outlet />
      </Background>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Background = styled.div`
  height: 100vh;
  width: ${(props) => (props.navbar ? "calc(100% - 270px)" : "100%")};
  overflow-x: hidden;
  position: relative;
  left: ${(props) => (props.navbar ? "270px" : "0")};
  padding: 90px 60px 60px;
  background: #191919;
  transition: all 0.6 ease-in-out
`;

export default Home;
