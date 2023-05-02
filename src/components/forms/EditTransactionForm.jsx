import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEditTransaction,
  setEditTransaction,
} from "../../redux/features/transactions/transactionSlice";
import styled from "styled-components";
import {
  activateCategoryForm,
  selectExpenseCategories,
  selectIncomeCategories,
} from "../../redux/features/categories/categorySlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function EditTransactionForm() {
  const transactionDetails = useSelector(selectEditTransaction);

  const [typeDropdown, setTypeDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [title, setTitle] = useState(transactionDetails.title);
  const [amount, setAmount] = useState(transactionDetails.amount);
  const [type, setType] = useState(transactionDetails.type);
  const [categoryID, setCategoryID] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const dispatch = useDispatch();

  const typeValues = ["expense", "income"];

  useEffect(() => {
    setCategoryName("");
  }, [type]);

  const editTransaction = async (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Please enter the title");
    } else if (amount === "") {
      alert("Please enter the amount");
    } else if (categoryName === "") {
      alert("Please select the category");
    } else {
      await updateDoc(doc(db, "transactions", transactionDetails.id), {
        title: title,
        amount: parseFloat(amount),
        type: type,
        categoryID: categoryID,
        categoryName: categoryName,
      });

      dispatch(
        setEditTransaction({
          id: "",
          title: "",
          amount: "",
          type: "",
          categoryID: "",
          categoryName: "",
        })
      );
    }
  };

  return (
    <Container>
      <Heading>Edit Transaction</Heading>
      <Bar></Bar>
      <Form onSubmit={editTransaction}>
        <Title>
          <Label>Title</Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Transaction title"
          />
        </Title>
        <Amount>
          <Label>Amount</Label>
          <Input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="0000"
          />
        </Amount>
        <SelectArea>
          <Type>
            <Label>Type</Label>
            <Select className="type">
              <CurrentOption>{type}</CurrentOption>
              <DropDown
                src="/images/down.svg"
                onClick={() => setTypeDropdown(!typeDropdown)}
              />
              <Options style={typeDropdown ? { display: "block" } : null}>
                {typeValues.map((value, index) => (
                  <Option key={index}>
                    <Value
                      onClick={() => {
                        setType(value);
                        setTypeDropdown(!typeDropdown);
                      }}
                    >
                      {value}
                    </Value>
                    <Border />
                  </Option>
                ))}
              </Options>
            </Select>
          </Type>
          <Category>
            <Label>Category</Label>
            <Select>
              <CurrentOption>
                {categoryName === "" ? "Select Category" : categoryName}
              </CurrentOption>
              <DropDown
                src="/images/down.svg"
                onClick={() => setCategoryDropdown(!categoryDropdown)}
              />
              <Options style={categoryDropdown ? { display: "block" } : null}>
                {type === "income" ? (
                  incomeCategories.length === 0 ? (
                    <Option onClick={() => dispatch(activateCategoryForm())}>
                      <Value>Add Category+</Value>
                    </Option>
                  ) : (
                    incomeCategories.map((category, index) => (
                      <Option
                        key={index}
                        onClick={() => setCategoryDropdown(!categoryDropdown)}
                      >
                        <Value
                          onClick={() => {
                            setCategoryID(category.id);
                            setCategoryName(category.title);
                          }}
                        >
                          {category.title}
                        </Value>
                        <Border
                          style={
                            incomeCategories.length - 1 === index
                              ? { display: "none" }
                              : null
                          }
                        />
                      </Option>
                    ))
                  )
                ) : expenseCategories.length === 0 ? (
                  <Option onClick={() => dispatch(activateCategoryForm())}>
                    <Value>Add Category+</Value>
                  </Option>
                ) : (
                  expenseCategories.map((category, index) => (
                    <Option
                      key={index}
                      onClick={() => setCategoryDropdown(!categoryDropdown)}
                    >
                      <Value
                        onClick={() => {
                          setCategoryID(category.id);
                          setCategoryName(category.title);
                        }}
                      >
                        {category.title}
                      </Value>
                      <Border />
                    </Option>
                  ))
                )}
              </Options>
            </Select>
          </Category>
        </SelectArea>
        <Submit type="submit">Update transaction</Submit>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 554px;
  padding: 40px;
  background: #202020;
  border-radius: 20px;
`;

const Heading = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Bar = styled.div`
  height: 2px;
  width: 100%;
  background: #2b2b2b;
  margin-bottom: 30px;
`;

const Form = styled.form``;

const Title = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.h4`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px 20px;
  background: #1a1a1a;
  border: 2px solid #2b2b2b;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
`;

const Amount = styled(Title)``;

const SelectArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Type = styled.div`
  width: 100%;
  margin-right: 10px;
`;

const Select = styled.div`
  position: relative;
  width: 100%;
  padding: 6px 20px;
  padding-right: 10px;
  background: #1a1a1a;
  border: 2px solid #2b2b2b;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentOption = styled.h5`
  font-size: 20px;
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
`;

const Option = styled.div`
  padding: 10px 20px 0;
`;

const Value = styled.h5`
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  background: #2b2b2b;
`;

const Category = styled(Type)`
  margin-right: 0;
`;

const Submit = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 8px;
  background: #4c7dfc;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;
`;

export default EditTransactionForm;
