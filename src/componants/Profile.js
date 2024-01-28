import React, {useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-multi-carousel/lib/styles.css';
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import "./Nav.css"
import { Link } from 'react-router-dom';
function Profile() {
    const [Preview, setPreview] = useState([])
    const [show, setShow] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showPosts, setShowPosts] = useState(true)
    const [showProfileImg, setProfileImg] = useState(false)
    const handleCloseProfileImg = () => setProfileImg(false);
    const [image, setImage] = useState()
    const handleCloseFollowing = () => setShowFollowing(false);
    const handleShowFollowing = () => setShowFollowing(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = localStorage.getItem("token")
    const { data} = useQuery(["Profile"], () => {
        return axios.post('http://localhost:4000/user/Profile', {}, {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`
            }

        }).then((res) => res.data.userDetails[0])

    })
    const Profile = data
    console.log(Profile?.UserName)
    window.localStorage.setItem("UserName", Profile?.UserName)
    window.localStorage.setItem("Img", Profile?.Img)
    const handelProfileImage = async () => {
        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("image", image)
            formData.append("imageName", image.name)
            console.log(formData.getAll("image"))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'authorization': `${token}`
                }
            }
            const res = await axios.post('http://localhost:4000/user/upload', formData, config)
        } catch (error) {
            console.log(error)

        }
        window.location.href = "/Profile"

    }
    const posts = Profile?.Posts?.map((e, i) => {
        return e
    })
    const Followers = []
    for (let i = 0; i < Profile?.Followers?.length; i++) {
        Followers.push(Profile.Followers[i].Following)
    }
    const Following = []
    for (let i = 0; i < Profile?.Following?.length; i++) {
        Following.push(Profile.Following[i].Followers)
    }
    const handelimages = (e) => {
        const img = e.target.files[0]
        setImage(img)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img)
        fileReader.onload = (e) => {
            setPreview(fileReader.result)

        }
    }

    return (
        <div className='pt-5 fullwidth'>
            <div className='row contain info'>
                <div className='col img'>
                    <div className='image' onClick={() => setProfileImg(true)}>
                        <img className='photo' src={`http://localhost:4000/uploads/user/profile/${Profile?.Img}`} alt='story' />
                    </div>
                    <Modal show={showProfileImg} onHide={handleCloseProfileImg}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Change Profile Photo
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group encType="multipart/form-data" controlId="formFileDisabled" className="mb-3">
                                <Form.Control type="file" onChange={(e) => handelimages(e)} />
                                {Preview.length && <div>
                                    <img src={Preview} style={{ width: "100%", objectFit: "cover", borderRadius: "25px", marginTop: "5px" }} alt="..." />
                                </div>}
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handelProfileImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="silver" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z" />
                                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                </svg> Upload

                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col'>
                    <div className='d-flex gap-4'>
                        <div className='d-flex gap-2 pt-3 newdiv '>
                            <h5 className='fw-bold newdiv'>{Profile?.UserName}</h5>
                        </div>
                        <button className='btn btn-light'>Edit Profile</button>
                        <button className='btn btn-light'>View Archive</button>
                        <button onClick={handleShow} className='btn btn-link disappear'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide" viewBox="0 0 16 16">
                            <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
                        </svg>
                        </button>
                    </div>
                    <div className='d-flex gap-5 pt-3 newdiv'>
                        <div className='d-flex gap-2'>
                            <p className='fw-bold'>{Profile?.Posts?.length}</p>
                            <p>Posts</p>
                        </div>
                        <div onClick={() => setShow(true)} className='d-flex gap-2'>
                            <p className='fw-bold'>{Profile?.Followers?.length}</p>
                            <p>Followers</p>
                        </div>
                        <div onClick={() => setShowFollowing(true)} className='d-flex gap-2'>
                            <p className='fw-bold'>{Profile?.Following?.length}</p>
                            <p>following</p>
                        </div>
                    </div>
                    <div>
                        <h5>{Profile?.Email}</h5>
                    </div>
                    <div className='pt-3'>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Followers
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ height: "200px" }}>
                                {Followers?.map((e, i) => {
                                    return <div className='overflow-auto'>
                                        <div className='d-flex justify-content-around'>
                                            <div className='d-flex gap-2'>
                                                <div style={{ width: "50px", height: "50px" }}>
                                                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${e?.Img}`} alt='story' />
                                                </div>
                                                <div>
                                                    <span className=''>{e?.UserName}</span>
                                                    <p className=''>Muhammed salem</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-light'>following</button>
                                            </div>
                                        </div>
                                    </div>


                                })
                                }


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    see all Followers

                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showFollowing} onHide={handleCloseFollowing}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Following
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ height: "300px", overflow: "auto" }}>
                                {Following?.map((e, i) => {
                                    return <div className='overflow-auto'>
                                        <div className='d-flex justify-content-around'>
                                            <div className='d-flex gap-2'>
                                                <div style={{ width: "50px", height: "50px" }}>
                                                    <img style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} src={`http://localhost:4000/uploads/user/profile/${e?.Img}`} alt='story' />
                                                </div>
                                                <div>
                                                    <span className=''>{e?.UserName}</span>
                                                    <p className=''>Muhammed salem</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-light'>following</button>
                                            </div>
                                        </div>
                                    </div>


                                })
                                }


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseFollowing}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    see all Followers

                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </div>

            </div>
            <div className='row'>
                <div className='d-flex justify-content-center gap-2'>
                    <button onClick={() => setShowPosts(true)} className='btn btn-outline-primary '> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg> POSTS</button>
                    <button onClick={() => setShowPosts(false)} className='btn btn-outline-success'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                    </svg>SAVED</button>
                </div>

                {showPosts && <div className='col-12 pt-3'>
                    <div className='d-flex flex-wrap gap-2 justify-content-center h-100'>

                        {posts?.map((e, i) => {
                            console.log(posts)
                            return <Link to={`/layout/GoToPost/${e.id}`} className='w-25 h-100'>

                                <img
                                    className=" w-100 h-100 rounded"
                                    src={`http://localhost:4000/uploads/user/posts/${e.Img[0]}`}
                                    alt=" slide"
                                />
                            </Link>
                        })}
                    </div>
                </div>}
                {!showPosts && <div className='col-12 pt-3'>
                    <div className='d-flex flex-wrap gap-2 justify-content-center'>
                        <div className='w-25'>

                            <img
                                className=" w-100 rounded"
                                src="https://www.sundaypost.com/wp-content/uploads/sites/13/2016/07/iStock_63837291_SMALL-848x540.jpg"
                                alt=" slide"
                            />
                        </div>
                        <div className='w-25'>

                            <img
                                className=" w-100 rounded"
                                src="https://www.sundaypost.com/wp-content/uploads/sites/13/2016/07/iStock_63837291_SMALL-848x540.jpg"
                                alt=" slide"
                            />
                        </div>
                        <div className='w-25'>

                            <img
                                className=" w-100 rounded"
                                src="https://www.sundaypost.com/wp-content/uploads/sites/13/2016/07/iStock_63837291_SMALL-848x540.jpg"
                                alt=" slide"
                            />
                        </div>
                        <div className='w-25'>

                            <img
                                className=" w-100 rounded"
                                src="https://www.sundaypost.com/wp-content/uploads/sites/13/2016/07/iStock_63837291_SMALL-848x540.jpg"
                                alt=" slide"
                            />
                        </div>
                        <div className='w-25'>

                            <img
                                className=" w-100 rounded"
                                src="https://www.sundaypost.com/wp-content/uploads/sites/13/2016/07/iStock_63837291_SMALL-848x540.jpg"
                                alt=" slide"
                            />
                        </div>

                    </div>



                </div>}
            </div>

        </div >)
}

export default Profile