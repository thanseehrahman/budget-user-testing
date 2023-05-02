import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Info from "./components/pages/Info";
import SignIn from "./components/pages/SignIn";
import Transactions from "./components/pages/Transactions";
import Category from "./components/pages/Category";
import Categories from "./components/pages/Categories";
import Statistics from "./components/pages/Statistics";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Home />}>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Transactions />} path="/transactions" />
          <Route element={<Categories />} path="/categories" />
          <Route element={<Category />} path="/category/:id" />
          <Route element={<Statistics />} path="/statistics" />
          <Route element={<Info />} path="/info" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
