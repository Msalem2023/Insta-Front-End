import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { client, handelChat } from './http.js';
import "./Nav.css"

function MessageRoom() {
    const [Message, setMessage] = useState()
    const token = localStorage.getItem("token")
    const id = useParams().id

    const { data, isError, isLoading } = useQuery(["Message"], () => {
        return axios.post(`http://localhost:4000/Chat/Chat`, { id }, {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`

            }
        }).then((res) => res.data.Chat)
    })
    const { mutate } = useMutation({
        mutationFn: handelChat,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["Message"] })
            setMessage('')
        }
    })
    const handelMessage = async (ChatId, id, Message) => {
        mutate({ ChatId, id, Message })
    }
    return (
        <div className='container fullwidth'>

            <div className='row '>
                <div className='col-9 fullwidth'>

                    <div style={{ height: "15%" }} className=' d-flex '>
                        <div style={{ width: "50px", height: "50px", margin: "20px" }}>
                            <img style={{ width: "100%", height: "100%", borderRadius: "50% ", objectFit: "cover", borderColor: "black" }} src={`http://localhost:4000/uploads/user/profile/${JSON.stringify(data?.Receiver?._id) === JSON.stringify(id) ? data?.Receiver?.Img : data?.Sender?.Img}`} alt='story' />
                        </div>
                        <div className='pt-4'>
                            <p className='fw-bold fs-5'>{JSON.stringify(data?.Receiver?._id) === JSON.stringify(id) ? data?.Receiver?.UserName : data?.Sender?.UserName}</p>
                        </div>

                    </div>
                    <div style={{ height: "400px", borderRadius: "25px" }} className='  p-2 overflow-auto' >
                        <div style={{ width: "150px", height: "150px", margin: "0 auto" }} className='pt-2'>
                            <img className='chat' style={{ width: "100%", height: "100%", borderRadius: "50% ", objectFit: "cover", borderColor: "black" }} src={`http://localhost:4000/uploads/user/profile/${JSON.stringify(data?.Receiver?._id) === JSON.stringify(id) ? data?.Receiver?.Img : data?.Sender?.Img}`} alt='story' />
                            <Link to={`/layout/${id}`} className='btn btn-light w-100 mt-2 chat'>view Profile</Link>
                        </div>
                        {data?.Messages?.map(element => {
                            if (JSON.stringify(element.Sender) === JSON.stringify(id)) {
                                return <div class="d-flex justify-content-start"><button className='btn btn-light m-2'>{element.Message}</button></div>
                            } else {
                                return <div class="d-flex justify-content-end"><button className='btn btn-primary m-2'>{element.Message}</button></div>

                            }

                        })}

                    </div>

                    <div className='d-flex align-items-center message'>

                        <div className=" wrapper">
                            <input value={Message} onChange={(e) => setMessage(e.target.value)} type="text" class="inputText" required />
                            <span class="label">Message...</span>
                        </div>
                        <div >
                            <button onClick={() => handelMessage(data._id, id, Message)} className='btn btn-outline-primary d-flex gap-2 align-items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                </svg> Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageRoom