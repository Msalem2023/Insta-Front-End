import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import Collapse from 'react-bootstrap/Collapse';
import "./Nav.css"
import { useMutation, useQuery } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { client, handelPosts } from './http.js';
import Add from './Add.js';
import { motion } from "framer-motion"





function Nav() {
    const userImg = localStorage.getItem("Img")
    const [show, setShow] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseMessages = () => setShowMessages(false);
    const handleShow = () => setShow(true);
    const handleShowMessages = () => setShowMessages(true);
    const [showModel, setShowModel] = useState(false);
    const handleCloseModel = () => setShowModel(false);
    const handleShowModel = () => setShowModel(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const handleCloseNotifications = () => setShowNotifications(false);
    const handleShowNotifications = () => setShowNotifications(true);
    const token = localStorage.getItem("token")
    let user = false
    const LoggedIn = window.localStorage.getItem("isLoggedIn")
    if (LoggedIn) {
        user = true
    }
    const logOut = () => {
        window.localStorage.clear()
        window.location.href = "./signIn"
    }
    const [search, setSearch] = useState()
    const { data, isError, isLoading } = useQuery(["Search"], () => {
        return axios.post(`http://localhost:4000/user/Search`, {}, {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`


            }
        }).then((res) => res.data.result)
    })
    const { mutate } = useMutation({
        mutationFn: handelPosts,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Home"] })


        }
    })
    const handelsubmit = (image, description) => {
        mutate({ image, description })
    }
    const updateSearch = data?.filter(e => e.UserName.includes(search))




    return (
        <section className='row'>
            <div className='col border-end p-3 mt-3 '>
                <div className='w-100'>
                    <img className='w-75 disappear p-2' src='https://th.bing.com/th/id/OIP.7HlAz4AP-6N_y5n1aHvONgHaCG?pid=ImgDet&rs=1' alt='pic' />
                </div>
                <div className='m-3 NAV'>
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} className="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                        </svg><Link className='text-decoration-none disappear text-dark fw-bold' to="/layout/Home" >Home</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} className="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg><p className='disappear' onClick={handleShow}>Search</p>

                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Search</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className='p-4 border-bottom' >

                                    <input
                                        type="text"
                                        className="search-hover"
                                        placeholder="search here..."
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className='d-flex justify-content-between pt-2'>
                                    <div>
                                        {isLoading && <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>}
                                        {updateSearch?.map((e, i) => {
                                            return <Link to={`/layout/${e.id}`} className='text-decoration-none'>
                                                <div className='d-flex'>
                                                    <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                                                        <img style={{ width: "100%", height: "100%", borderRadius: "50% ", objectFit: "cover", borderColor: "black" }} src={`http://localhost:4000/uploads/user/profile/${e?.Img}`} alt='story' />
                                                    </div>
                                                    <div className='pt-3'>
                                                        <span className='fw-bolder '>{e.UserName}</span>
                                                        <p className=''>{e.Email}</p>
                                                    </div>
                                                </div>
                                            </Link>

                                        })}
                                    </div>


                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} className="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-chat-left" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        </svg><p className='disappear' onClick={handleShowMessages}>Messages</p>
                        <Offcanvas show={showMessages} onHide={handleCloseMessages}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Messages</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className='d-flex justify-content-between pt-2'>
                                    <div>
                                        <p>Messages</p>
                                        <div>
                                            {data?.map((e, i) => {
                                                return <Link to={`/layout/Chat/${e.id}`} className='text-decoration-none'>
                                                    <div className='d-flex'>
                                                        <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                                                            <img style={{ width: "100%", height: "100%", borderRadius: "50% ", objectFit: "cover", borderColor: "black" }} src={`http://localhost:4000/uploads/user/profile/${e?.Img}`} alt='story' />
                                                        </div>
                                                        <div className='pt-3'>
                                                            <span className='fw-bolder '>{e.UserName}</span>
                                                            <p className=''>{e.Email}</p>
                                                        </div>
                                                    </div>
                                                </Link>

                                            })}

                                        </div>
                                    </div>
                                    <div className=''>
                                        <svg onClick={handleShowModel} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        <Modal show={showModel} onHide={handleCloseModel}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>New Messages</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div >
                                                    <div className='border-bottom w-100 pb-2'>
                                                        <input
                                                            type="text"
                                                            className="search-hover w-100"
                                                            placeholder="Chat With..."
                                                            onChange={(e) => setSearch(e.target.value)}
                                                        />                                                    </div>
                                                    <div className='pt-2 overflow-auto'>
                                                        {updateSearch?.map((e, i) => {
                                                            return <div>
                                                                <div className='d-flex align-items-center'>
                                                                    <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                                                                        <img style={{ width: "100%", height: "100%", borderRadius: "50% ", objectFit: "cover", borderColor: "black" }} src={`http://localhost:4000/uploads/user/profile/${e?.Img}`} alt='story' />
                                                                    </div>
                                                                    <div className=''>
                                                                        <span className='fw-bolder '>{e.UserName}</span>
                                                                        <p className=''></p>
                                                                        <Link to={`/Chat/${e.id}`} className='btn btn-link text-decoration-none fw-bolder w-100'>
                                                                            Chat
                                                                        </Link>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        })}
                                                    </div>

                                                </div>

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <button onClick={handleCloseModel} className='btn btn-warning w-100'>close</button>

                                            </Modal.Footer>
                                        </Modal>
                                    </div>

                                </div>

                            </Offcanvas.Body>
                        </Offcanvas>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} className="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                        </svg><p className='disappear' onClick={handleShowNotifications}>Notifications</p>
                        <Offcanvas show={showNotifications} onHide={handleCloseNotifications}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Notifications</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className='d-flex justify-content-between pt-2'>
                                    <div>
                                        <div className='d-flex'>
                                            <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                                                <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src='https://media.glamour.com/photos/56966ebf93ef4b095210f195/master/w_1600%2Cc_limit/beauty-2014-06-quiff-david-beckham-main.jpg' alt='story' />
                                            </div>
                                            <div className='pt-3'>
                                                <span className='fw-bolder '>user</span>
                                                <p className=''>reacted to your Post</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pt-3'>
                                        <p className='text-primary fw-bolder'>Follow</p>
                                    </div>

                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </motion.div>
                    <Add onSubmit={handelsubmit} />
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} className="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-camera-reels-fill" viewBox="0 0 16 16">
                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                        </svg><p className='disappear' to="/Profile">Reels</p>

                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} className="active">
                        <svg height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M24 21.8c-1.21 0-2.2.99-2.2 2.2s.99 2.2 2.2 2.2c1.22 0 2.2-.99 2.2-2.2s-.98-2.2-2.2-2.2zm0-17.8c-11.05 0-20 8.95-20 20 0 11.04 8.95 20 20 20s20-8.96 20-20c0-11.05-8.95-20-20-20zm4.38 24.38l-16.38 7.62 7.62-16.38 16.38-7.62-7.62 16.38z" /><path d="M0 0h48v48h-48z" fill="none" /></svg><p className='disappear' to="/Profile">Explore</p>

                    </motion.div>


                    <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} style={{ width: "35px", height: "35px", }} className="active">
                        <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/Profile/${userImg}`} alt='story' />
                        <Link className='text-decoration-none disappear text-dark fw-bold' to="/layout/Profile">Profile</Link>
                        </motion.div>
                </div>
                <div className='disappear'>

                <div className='d-flex gap-1 m-4 pt-2 border-top align-items-center '>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg><Link to="/signIn" onClick={logOut} className='text-dark fw-bold text-decoration-none'>Log Out</Link>
                </div>
                </div>



            </div>
        </section>
    )
}

export default Nav