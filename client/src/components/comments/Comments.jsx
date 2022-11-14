import React from 'react'
import styled from 'styled-components'
import { Comment } from '../Comment';

const Container = styled.div`

`;

const NewComent = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: text;
    &:hover {
        cursor: pointer;
    }
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
`;

const Input = styled.input`
    border: none;
    font-size: 1.2rem;
    background-color: transparent;
    padding: 5px 10px;
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.textColorPrimary};
    width: 100%;

    &:focus {
        border-bottom: 2px solid ${({ theme }) => theme.textColorPrimary};
    }

`;

export const Comments = () => {
  return (
    <Container>
        <NewComent>
            <Avatar src="/node JS image.png"/>
            <Input placeholder='Add a comment'/>
        </NewComent>

        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    </Container>
  )
}
