import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    gap: 20px;
    margin: 50px 0;
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    background-color: ${({ theme }) => theme.shadowColor};
    padding: 1rem 1.4rem;
    border-radius: 1rem;
`;

const Name = styled.div`
    font-size: 1.2rem;
    font-weight: bolder;
`

const Date = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.softTextColor};
  margin-left: 5px;
`;

const Text = styled.div`
    
`




export const Comment = () => {
  return (
      <Container>
          <Avatar src="/node JS image.png" />
          <Details>
            <Name>John Doe</Name>
            <Date>1 day ago</Date>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus expedita quidem vero dolor facilis aut eum deleniti obcaecati earum omnis nemo, maiores inventore optio consectetur voluptatem! Laudantium, natus aut?</Text>

          </Details>
      </Container>
  );
}
