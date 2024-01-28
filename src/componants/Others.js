import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Follow, client } from "./http.js";
import "./Nav.css"


function Other() {
    const [showPosts, setShowPosts] = useState(true)
    const token = localStorage.getItem("token")
    console.log(token)
    const id = useParams().id

    const { data } = useQuery(["Other"], () => {
        return axios.post(`http://localhost:4000/user/${id}`, {}, {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`
            }
        }).then((res) => res.data)
    })
    console.log(data)
    const{mutate}= useMutation({
        mutationFn:Follow,
        onSuccess:()=>{
            client.invalidateQueries({queryKey:["Other"]})
        }
    }) 
    const HandelFollow = async (id) => {
        mutate({id})
    }
    const Followers=[]
    for (let i = 0; i < data?.user?.Followers?.length; i++) {
        Followers.push( data.user.Followers[i].Following)
    }
    const Following=[]
    for (let i = 0; i < data?.user?.Following?.length; i++) {
        Following.push( data.user.Following[i].Followers)
    }
    
    return (
        <div className=' pt-5 fullwidth '>
            <div className='row info'>
                <div className='col img'>
                    <div className="image">
                        <img className="photo"  src={`http://localhost:4000/uploads/user/profile/${data?.user.Img}`} alt='story' />
                    </div>
                </div>
                <div className='col '>
                    <div className='d-flex gap-4'>
                        <div className='d-flex gap-2 pt-3'>

                            <h5 className='fw-bold newdiv'>{data?.user.UserName}</h5>
                        </div>
                        <button onClick={()=>HandelFollow(id)} className='btn btn-primary'>{Followers?.find(e=>JSON.stringify(e?.id)===JSON.stringify(data.loggedInUser)) ? "Following" : "follow"}</button>
                        <Link to={`/layout/Chat/${id}`}  className='btn btn-light'>Message</Link>
                        <button className='btn btn-link disappear'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide" viewBox="0 0 16 16">
                            <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
                        </svg>
                        </button>
                    </div>
                    <div className='d-flex gap-5 pt-3'>
                        <div className='d-flex gap-2'>
                            <p className='fw-bold'>{data?.user?.Posts.length}</p>
                            <p>Posts</p>
                        </div>
                        <div className='d-flex gap-2'>
                            <p className='fw-bold'>{data?.user?.Followers.length}</p>
                            <p>Followers</p>
                        </div>
                        <div className='d-flex gap-2'>
                            <p className='fw-bold'>{data?.user?.Following.length}</p>
                            <p>following</p>
                        </div>
                    </div>
                    <div>
                        <h5>{data?.Email}</h5>
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
                    <div className='d-flex flex-wrap gap-2 justify-content-center h-50'>

                        {data?.user?.Posts.map((e, i) => {
                            return <Link to={`/layout/GoToPost/${e._id}`} className='w-25 h-100'>

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

export default Other