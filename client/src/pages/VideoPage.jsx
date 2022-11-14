import React, { Component, useEffect } from 'react'
import styled from 'styled-components'
import { Comments } from '../components/comments/Comments';
import { Card } from '../components/card/Card'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { fetchSuccess, like, dislike } from '../redux/videoSlice';
import { format } from 'timeago.js';

const Container = styled.div`
    display: flex;
    gap: 24px;
    margin-top: 14px;
    color: ${({ theme }) => theme.textColorPrimary};
`;

const Content = styled.div`
  flex: 6;
 
`

const VideoWrapper = styled.div`
  
  
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
    margin: 10px 10px;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 10px;
    color: ${({ theme }) => theme.softTextColor};
`;

const Info = styled.div``

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 8px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.shadowColor};
    }
`;




const Recommendation = styled.div`
  flex : 2 ;
  
`
const Channel = styled.div`
 display: flex;
 justify-content: space-between;
 margin: 28px 0;
`
const ChannelInfo = styled.div`
 display: flex;
 gap: 20px;
`

const Subscribe = styled.button`
    color: white;
    background-color: red;
    font-weight: 600;
    font-size: 1rem;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 10px;

    &:hover {
        background-color: #e50000;
    }
`;
const Image = styled.img`
    width: 50px;
    height: 50px;
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
`;
const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.textColorPrimary};
`;
const ChannelName = styled.div`
    font-weight: 500;
    font-size: 1.6rem;
    margin-bottom: 10px;
    cursor : pointer;
`
const ChannelCounter = styled.div`
    margin-bottom: 30px;
    color: ${({ theme }) => theme.softTextColor};
`;
const Description = styled.div`
    
`



const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({ theme }) => theme.shadowColor};
`;


export default function VideoPage() {
    // const { currentUser } = useSelector((state) => state.user);
    // const { currentVideo } = useSelector((state) => state.video);
    // const dispatch = useDispatch();

    // const path = useLocation().pathname.split("/")[2];

    // const [channel, setChannel] = useState({});
    // console.log(channel);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const videoRes = await axios.get(`http://localhost/5000/api/videos/find/${path}`);
    //             const channelRes = await axios.get(
    //                 `http://localhost/5000/api/users/find/${videoRes.data.userId}`
    //             );
    //             console.log(videoRes);
    //             setChannel(channelRes.data);
    //             dispatch(fetchSuccess(videoRes.data));
    //         } catch (err) {
    //             console.log(`ERRR => ${err}`);
    //         }
    //     };
    //     fetchData();
    // }, []);

    //     const [channel, setChannel] = useState({})
    //     const [video, setVideo] = useState({})
    //     // const [liked, setLiked] = useState(false)
    //     const {currentUser}  = useSelector(state => state.user)
    //  const dispatch = useDispatch();

    //     const location = useLocation().pathname.split("/")[2];

    //     useEffect(() => {
    //         async function fetchData() {
    //             try {
    //                 console.log("THIS IS LOCATION", location);
    //                 const videoRes = await axios.get(
    //                     `http://localhost:5000/api/video/find/${location}`
    //                 );
    //                 const channelRes = await axios.get(
    //                     `http://localhost:5000/api/users/find/${videoRes.data.userId}`
    //                 );
    //                 setVideo(videoRes.data);
    //                 setChannel(channelRes.data);
    //                 console.log(`LIKES => ${video.likes ? "TRUE" : "FALSE"}`);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         fetchData();
    //     }, [location]);

    //     // const handleLike = async () => {
    //     //     if (currentUser) {
    //     //         console.log(currentUser);
    //     //     try {
    //     //         if (!video.likes.includes(currentUser._id)) {

    //     //          setLiked(true);
    //     //         console.log("Video ID",location);
    //     //         console.log("User ID", currentUser._id);
    //     //         const res = await axios.post(
    //     //             `http://localhost:5000/api/users/like/${location}`,
    //     //             {userId : currentUser._id}
    //     //         );
    //     //         console.log(res);
    //     //         }
    //     //         else {
    //     //             alert("You have already Liked this video !")
    //     //         }
    //     //     } catch (error) {
    //     //      console.log(error);
    //     //     }
    //     // }
    //     // else {
    //     //     alert("Please Sign in to Like !")
    //     // }
    //     // }

    //     const handleLIKE = async () => {
    //             await axios.post(`http://localhost:500/users/like/${video._id}`);
    //             dispatch(like(currentUser._id));

    //     }

    const currUser = useSelector((state) => state.user);
    const currentVideo = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const path = useLocation().pathname.split("/")[2];

    const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(
                    `http://localhost:5000/api/video/find/${path}`
                );
                console.log(videoRes);
                const channelRes = await axios.get(
                    `http://localhost:5000/api/users/find/${videoRes.data.userId}`
                );
                setVideo(videoRes.data)
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
                
                
            } catch (error) {
                console.log("ERROR IN FETCH DATA");
            }
           
        };
        fetchData();
    }, [path, dispatch]);

    const handleLike = async () => {
        if (!(currentVideo.currentVideo.likes?.includes(currentVideo.currentVideo.userId))) {
            console.log(
                "CONDITION => ",
                currentVideo.currentVideo.userId === channel._id
            );
            console.log(channel);
            const likeRes = await axios.post(
                `http://localhost:5000/api/users/like/${video._id}`,
                {
                    userId: currentVideo.currentVideo.userId,
                }
            );
            console.log(likeRes);
            dispatch(like(currentVideo.currentVideo.userId))
        }
        else {
            // alert("video is already liked")
            console.log("Video is liked");
        }
    };

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <iframe
                        width="100%"
                        height="496px"
                        src={video.videoUrl}
                        frameholder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{
                            borderRadius: "10px",
                            border: "none",
                            outline: "none",
                        }}
                        allowFullScreen
                    ></iframe>
                    <Title>{currentVideo.currentVideo.title}</Title>
                    <Details>
                        {currentVideo.currentVideo.views} views |{" "}
                        {format(currentVideo.currentVideo.createdAt)}
                        <Buttons>
                            <Button onClick={handleLike}>
                                {currentVideo.currentVideo.likes?.includes(
                                    currUser.userId
                                ) ? (
                                    
                                    (
                                        <span
                                            class="material-symbols-outlined"
                                            style={{ color: "#ff0000" }}
                                        >
                                            thumb_up_off
                                        </span>
                                    )
                                ) : (
                                    <span
                                        className="material-symbols-outlined"
                                        
                                    >
                                        thumb_up
                                    </span>
                                )}
                                {currentVideo.currentVideo.likes?.length}
                                {/* {video.likes ? liked ? video.likes.length + 1: video.likes.length: liked? video.likes.length: 0}
                                 */}
                            </Button>
                            <Button>
                                <span className="material-symbols-outlined">
                                    thumb_down_off
                                </span>
                                Dislike
                            </Button>

                            <Button>
                                <span className="material-symbols-outlined">
                                    share
                                </span>
                                Share
                            </Button>
                        </Buttons>
                    </Details>

                    <Channel>
                        <ChannelInfo>
                            <Image src={currentVideo.currentVideo.imgUrl} />
                            <ChannelDetail>
                                <ChannelName>{channel.name}</ChannelName>

                                <ChannelCounter>
                                    {channel.subscribers} Subscribers
                                </ChannelCounter>

                                <Description>
                                    {currentVideo.currentVideo.desc}
                                </Description>
                            </ChannelDetail>
                        </ChannelInfo>
                        <Subscribe>Subscribe</Subscribe>
                    </Channel>
                    <Hr />
                    <Comments />
                </VideoWrapper>
            </Content>

            <Recommendation>
                {/* <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card>
            <Card type="sm">Recomendation Card</Card> */}
            </Recommendation>
        </Container>
    );
}
