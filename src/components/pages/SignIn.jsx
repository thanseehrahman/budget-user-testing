import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GoogleSignInButton from "../buttons/GoogleSignInButton";

function SignIn() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      navigate("/");
    } else {
      alert("Invalid Email");
    }
  };

  return (
    <Background>
      <Container>
        <Heading>
          Register or Login to <br />
          <span>Budget King</span>
        </Heading>
        <Register>
          <Form>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="test@example.com"
              value={email}
              required
            />
            <Submit onClick={handleSignIn}>Sign In</Submit>
          </Form>
          <Tag>or</Tag>
          <GoogleSignInButton />
        </Register>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #191919;
`;

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 48px;
  margin-bottom: 60px;

  span {
    font-size: 96px;
  }
`;

const Register = styled.div`
  width: 75%;
`;

const Form = styled.form``;

const Input = styled.input`
  height: 50px;
  width: 100%;
  display: block;
  padding: 0px 20px;
  background: transparent;
  border: 2px solid #2a2a2a;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 500;
  color: #d4d4d4;
  margin-bottom: 20px;

  &::placeholder {
    color: #848484;
  }
`;

const Submit = styled.button`
  height: 50px;
  width: 100%;
  display: block;
  background: #4c7dfc;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  color: #f9f9f9;
  margin-bottom: 10px;
`;

export default SignIn;
