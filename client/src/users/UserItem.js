
import React, { useState } from "react";
import DeleteUser from "./DeleteUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UpdateUser from "./UpdateUser";
const UserItem = ({ user, fetchUsers }) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [id, setId] = useState("");
    const handleDelete = (id) => {
        console.log(`Deleting user with id: ${id}`);
        setDeleteConfirmation(false);
    };
    const handleUpdate = (id) => {
        console.log(`Updating user with id: ${id}`);
        setId("")
    }
    return (
        <div className="usersitem">
            <div className="detailsGeneral">
                <div className="firstLet">{user.name.charAt(0)}</div>
                {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <h2 className="details">
                {user.name} {user.username}
                <br></br>
                {user._id}
                <br></br>
                phone: {user.phone}
                <br></br> address:{user.address} <br></br> email:{user.email}
            </h2>
            <div className="buttons">
                <button className="buttonDel" onClick={() => setDeleteConfirmation(true)}> <FontAwesomeIcon icon={faTrash} id="fa" /></button>
                <button className="buttonUpdate" onClick={() => setId(user._id)}><FontAwesomeIcon icon={faPen} id="fa" /></button>
                {deleteConfirmation && (
                    <DeleteUser id={user._id} onDelete={handleDelete} fetchUsers={fetchUsers} />
                )}
                {id && <UpdateUser _id={id} fetchUsers={fetchUsers} onUpdate={handleUpdate} />}

            </div>
        </div>
    );
};

export default UserItem;
