import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "./SignIn.css"
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { client, Comment, Follow } from './http';



function GoToPost() {
    const [show, setShow] = useState(false);
    const handleclose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = useParams().id
    const token = localStorage.getItem("token")
    const UserName = localStorage.getItem("UserName")


    const { data } = useQuery(["SpecificPost"], () => {
        return axios.post(`http://localhost:4000/Post/posts/${id}`, {}, {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`
            }
        }).then((res) => res.data)
    })
    console.log(data)
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
        {data.userinfo.Email!==props?.popper?.state?.options?.testObj?.userId?.Email&&<div>
        
        <div className=''>
        <div style={{ width: "75px", height: "75px", margin: "45px" }}>
        <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${props?.popper?.state?.options?.testObj?.userId?.Img}`} alt='story' />
        </div>
        <div className=''>
        <h5>{props?.popper?.state?.options?.testObj?.userId?.UserName}</h5>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
            <div>
            <p>{props?.popper?.state?.options?.testObj?.userId?.Posts?.length}</p>
            <p>Posts</p>
            </div>
            <div>
            <p>{props?.popper?.state?.options?.testObj?.userId?.Followers?.length}</p>
            <p>Followers</p>
            </div>
            <div>
            <p>{props?.popper?.state?.options?.testObj?.userId.Following.length}</p>
            <p>Following</p>
            </div>
            </div>
            <div className='d-flex gap-3'>
            {props?.popper?.state?.options?.testObj?.userId?.Posts.slice(1, 3).map((e, i) => {
                return <div >
                <img src={`http://localhost:4000/uploads/user/posts/${e.Img}`} class="w-100 rounded" alt="..." />
                </div>
            })}
            </div>
            <div className='pt-3'>
            <Button variant="primary w-100" onClick={()=>HandelFollow(props?.popper?.state?.options?.testObj?.userId.id)}>
            {data?.userinfo.Following.find(e => JSON.stringify(e?.Followers?.id) === JSON.stringify(props?.popper?.state?.options?.testObj?.userId.id)) ? "Following" : "follow"}
            </Button>
            </div>
            </div>}
            </Tooltip>
    );
    const [comment, setComment] = useState()
    const { mutate } = useMutation({
        mutationFn: Comment,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["SpecificPost"] })
        }
    })
    const handelcomment = async (id, comment) => {
        console.log(id, comment)
        mutate({ id, comment })
    }
    const{mutate:following}= useMutation({
        mutationFn:Follow,
        onSuccess:()=>{
            client.invalidateQueries({queryKey:["SpecificPost"]})
        }
    }) 
    const HandelFollow = async (id) => {
        console.log(id)

        following({id})
    }
    console.log(data?.userinfo.UserName)
    return (
        <div className='container fullwidth'>
            <div className='row'>
                {data?.post?.Img?.map((e, i) => {
                    return <div className='col-6 m-2 fullwidth'>
                        <img
                            style={{ objectFit: "cover" }}
                            className=" w-100 h-100 rounded"
                            src={`http://localhost:4000/uploads/user/posts/${e}`}
                            alt=" slide"
                        />
                    </div>
                    // })
                })}
                {/* <div className='col-8'>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover", paddingBottom: "20px", borderRadius: "25px" }} src='https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg' alt='pic' />
                </div> */}
                <div className='col h-100 '>
                    <div className=' border border-warning rounded p-3 m-2'>
                        <span className='p-2 fw-bolder'>
                            {data?.post?.userId.UserName}
                        </span>
                        {data?.userinfo.UserName!==UserName&&<span onClick={handleShow} className='fw-bolder'>
                            {data?.userinfo.Following.find(e => JSON.stringify(e?.Followers?.id) === JSON.stringify(data?.post.userId.id)) ? "Following" : "follow"}
                            <Modal show={show} onHide={handleclose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        Friendship
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body><div style={{ width: "120px", height: "120px" }}>
                                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", margin: "0 0 0 170px" }} src={`http://localhost:4000/uploads/user/profile/${data?.post.userId.Img}`} alt='story' />
                                </div></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleclose}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={()=>HandelFollow(data.post.userId.id)}>
                                    {data?.userinfo.Following.find(e => JSON.stringify(e?.Followers?.id) === JSON.stringify(data?.post.userId.id)) ? "Unfollow" : "follow"}

                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </span>}
                    </div>
                    <div style={{ height: "300px" }} className=' overflow-auto border border-warning rounded mt-2'>
                        {data?.post?.Comments?.map((e, i) => {
                            return <div className='d-flex overflow-auto'>

                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                    popperConfig={{ testObj: e }}
                                >
                                    <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                                        <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${e.userId.Img}`} alt='story' />
                                    </div>
                                </OverlayTrigger>
                                <div className='pt-4'>
                                    <span className='fw-bolder p-1'>{e.userId.UserName}</span>
                                    <p className='fs-5'>{e.Comment}</p>
                                </div>

                            </div>
                        })
                        }
                    </div>


                    <div className='border border-warning rounded p-2 mt-2 message'>
                        <div class="d-flex bd-highlight mb-3">
                            <div class="p-2 bd-highlight"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg></div>
                            <div class="p-2 bd-highlight"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                            </svg></div>
                            <div class="ms-auto p-2 bd-highlight"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                            </div>
                        </div>
                        <div>
                            <div style={{ width: "50px", height: "50px", margin: "20px", display: "inline-block" }}>
                                <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${data?.userinfo.Img}`} alt='story' />
                            </div>
                            <div className="wrapper d-inline" >
                                <input
                                    type="text"
                                    className="search-hover"
                                    placeholder="Add a Comment...."
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <div className='d-inline'>
                                <button onClick={() => handelcomment(data?.post?.id, comment)} className='btn btn-outline-primary'>add</button>
                            </div>

                        </div>
                    </div>



                </div>


            </div>

        </div>

    )
}

export default GoToPost