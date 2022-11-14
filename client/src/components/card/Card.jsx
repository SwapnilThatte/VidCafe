import React from 'react'
import styled from 'styled-components'
import { format } from "timeago.js";
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'


const Container = styled.div`
    width: 340px;
    max-width: 340px;
    min-width: 340px;
    margin: 22.5px 0px;
    cursor: pointer;
    border-radius: 6px;
    padding: 12px 6px;
    color: ${({ theme }) => theme.textColorPrimary} !important;
    &:hover {
        transition: 0.2s !important;
        transform: scale(1.03, 1.03);
        box-shadow: 0 0 16px 1px ${({ theme }) => theme.shadowColor};
        background-color: ${({ theme }) => theme.lightBackground};
    }
`;

const Image = styled.img`
    width : 100% ;
    height : 204px ;
    background-color : #b5b5b5 ;
    border-radius : 6px ;
`

const Details = styled.div`
    display : flex;
    margin-top : 16px; 
    gap : 12px ;
`

const ChannelImage = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: blue;
    border: none !important;
    outline: none !important;
`;

export const Card = (video) => {

    const [channel, setChannel] = useState({})
      useEffect(() => {
          const fetchChannel = async () => {
              let response;
              try {
                  response = await axios.get(
                      `http://localhost:5000/api/users/find/${video.userId}`
                  );
                  setChannel(response.data);
              } catch (err) {
                  console.log(`AXIOS ERROR`);
                  console.log(err);
              }
              console.log(response);
          };
          fetchChannel();
      }, [video.userId]);
  
      console.log(video.data._id);
  return (
    <Link to={`/video/${video.data._id}`} style={{ textDecoration : "None"}}>
      <Container>
          <Image src={video.data.imgUrl} />
          <Details>
              <ChannelImage src={video.data.imgUrl} />
              <div>
              <h3>{video.data.title}</h3>
              <h5>Views {video.data.views}</h5>
              <h6>Uploaded {format(video.data.createdAt)}</h6>
              </div>
          </Details>
      </Container>
    </Link>
  );
}
