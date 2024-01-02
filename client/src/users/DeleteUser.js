import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserXmark} from '@fortawesome/free-solid-svg-icons'
const DeleteUser = ({ id, onDelete,fetchUsers }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.delete(`http://localhost:7003/api/users`,{data:{id}});
            console.log(data);
            onDelete(id);
            fetchUsers()
        } catch (error) {
            // Handle errors
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response from server:", error.response.data);
                console.error("Status code:", error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request:", error.message);
            }
        }
        onDelete(id);
    };
   
    return (
        <button className="delConfirm"onClick={handleDelete}><FontAwesomeIcon icon={faUserXmark} id="fa"/></button>
    );
};

export default DeleteUser;
