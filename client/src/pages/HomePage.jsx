import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Card } from '../components/card/Card'
import axios from 'axios'


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    color: ${({ theme }) => theme.textColorPrimary};
`; 

const HomePage = ({type}) => {
  
    const [videos, setVideo] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            console.log(type);
            let response ;
            try {
                response = await axios.get(
                    `http://localhost:5000/api/video/${type}`
                );
                console.log(videos.length);
                setVideo(response.data)
            }
            catch (err) {
                console.log(`AXIOS ERROR`);
                console.log(err)
            }
                console.log(response);
        }
        fetchVideos()
    }, [type])
  
  
    console.log(videos[0]);
    return (
        <Container>
            {/* <h1>Start from 2:29:48/3:27:28</h1> */}
        {
            videos.map(video => {
                return <Card key={video._id} data={video}/>
            })
        }
        
        </Container>
    );
}


export default HomePage
