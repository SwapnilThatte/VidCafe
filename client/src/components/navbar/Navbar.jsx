import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import './navbar.css'
import { useSelector } from 'react-redux';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.backgroundColor};
    //background-color: transparent;
    border-radius: 0px 0px 10px 10px;
    height: 56px;
    z-index: 99;
    padding: 0;
    box-shadow: 0px 2px 10px 1px ${({ theme }) => theme.shadowColor};
    /* box-shadow: 0px 2px 2px 1px rgba(0, 0, 255, .2); */
`;


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position : relative ;
    padding : 9px 20px ;
`;

const Search = styled.div`
left: 0;
right: 0;
width: 50%;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px 8px;
border-radius : 6px;
`;
    
    const Input = styled.input`
    font-size: 22px;
    border: none;
    outline: none;
    // padding : 5px 8px ;
    background-color: transparent;
    width: 100%;
    color: ${({ theme }) => theme.textColorPrimary};

    
`;



const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    //border: 1px solid ${({ theme }) => theme.buttonColor};

    // 22a705 -> #22f405
    color: ${({ theme }) => theme.buttonColor};
    font-weight: 500;

    margin-top: 0px;
    cursor: pointer;
    margin: 0 10px;
    border-radius: 6px;
    border: none;
    padding: 10px 20px;
    /* background: linear-gradient(to right, #ff36de 0%, #a736dea0 100%); */
    background: linear-gradient(to right, #0d80ec 0%, #085ccad8 100%);
    color: ${({ theme }) => theme.buttonTextColorHover};
    &:hover {
        transform: scale(1.16, 1.1);
        /* background: linear-gradient(to right, #ff36de 0%, #a736de 100%); */
        background: linear-gradient(to right, #0c76da 0%, #0754b9d7 100%);
        // color: ${({ theme }) => theme.buttonTextColorHover};
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColorPrimary};
`;

const Avatar = styled.img `
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #00b530;
    border: none;
    outline: none;
`

const videoUploadStyle = {
    cursor: "pointer",
    padding: "0 10px",
    backgroundColor: `${({ theme }) => theme.textColorPrimary}`,
};

export default function Navbar() {


    const {currentUser}  = useSelector(state => state.user)

  return (
      <Container>
          <Wrapper>
              <Search className="search">
                  <Input placeholder="Search" className="input" />
                  <span className="material-symbols-outlined search-icon">
                      search
                  </span>
              </Search>
              {currentUser ? (
                  <User>
                      <span className   ="material-symbols-outlined uploadVideo" style={videoUploadStyle}>videocam</span>
                      <Avatar />
                      {currentUser.name}
                  </User>
              ) : (
                  <>
                      <Link to="signin">
                          <Button>Sign In</Button>
                      </Link>

                      <Link to="signup">
                          <Button>Register</Button>
                      </Link>
                  </>
              )}
          </Wrapper>
      </Container>
  );
}
