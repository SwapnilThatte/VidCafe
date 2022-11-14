import React, { useState } from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'

const Container = styled.div`
    flex: 1;
    background-color: ${({ theme }) => theme.backgroundColor};
    /* box-shadow: 0 0 8px 6px ${({ theme }) => theme.shadowColor}; */
    height: 100vh;
    color: ${({ theme }) => theme.textColorPrimary};
    font-size: 14px;
    position: sticky;
    left: 0;
    top: 0;
`;
const Wrapper = styled.div`
    padding: 18px 26px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    margin-bottom: 12px;
    cursor : pointer;

`;

const Heading = styled.h1`
    font-family: "Mochiy Pop One", sans-serif;
    /* background: linear-gradient(to right, #ff36de 0%, #a736de 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    color: #0c76dadf;
    margin-bottom: 2rem;
`;

const Img = styled.img`
    height: 25px;
    transition: 0s !important;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 6.6px 6px;
    border-radius: 6px;
    transition: 0s !important;
    &:hover {
        color: white;
        background: linear-gradient(to right, #0c76dadf 0%, #0754b9c1 100%);
    }
`;


const Hr = styled.hr`
    margin: 10px 0px;
    border: 0.5px solid linear-gradient(to right, #ff36de 0%, #a736dea0 100%);
`;

const Login = styled.div`

`

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    //border: 1px solid ${({ theme }) => theme.buttonColor};

    // 22a705 -> #22f405
    color: ${({ theme }) => theme.buttonColor};
    font-weight: 500;

    margin-top: 10px;
    cursor: pointer;

    border-radius: 6px;
    border: none;
    padding: 10px 20px;
    background: linear-gradient(to right, #ff36de 0%, #a736dea0 100%);
    color: ${({ theme }) => theme.buttonTextColorHover};
    &:hover {
       transform : scale(1.16, 1.1) ;
        background: linear-gradient(to right, #ff36de 0%, #a736de 100%);
        // color: ${({ theme }) => theme.buttonTextColorHover};
    }
`;

export default function Menue({darkMode, setDarkMode}) {
    
    const [currTheme, setCurrTheme] = useState("Dark")

    const handleThemeChange = event => {
         event.preventDefault()
        setDarkMode(!darkMode);
        if (currTheme !== "Dark") {
            setCurrTheme("Dark")
        }else {
            setCurrTheme("Light")
        }
    }

    return (
        <Container>
            <Wrapper>
                <Link
                    to={""}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Logo>
                        {/* <Img src={logo}></Img> */}
                        <Heading>VidCafe</Heading>
                    </Logo>
                </Link>

                <Link
                    to={""}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Item>
                        <span className="material-symbols-sharp">home</span>
                        Home
                    </Item>
                </Link>

                <Link
                    to={"trending"}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Item>
                        <span className="material-symbols-sharp">explore</span>
                        Trending
                    </Item>
                </Link>

                <Link
                    to={"subscription"}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Item>
                        <span className="material-symbols-sharp">
                            video_library
                        </span>
                        Subscriptions
                    </Item>
                </Link>

                <Item>
                    <span className="material-symbols-sharp">history</span>
                    History
                </Item>
                <Hr />

                {/* <Login>
                    For more content & notes
                    <br />
                    <Button>Sign In</Button> */}
                {/* </Login> */}

                {/* <Hr /> */}
                <Item>
                    <span className="material-symbols-sharp">music_note</span>
                    Music
                </Item>

                <Item>
                    <span className="material-symbols-sharp">
                        sports_basketball
                    </span>
                    Sports
                </Item>

                <Item>
                    <span className="material-symbols-sharp">
                        stadia_controller
                    </span>
                    Gaming
                </Item>
                <Item>
                    <span className="material-symbols-sharp">movie_filter</span>
                    Movies
                </Item>
                <Item>
                    <span className="material-symbols-sharp">newspaper</span>
                    News
                </Item>

                <Hr />
                <Link
                    to={"settings"}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Item>
                        <span className="material-symbols-sharp">settings</span>
                        Settings
                    </Item>
                </Link>
                <Item onClick={(event) => handleThemeChange(event)}>
                    <span className="material-symbols-sharp">brightness_6</span>
                    {currTheme} Mode
                </Item>
            </Wrapper>
        </Container>
    );
}
