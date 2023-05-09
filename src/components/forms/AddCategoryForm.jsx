import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  deactivateCategoryForm,
  selectCategoryCache,
  setCategoryCache,
} from "../../redux/features/categories/categorySlice";
import { Link } from "react-router-dom";
import AddButtonForm from "../buttons/AddButtonForm";
import CloseButton from "../buttons/CloseButton";

function AddCategoryForm() {
  const categoryCache = useSelector(selectCategoryCache);

  const [typeDropdown, setTypeDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [title, setTitle] = useState(categoryCache.title);
  const [type, setType] = useState(
    categoryCache.type === "" ? "expense" : categoryCache.type
  );
  const [category, setCategory] = useState(categoryCache.category);

  const dispatch = useDispatch();

  const typeValues = ["expense", "income"];
  const categoryValues = [
    { title: "primary income", type: "income" },
    { title: "secondary income", type: "income" },
    { title: "investment income", type: "income" },
    { title: "essential expenses", type: "expense" },
    { title: "discretionary expenses", type: "expense" },
    { title: "savings and investment", type: "expense" },
  ];

  useEffect(() => {
    dispatch(
      setCategoryCache({
        title: title,
        type: type,
        category: category,
      })
    );
  }, [title, type, category, dispatch]);

  const addCategory = async (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Please enter the title");
    } else if (category === "") {
      alert("Please select the category");
    } else {
      await addDoc(collection(db, "categories"), {
        title: title,
        type: type,
        category: category,
        time: new Date(),
      });

      setTitle("");
    }
  };

  return (
    <Container>
      <Heading>Add Category</Heading>
      <Bar></Bar>
      <Form onSubmit={addCategory}>
        <Title>
          <Label>Title</Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Category title"
          />
        </Title>
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
                      setCategory("");
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
              {category === "" ? "Select Category" : category}
            </CurrentOption>
            <DropDown src="/images/down.svg" />
            <Options style={categoryDropdown ? { display: "block" } : null}>
              {type === "income"
                ? categoryValues
                    .filter((category) => category.type === "income")
                    .map((category, index) => (
                      <Option
                        key={index}
                        onClick={() => setCategoryDropdown(!categoryDropdown)}
                      >
                        <Value
                          onClick={() => {
                            setCategory(category.title);
                          }}
                        >
                          {category.title}
                        </Value>
                        <Border
                          style={
                            categoryValues.filter(
                              (category) => category.type === "income"
                            ).length -
                              1 ===
                            index
                              ? { display: "none" }
                              : null
                          }
                        />
                      </Option>
                    ))
                : categoryValues
                    .filter((category) => category.type === "expense")
                    .map((category, index) => (
                      <Option
                        key={index}
                        onClick={() => setCategoryDropdown(!categoryDropdown)}
                      >
                        <Value
                          onClick={() => {
                            setCategory(category.title);
                          }}
                        >
                          {category.title}
                        </Value>
                        <Border />
                      </Option>
                    ))}
            </Options>
          </Select>
        </Category>
        <Note>
          Don't know how to choose category? check out{" "}
          <Link
            to="/info"
            style={{ textDecoration: "underline", color: "#4c7dfc" }}
            onClick={() => {
              dispatch(deactivateCategoryForm());
            }}
          >
            info
          </Link>
        </Note>
        <Submit type="submit">Add Category</Submit>
        <Buttons>
          <CloseButton />
          <AddButtonForm add="transaction" />
        </Buttons>
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

const Type = styled.div`
  width: 100%;
  margin-right: 10px;
  margin-bottom: 30px;
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
  z-index: 2;
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

const Category = styled(Type)``;

const Note = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #848484;
  cursor: pointer;
  margin-bottom: 30px;
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
  background: #4c7dfc;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;
`;

export default AddCategoryForm;
