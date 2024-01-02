import axios from "axios";
import PostItem from "./PostItem";
import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
const GetPostById = ({ id, fetchPosts, onGetId }) => {
    const Navigating = useNavigate()
    const [post, setPost] = useState({})
    const [confirmSend, setConfirmSend] = useState(false)
    useEffect(() => {
        const handleGetById = async (e) => {
        try {
            const { data } = await axios.get(`http://localhost:7003/api/posts/${id}`);
            console.log(data);
            setPost(data)
            setConfirmSend(true)
            fetchPosts()
        } catch (error) {
            console.error("Error setting up the request:", error.message);
        }
    };
        handleGetById();
        
        }, [id]);
    const onReturn = () => {
        console.log("return")
        setPost({})
        onGetId()
        Navigating("/posts")
    }
    return <div className="search">
        <button className="button confirmSearch" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>
        {/* {(!confirmSend && <button className="button butSearch" onClick={handleGetById}><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>) || */}
            {(confirmSend && <PostItem post={post} fetchPosts={fetchPosts} />)}
    </div>
}
export default GetPostById