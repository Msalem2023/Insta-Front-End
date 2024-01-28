import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { client, Comment, Destroy, Love, Update } from './http.js';
import Suggested from './Suggested.js';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import "./Nav.css"
import Moment from 'react-moment';
import Slider from './slider.js';




function Home() {
    const token = localStorage.getItem("token")
    const { data } = useQuery(["Home"], () => {
        return axios.get('http://localhost:4000/Post/posts', {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`
            }
        }).then((res) => res.data)
    })
    const [comment, setComment] = useState()
    const user = data?.loggedInUser
    const { mutate } = useMutation({
        mutationFn: Comment,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Home"] })
        }
    })
    const { mutate: destroy } = useMutation({
        mutationFn: Destroy,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Home"] })
        }
    })
    const { mutate: like } = useMutation({
        mutationFn: Love,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Home"] })
        }
    })
    const { mutate: update } = useMutation({
        mutationFn: Update,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Home"] })
            setEdit(false)
        }
    })
    const handelcomment = async (id, comment) => {
        mutate({ id, comment })
    }
    const HandelLove = async (id) => {
        like({ id })
    }
    const [edit, setEdit] = useState(false)
    const handelEdit = (id, element) => {
        console.log(element)
        setEdit(true)
        const edit = localStorage.setItem("edit", element)
        const commentid = localStorage.setItem("commentid", id)

    }
    const updateComment = async (comment) => {
        const commentid = localStorage.getItem("commentid")

        update({ commentid, comment })
    }
    const deleteComment = async (id) => {
        destroy({ id })

    }
    console.log(data)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const [show, setShow] = useState(false);
    const [showPostComment, setShowPostComment] = useState(false);

    const [pic, setPic] = useState([])
    const [postComment, setPostComment] = useState([])

    const Handelstory = (e) => {
        setPic(e)
        setShow(true)
    }
    return (
        <>
            <div className='row'>
                <div className=' col-8 post'>
                    <div className=' d-flex gap-2 m-3'>

                        {data?.Posts?.map((e, i) => {
                            return <motion.div style={{ width: "50px", height: "50px", }}>
                                <motion.img initial={{ opacity: 0, translateX: -50, translateY: -50 }} animate={{ opacity: 1, translateX: 0, translateY: 0 }} transition={{ duration: 0.3, delay: i * 0.5 }} onClick={() => Handelstory(e.Img)} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/posts/${e.Img[0]}`} alt='story' />
                                <Modal
                                    show={show}
                                    onHide={() => setShow(false)}
                                    dialogClassName="modal-90w modal-lg"
                                    aria-labelledby="example-custom-modal-styling-title"
                                    className='h-100'
                                >
                                    <div className='w-100' closeButton>
                                        {pic?.length > 1 && <Carousel responsive={responsive} className=" ">
                                            {pic?.map((e, i) => {
                                                return <div class="w-100">
                                                    <img src={`http://localhost:4000/uploads/user/posts/${e}`} style={{ width: "100%", height: "500px", objectFit: "cover" }} alt="..." />
                                                </div>

                                            })}
                                        </Carousel>
                                        }
                                        {pic?.length === 1 && pic?.map((e, i) => {
                                            return <div class="carousel-item active">
                                                <img src={`http://localhost:4000/uploads/user/posts/${e}`} style={{ width: "100%", height: "500px", objectFit: "cover" }} alt="..." />
                                            </div>

                                        })}
                                    </div>
                                </Modal>
                            </motion.div>
                        })
                        }
                    </div>
                    <div className='container full col-10 pt-2'>

                        {data?.Posts?.map((e, i) => {
                            return <motion.div initial={{ opacity: 0, translateX: -50 }} whileInView={{ opacity: 1, translateX: 0, translateY: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className='row w-100 p-2'>

                                <div className='d-flex gap-3 pb-2'>
                                    <div style={{ width: "50px", height: "50px" }}>
                                        <img style={{ width: "100%", height: "100%", borderRadius: "100%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${e?.userId?.Img}`} alt='user' />
                                    </div>
                                    <div>
                                        <span className='fw-bolder fs-4 p-1'>{e?.userId?.UserName}</span>
                                        .<Moment fromNow>{e.createdAt}</Moment>
                                    </div>
                                </div>
                                <div>
                                    {e.Img.length > 1 && <Slider img={e.Img}/>
                                    }
                                    {e.Img.length === 1 && e.Img.map((e, i) => {
                                        return <div class="fullwidth">
                                            <img src={`http://localhost:4000/uploads/user/posts/${e}`} style={{ height: "300px" }} class=" w-100 rounded" alt="..." />
                                        </div>
                                    })}

                                    {/* <img className=' w-100 rounded' src='https://media.glamour.com/photos/56966ebf93ef4b095210f195/master/w_1600%2Cc_limit/beauty-2014-06-quiff-david-beckham-main.jpg' alt='user' /> */}
                                </div>
                                <div className='d-flex gap-3 mt-3'>
                                    {<div>
                                        <svg onClick={() => HandelLove(e._id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={`${e.Likes.find(e => JSON.stringify(e.userId) === JSON.stringify(user)) ? "red" : "light"}`} class="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>

                                    </div>}
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                        </svg>

                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                        </svg>

                                    </div>
                                </div>
                                <div>
                                    <p className='p-1 fw-bolder'>{e.Likes.length} Likes</p>
                                    <div className='d-flex gap-2'>
                                        <p className='fw-bolder'>{e.userId?.UserName}</p>
                                        {e.description}
                                    </div>
                                    <Link to={`/layout/GoToPost/${e.id}`} className='btn btn-link text-decoration-none p-1'> View all {e.Comments.length} Comments</Link>
                                    <Modal
                                        show={showPostComment}
                                        onHide={() => setShowPostComment(false)}
                                        dialogClassName="modal-90w modal-lg"
                                        aria-labelledby="example-custom-modal-styling-title"
                                    >
                                        <div closeButton>
                                            {postComment.Img?.length > 1 && <Carousel responsive={responsive} className=" ">
                                                {postComment.Img?.map((e, i) => {
                                                    return <div style={{ height: "580px" }} class="d-flex">
                                                        <img src={`http://localhost:4000/uploads/user/posts/${e}`} style={{ width: "50%", height: "100%", objectFit: "cover", }} alt="..." />
                                                        <div className='w-100 h-100 overflow-auto p-2'>
                                                            {postComment.Comments.map((e, i) => {
                                                                return <div className='d-flex gap-2 align-items-center'>
                                                                    <div style={{ width: "50px", height: "50px" }}>
                                                                        <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${e.userId.Img}`} alt='story' />
                                                                    </div>
                                                                    <div className='w-100'>
                                                                        <p style={{ height: "60px", width: "100%" }} className=' pt-4 overflow-auto'>                                                                <span className='fw-bolder  p-1'>{e.userId.UserName}</span>
                                                                            {e.Comment}</p>
                                                                    </div>
                                                                </div>
                                                            })
                                                            }
                                                        </div>
                                                    </div>

                                                })}
                                            </Carousel>
                                            }
                                            {postComment.Img?.length === 1 && postComment?.Img.map((e, i) => {
                                                return <div style={{ height: "580px" }} class="d-flex">
                                                    <div>
                                                        <img src={`http://localhost:4000/uploads/user/posts/${e}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="..." />
                                                    </div>
                                                    <div className='w-100 h-100 overflow-auto p-2'>

                                                        {postComment.Comments.map((e, i) => {
                                                            return <div className='d-flex gap-2 align-items-center'>
                                                                <div style={{ width: "50px", height: "50px" }}>
                                                                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${e.userId.Img}`} alt='story' />
                                                                </div>
                                                                <div className='w-100'>
                                                                    <p style={{ height: "60px", width: "100%" }} className=' pt-4 overflow-auto'>                                                                <span className='fw-bolder  p-1'>{e.userId.UserName}</span>
                                                                        {e.Comment}</p>
                                                                </div>
                                                            </div>
                                                        })
                                                        }
                                                    </div>
                                                </div>

                                            })}
                                        </div>
                                    </Modal>
                                </div>

                                {
                                    e.Comments.slice(-3).map((e, i) => {
                                        return <div className='disappear'>
                                            <div className='d-flex align-items-center justify-content-between '>
                                                <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", margin: "10px", gap: "10px" }}>
                                                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${e.userId?.Img}`} alt='story' />
                                                </div>
                                                <span className='fw-bolder p-1'>{e.userId?.UserName?.split(' ')[0]}</span>
                                                <span style={{ height: "60px", width: "45%" }} className=' overflow-auto p-3'>{e.Comment}</span>
                                                {JSON.stringify(e.userId.id) === JSON.stringify(user) ? <div className='d-flex justify-content-start' >
                                                    <button onClick={() => deleteComment(e._id)} className='btn btn-link text-decoration-none fw-bolder '>delete</button>
                                                    <button onClick={() => handelEdit(e._id, e.Comment)} className='btn btn-link text-decoration-none fw-bolder '>Edit</button>
                                                </div> : <div className='d-flex justify-content-start '>
                                                    <button className='btn btn-link text-decoration-none fw-bolder '>Like</button>
                                                    <button className='btn btn-link text-decoration-none fw-bolder '>Reply</button>
                                                </div>}
                                            </div>
                                        </div>
                                    })
                                }
                                {
                                    !edit && <div className='d-flex gap-2 fullwidth'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add a Comment..."
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <motion.button whileHover={{ scale: 1.2, backgroundColor: "#8b11f0" }} transition={{ type: "spring" }} onClick={() => handelcomment(e._id, comment)} className='btn btn-outline-primary '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                        </svg></motion.button>
                                    </div>
                                }
                                {
                                    edit && <div className='d-flex gap-2'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Add a Comment..."
                                            onChange={(e) => setComment(e.target.value)}
                                            defaultValue={localStorage.getItem("edit")}
                                        />
                                        <button onClick={() => updateComment(comment)} className='btn btn-outline-primary'>Edit</button>
                                    </div>
                                }
                            </motion.div>



                        })
                        }
                        {/* </div> */}
                    </div>



                </div>
                {/* <div className='col-3'>
                        <div>
                            <div className='d-flex'>
                                <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src='https://media.glamour.com/photos/56966ebf93ef4b095210f195/master/w_1600%2Cc_limit/beauty-2014-06-quiff-david-beckham-main.jpg' alt='story' />
                                </div>
                                <div>
                                    <span className='fw-bolder fs-4'>user</span>
                                    <p className='fs-5'>Muhammed salem</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between '>
                                <p>Suggested for you</p>
                                <p>see all</p>
                            </div>
                        </div>
                        <div className='d-flex '>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src='https://media.glamour.com/photos/56966ebf93ef4b095210f195/master/w_1600%2Cc_limit/beauty-2014-06-quiff-david-beckham-main.jpg' alt='story' />
                                </div>
                            </OverlayTrigger>

                            <div>
                                <span className='fw-bolder fs-4 p-1'>user</span>
                                <p className='fs-5'>Muhammed salem</p>
                                <p className='text-primary fw-bolder'>Follow</p>

                            </div> */}
                {/* </div> */}

                {/* </div> */}
                <div className='col'>
                    <Suggested />


                </div>


            </div>




        </>
    )

}
export default Home