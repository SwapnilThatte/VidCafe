import React from "react";
import styled from "styled-components";

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
    height: calc(100vh - 75px);
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.lightBackground};
    padding: 20px 50px;
    gap: 10px;
`;

export const SignupPage = () => {
    return (
        <div>
            <Container>
                <Wrapper>
                    <h1>Sign Up</h1>
                </Wrapper>
            </Container>
        </div>
    );
};
