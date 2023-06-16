import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import {
  activateCategoryForm,
  selectExpenseCategories,
  selectIncomeCategories,
} from "../../redux/features/categories/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  deactivateTransactionForm,
  selectTransactionCache,
  setTransactionCache,
} from "../../redux/features/transactions/transactionSlice";
import AddButtonForm from "../buttons/AddButtonForm";
import CloseButton from "../buttons/CloseButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTransactionForm() {
  const transactionCache = useSelector(selectTransactionCache);

  const [typeDropdown, setTypeDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [title, setTitle] = useState(transactionCache.title);
  const [amount, setAmount] = useState(transactionCache.amount);
  const [date, setDate] = useState(transactionCache.date);
  const [type, setType] = useState(
    transactionCache.type === "" ? "expense" : transactionCache.type
  );
  const [categoryID, setCategoryID] = useState(transactionCache.categoryID);
  const [categoryName, setCategoryName] = useState(
    transactionCache.categoryName
  );

  const incomeCategories = useSelector(selectIncomeCategories);
  const expenseCategories = useSelector(selectExpenseCategories);
  const dispatch = useDispatch();

  const typeValues = ["expense", "income"];

  useEffect(() => {
    dispatch(
      setTransactionCache({
        title: title,
        amount: amount,
        type: type,
        categoryID: categoryID,
        categoryName: categoryName,
        date: date,
      })
    );
  }, [title, amount, type, categoryID, categoryName, date, dispatch]);

  const addTransaction = async (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Please enter the title");
    } else if (amount === "") {
      alert("Please enter the amount");
    } else if (categoryName === "") {
      alert("Please select or create the category");
    } else {
      await addDoc(collection(db, "transactions"), {
        title: title,
        amount: parseFloat(amount),
        type: type,
        categoryID: categoryID,
        categoryName: categoryName,
        time: new Date(),
        date: date,
      });

      setTitle("");
      setAmount("");
    }
  };

  const handleAmount = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]|\./;
    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  };

  const handleClear = () => {
    setTitle("");
    setAmount("");
    setCategoryName("");
  };

  return (
    <Container>
      <Top>
        <Heading>Add Transaction</Heading>
        <Clear
          onClick={handleClear}
          style={{
            display:
              title !== "" || amount !== "" || categoryName !== ""
                ? "block"
                : "none",
          }}
        >
          <Text>Clear</Text>
        </Clear>
      </Top>
      <Bar></Bar>
      <Form onSubmit={addTransaction}>
        <Title>
          <Label>Title</Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Transaction title"
          />
        </Title>
        <PickArea>
          <Amount>
            <Label>Amount</Label>
            <Input
              onChange={(e) => setAmount(e.target.value)}
              onKeyPress={handleAmount}
              value={amount}
              placeholder="0000"
            />
          </Amount>
          <DateTime>
            <Label>Date</Label>
            <DatePicker selected={date} onChange={(e) => setDate(e)} />
          </DateTime>
        </PickArea>
        <SelectArea>
          <Type>
            <Label>Type</Label>
            <Select
              className="type"
              onClick={() => setTypeDropdown(!typeDropdown)}
            >
              <CurrentOption>{type}</CurrentOption>
              <DropDown src="/images/down.svg" />
              <Options style={typeDropdown ? { display: "block" } : null}>
                {typeValues.map((value, index) => (
                  <Option key={index}>
                    <Value
                      onClick={() => {
                        setType(value);
                        setTypeDropdown(!typeDropdown);
                        setCategoryName("");
                        setCategoryID("");
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
            <Select onClick={() => setCategoryDropdown(!categoryDropdown)}>
              <CurrentOption>
                {categoryName === "" ? "Select Category" : categoryName}
              </CurrentOption>
              <DropDown src="/images/down.svg" />
              <Options style={categoryDropdown ? { display: "block" } : null}>
                {type === "income"
                  ? incomeCategories.map((category, index) => (
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
                  : expenseCategories.map((category, index) => (
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
                    ))}
                <Option
                  onClick={() => {
                    dispatch(activateCategoryForm());
                    dispatch(deactivateTransactionForm());
                  }}
                >
                  <Value>Add Category+</Value>
                </Option>
              </Options>
            </Select>
          </Category>
        </SelectArea>
        <Submit
          type="submit"
          style={
            title !== "" && amount !== "" && categoryName !== ""
              ? { background: "#4c7dfc", color: "#f9f9f9", cursor: "pointer" }
              : { background: "#2b2b2b", color: "#848484", cursor: "auto" }
          }
        >
          Add Transaction
        </Submit>
        <Buttons>
          <CloseButton />
          <AddButtonForm add="category" />
        </Buttons>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 540px;
  padding: 40px;
  background: #202020;
  border-radius: 20px;

  @media (max-width: 540px) {
    width: 100%;
    padding: 20px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  @media (max-width: 540px) {
    margin-bottom: 22px;
  }
`;

const Heading = styled.h3`
  font-size: 28px;
  font-weight: 600;

  @media (max-width: 540px) {
    font-size: 20px;
  }
`;

const Clear = styled.button`
  padding: 6px 20px;
  background: #c33939;
  border-radius: 8px;

  @media (max-width: 540px) {
    padding: 4px 12px;
  }
`;

const Text = styled.h4`
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

const Bar = styled.div`
  height: 2px;
  width: 100%;
  background: #2b2b2b;
  margin-bottom: 30px;

  @media (max-width: 540px) {
    margin-bottom: 22px;
  }
`;

const Form = styled.form``;

const Title = styled.div`
  margin-bottom: 30px;

  @media (max-width: 540px) {
    margin-bottom: 22px;
  }
`;

const Label = styled.h4`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 6px 20px;
  background: #1a1a1a;
  border: 2px solid #2b2b2b;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

const PickArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  @media (max-width: 540px) {
    flex-direction: column;
    gap: 22px;
    margin-bottom: 22px;
  }
`;

const Amount = styled(Title)`
  margin-bottom: 0;

  @media (max-width: 540px) {
    width: 100%;
  }
`;

const DateTime = styled(Amount)``;

const SelectArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  @media (max-width: 540px) {
    flex-direction: column;
    gap: 22px;
    margin-bottom: 22px;
  }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentOption = styled.h5`
  font-size: 20px;
  font-weight: 500;
  color: #848484;
  text-transform: capitalize;

  @media (max-width: 540px) {
    font-size: 16px;
  }
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

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  background: #2b2b2b;
`;

const Category = styled(Type)`
  margin-right: 0;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Submit = styled.button`
  margin-bottom: 30px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

export default AddTransactionForm;
