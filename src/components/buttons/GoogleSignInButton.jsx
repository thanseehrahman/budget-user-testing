import React from "react";
import styled from "styled-components";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

function GoogleSignInButton() {
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignIn onClick={handleSignIn}>
      <Logo src="/images/google.svg" />
      Continue with Google
    </SignIn>
  );
}

const SignIn = styled.button`
  height: 50px;
  width: 100%;
  display: block;
  background: transparent;
  border: 2px solid #2a2a2a;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 500;
  color: #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  display: inline-block;
  margin-right: 6px;
`;

export default GoogleSignInButton;
