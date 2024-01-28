import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import { motion } from "framer-motion"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';




function Add(props) {
    const userImg = localStorage.getItem("Img")
    const username = localStorage.getItem("UserName")
    console.log(props)
    const [showcreate, setShowCreate] = useState(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseCreate = () => setShowCreate(false);
    const [description, setDescription] = useState();
    const [image, setImage] = useState([])
    const [Preview, setPreview] = useState([])
    const [showNext, setShowNext] = useState(false);
    const [open, setOpen] = useState(false);
    const [hidePosts, setHidePosts] = useState(false);
    const [hideComment, setHideComment] = useState(false);
    const [loading, setLoading] = useState(false)




    const handelimages = (e) => {
        const img = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img)
        fileReader.onload = (e) => {
            setPreview([...Preview, fileReader.result])
        }
        if (image.length) {
            setImage([...image, img])
        } else {
            image.push(img)
        }
    }
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
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




    return (
        <motion.div whileHover={{ scale: 1.1, backgroundColor: "#fe98ea", borderRadius: "5px" }} transition={{ type: "spring" }} className="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-plus-square" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
            </svg><p className='disappear' onClick={() => setShowCreate(true)}>Create</p>
            <Modal show={showcreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {!showNext && <Form.Group encType="multipart/form-data" controlId="formFileDisabled" className="mb-3">
                        <Form.Control type="file" onChange={(e) => handelimages(e)} />
                    </Form.Group>}
                    {!showNext &&
                        <Carousel responsive={responsive} className=" ">
                            {Preview.map((e, i) => {
                                return <div class="">
                                    <img src={e} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "25px" }} alt="..." />
                                </div>

                            })}
                        </Carousel>
                    }
                    {showNext && <div className='w-100 p-1'>
                        <div className='d-flex '>
                            <div style={{ width: "50px", height: "50px" }}>
                                <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${userImg}`} alt='story' />
                            </div>
                            <div>
                                <p className='fw-5 p-2'>{username}</p>
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <textarea onChange={(e) => setDescription(e.target.value)} placeholder='Write a Caption...' class="form-control" id="exampleFormControlTextarea1" rows="3" name='specialRequest'></textarea>
                            </div>
                        </div>
                        <Button
                            className='w-100 btn btn-light mt-2'
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            Advanced Setting
                        </Button>
                        <Collapse in={open}>
                            <div className='pt-2'>
                                <div className='d-flex justify-content-between'>
                                    <p>Hide like on this post</p>

                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            onClick={() => setHidePosts(!hidePosts)}

                                        />
                                    </Form>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p>
                                        Turn off commenting
                                    </p>

                                    <Form>

                                        <Form.Check
                                            type="switch"
                                            onClick={() => setHideComment(!hideComment)}
                                        />
                                    </Form>
                                </div>
                            </div>
                        </Collapse>
                    </div>}


                </Modal.Body>
                <Modal.Footer>
                    {showNext && <Button variant="primary w-100" onClick={() => props.onSubmit(image, description)} disabled={loading === true}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="silver" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg> Upload
                    </Button>}
                    {!showNext && <Button variant="primary w-100" onClick={() => setShowNext(true)} disabled={image.length === 0}>
                        Next
                    </Button>}
                </Modal.Footer>
            </Modal>
        </motion.div>)
}

export default Add