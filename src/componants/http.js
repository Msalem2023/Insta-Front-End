import { QueryClient } from "@tanstack/react-query"
import axios from "axios"
export const client = new QueryClient()
const token = localStorage.getItem("token")
export async function handelPosts({ image, description }) {
    const formData = new FormData()
    for (let i = 0; i < image.length; i++) {
        formData.append(`image[]`, image[i])
    }
    formData.append("description", description)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': `${token}`
        }
    }
    console.log(description)
    const res = await axios.post('http://localhost:4000/post/uploadPosts', formData, config)


}
export async function Comment({ id, comment }) {
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `${token}`
        }
    }
    const res = await axios.post('http://localhost:4000/Comment/comment', { id, comment }, config)

}
export async function handelChat({ ChatId, Message, id }) {
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `${token}`
        }
    }
    const res = await axios.post('http://localhost:4000/Chat/Message', { ChatId, Message, id }, config)
    console.log(res)

}
export async function Follow({id}) {
    console.log(id)
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `${token}`
        }
    }
    const res = await axios.post('http://localhost:4000/Friends/follow', { id }, config)
}
export async function Love({id}) {
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `${token}`
        }
    }
        const res = await axios.put('http://localhost:4000/Like/like', { id }, config)
}
export async function Destroy({id}){
        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`
            }
        }
        const res = await axios.delete(`http://localhost:4000/Comment/${id}`, {}, config)

    
}
export async function Update({commentid, comment}){
    console.log(commentid,comment)
        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': `${token}`
            }
        }
        const res = await axios.put('http://localhost:4000/Comment/updatecomment', { commentid, comment }, config)

}