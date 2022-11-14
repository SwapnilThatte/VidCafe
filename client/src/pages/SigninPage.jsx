import React from 'react'
import styled from 'styled-components'
import './signin.css'
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({ theme }) => theme.textColorPrimary};
`;

const Wrapper = styled.div`
    display: flex;
    min-width: 300px;
    width: 500px;
    align-items: center;
    flex-direction: column;
    /* height: calc(100vh - 75px); */
    /* border-radius: 1rem; */
    border-radius: 6px;
    background-color: ${({ theme }) => theme.lightBackground};
    padding: 70px 50px;
    gap: 10px;
`;

const Title = styled.div`
    font-size: 40px;
    margin-bottom: 40px;
`
const Input = styled.input`
    font-size: 24px;
    background-color: transparent;
    color : ${({ theme }) => theme.textColorPrimary};
    border: none;
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.textColorPrimary};
    border-radius: 4px;
    padding: 4px 10px;
    width: 100%;
    margin-top: 20px;
`;


const Button = styled.button`
    font-size: 18px;
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background: linear-gradient(to right, #268ff1 0%, #0056c5d5 100%);
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    color:  ${({ theme }) => theme.buttonTextColorHover};
    &:hover {
        background: linear-gradient(to right, #227fd5 0%, #0048a5d4 100%);
    }
`;

const Image = styled.img`
    border-radius: 50%;
    width: 38px;
    height: 38px;
`;


export const SigninPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then((result) => {
                axios
                    .post("http://localhost:5000/api/auth/google", {
                        name: result.user.displayName,
                        email: result.user.email,
                        image: result.user.photoURL,
                    })
                    .then((response) => {
                        dispatch(loginSuccess(response.data));
                    });
            })
            .catch((error) => {
                dispatch(loginFailure());
            });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(loginStart());
        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/signin`,
                {
                    email,
                    password,
                }
            );

            dispatch(loginSuccess(response.data));
            console.log(`RES COOKIE => ${response.headers}`);
            console.table(response)
            localStorage.setItem("auth-token", response.data._id)
            
            
        } catch (err) {
            dispatch(loginFailure());
            console.log("ERR => authentication ERR\n", err);
        }
    };




  return (
      <div>
          <Container>
              <Wrapper>
                  <Title>Sign In</Title>
                  <Input
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="buttons">
                      <div>
                          <Button onClick={(event) => handleLogin(event)}>
                              Sign In
                          </Button>
                      </div>
                      <div className="signin-google" onClick={signInWithGoogle}>
                          <Image src="google image.png"></Image>
                          <span>SignIn with Google</span>
                      </div>
                  </div>
              </Wrapper>
          </Container>
      </div>
  );
}
