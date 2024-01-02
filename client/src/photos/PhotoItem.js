import React, { useState } from "react";
import DeletePhoto from "./DeletePhoto";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import UpdatePhoto from "./UpdatePhoto";
const Photoitem = ({ photo, fetchPhotos }) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [id, setId] = useState("");
    const handleDelete = (id) => {
        console.log(`Deleting photo with id: ${id}`);
        setDeleteConfirmation(false);
    };
    const handleUpdate = (id) => {
        console.log(`Updating photo with id: ${id}`);
        setId("")
    }

    return (
        <div className="usersitem">
            <div className="detailsGeneral">
                <div className="firstLet">{photo.title.charAt(0)}</div>
                {new Date(photo.createdAt).toLocaleDateString()}
            </div>
            <img src={`http://localhost:7003/${photo.imageUrl}.jpg`} alt=""></img>
            <h2 className="details">
                <br></br>
                {photo._id}
                <br></br>
                {photo.title}
                <br></br>
                {photo.category}
            </h2>
            <div className="buttons">
                <button className="button buttonDel" onClick={() => setDeleteConfirmation(true)}> <FontAwesomeIcon icon={faTrash} id="fa" /></button>
                <button className="button buttonUpdate" onClick={() => setId(photo._id)}><FontAwesomeIcon icon={faPen} id="fa" /></button>
                {deleteConfirmation && (
                    <DeletePhoto id={photo._id} onDelete={handleDelete} fetchPhotos={fetchPhotos} />
                )}
                {id && <UpdatePhoto _id={id} fetchPhotos={fetchPhotos} onUpdate={handleUpdate} />}

            </div>
        </div>
    );
};

export default Photoitem