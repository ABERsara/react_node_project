
import React, { useState } from "react";
import DeleteUser from "./DeleteUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
// import UpdateUser from "./UpdateUser";
import { useNavigate } from "react-router-dom";
const UserItem = ({ user, fetchUsers }) => {
    const navigate = useNavigate();

    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/users/${id}`)
    
        
    }
        
    const handleDelete = (id) => {
        console.log(`Deleting user with id: ${id}`);
        setDeleteConfirmation(false);
    };
    // const handleUpdate = (id) => {
    //     console.log(`Updating user with id: ${id}`);
    //     setId("")
    // }
    return (
        <div className="usersitem">
            <div className="detailsGeneral">
                <div className="firstLet">{user.name.charAt(0)}</div>
                {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <h2 className="details">
                {user.name} {user.username}
                {/* <br></br>
                {user._id} */}
                <br></br>
                phone: {user.phone}
                <br></br> address:{user.address} <br></br> email:{user.email}
            </h2>
            <div className="buttons">
                <button className="buttonDel" onClick={() => setDeleteConfirmation(true)}> <FontAwesomeIcon icon={faTrash} id="fa" /></button>
                {/* <button className="buttonUpdate" onClick={() => setId(user._id)}><FontAwesomeIcon icon={faPen} id="fa" /></button> */}
                <div className='buttonUpdate'> 
      
        <span className="pen-icon" >
        <button onClick={handleEdit} id={user._id} className='buttonUpdate' > <FontAwesomeIcon icon={faPen} id="fa" />
        </button>
          </span>
       
        </div>

                {deleteConfirmation && (
                    <DeleteUser id={user._id} onDelete={handleDelete} fetchUsers={fetchUsers} />
                )}
                {/* {id && <UpdateUser  />} */}

            </div>
        </div>
    );
};

export default UserItem;
