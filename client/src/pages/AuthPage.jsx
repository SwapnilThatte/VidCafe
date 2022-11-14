import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 60px);
    color: ${({ theme }) => theme.textColorPrimary};
`;

const Wrapper = styled.div`
    display: flex;
    min-width: 300px;
    width: 500px;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 75px);
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.lightBackground};
    padding: 20px 50px;
    gap: 10px;
`;

const Title = styled.h1`
    font-weight: 400;
    /* margin: 1rem; */
`
const SubTitle = styled.h2`
    
`

const Input = styled.input`
    border: none;
    outline: none;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.textColorPrimary};
    margin: 0.5rem 0;
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.textColorPrimary};
    padding: 0.2rem 0.5rem;

`;
    
const Button = styled.button`
    font-size: 1.2rem;
    padding: 0.5rem 2rem;
    border: none;
    outline: none;
    background-color: #07ba13;
    cursor: pointer;
    border-radius: 10px;
    color: white;
    &:hover {
        background-color: #088210;
    }
`;

const More = styled.div``

const Hr = styled.hr`
    width : 100%;
    margin: 1rem 0;
    color: ${({ theme }) => theme.textColorPrimary};
`;

export const AuthPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()


    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider).then(result => {
            axios.post('http://localhost:5000/api/auth/google',
            {
                name : result.user.displayName,
                email : result.user.email,
                image : result.user.photoURL
            }).then(response => {
                dispatch(loginSuccess(response.data))
            })
        })
        .catch(error => {
            dispatch(loginFailure())
        })
    }

    const handleLogin = async event => {
        event.preventDefault()
        dispatch(loginStart())
        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/signin`,
                {
                    email ,password
                }
            );
            dispatch(loginSuccess(response.data))
            console.log(response.data);
        }
        catch (err) {
            dispatch(loginFailure())
            console.log("ERR => authentication ERR\n", err);
        }
    }

  return (
      <Container>
          <Wrapper>
              <Title>Sign In</Title>
              {/* <SubTitle>Welcome to MediaPipe</SubTitle> */}
              <Input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <Input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <Button onClick={handleLogin}>Sign In</Button>

            OR

            <Button onClick={signInWithGoogle}>Signin with Google</Button>

              <Hr />

              <Title>Register</Title>
              {/* <SubTitle>Welcome to MediaPipe</SubTitle> */}
              <Input placeholder="Username" onChange={e => setName(e.target.value)}/>
              <Input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <Input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <Button>Register</Button>
          </Wrapper>
      </Container>
  );
}
