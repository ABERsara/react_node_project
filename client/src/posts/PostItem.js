import React, { useState } from "react";
import DeletePost from "./DeletePost";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPen} from '@fortawesome/free-solid-svg-icons';
// import UpdatePost from "./UpdatePost";
import { useNavigate } from "react-router-dom";

const Postitem = ({ post, fetchPosts }) => {
    const navigate=useNavigate();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    // const [id, setId] = useState("");
    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/posts/${id}`)
    
        
    }
    const handleDelete = (id) => {
        console.log(`Deleting post with id: ${id}`);
        setDeleteConfirmation(false);
    };
    // const handleUpdate = (id) => {
    //     console.log(`Updating post with id: ${id}`);
    //     setId("")
    // }
   
    return (
        <div className="usersitem">
            <div className="detailsGeneral">
                <div className="firstLet">{post.title.charAt(0)}</div>
                {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <h2 className="details">
                {post.title}
                {/* <br></br>
                {post._id} */}
                <br></br>
                body: {post.body}
                <br></br>
            </h2>
            <div className="buttons">
                <button className="buttonDel" onClick={() => setDeleteConfirmation(true)}> <FontAwesomeIcon icon={faTrash} id="fa" /></button>
                {/* <button className="buttonUpdate" onClick={() => setId(post._id)}><FontAwesomeIcon icon={faPen} id="fa" /></button> */}
                <div className='buttonUpdate'> 
      
      <span className="pen-icon" >
      <button onClick={handleEdit} id={post._id} className='buttonUpdate' > <FontAwesomeIcon icon={faPen} id="fa" />
      </button>
        </span>
      </div>
                {deleteConfirmation && (
                    <DeletePost id={post._id} onDelete={handleDelete} fetchPosts={fetchPosts} />
                )}
                {/* {id && <UpdatePost _id={id} fetchPosts={fetchPosts} onUpdate={handleUpdate} />} */}

            </div>
        </div>
    );
};

export default Postitem