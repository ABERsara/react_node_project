import axios from "axios";
import UserItem from "./UserItem";
import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
const GetUserById = ({ id, fetchUsers, onGetId }) => {
    const Navigating = useNavigate()
    const [user, setUser] = useState({})
    const [confirmSend, setConfirmSend] = useState(false)
    useEffect(() => {
        const handleGetById = async (e) => {
        // e.preventDefault();

        try {
            const { data } = await axios.get(`http://localhost:7003/api/users/${id}`);
            console.log(data);
            setUser(data)
            setConfirmSend(true)
            fetchUsers()

        } catch (error) {
            console.error("Error setting up the request:", error.message);
          
        }
    };
        handleGetById();
        
        }, [id]);
    const onReturn = () => {
        console.log("return")
        setUser({})
        onGetId()
        Navigating("/users")
    }
    return <div className="search">
        <button className="button confirmSearch" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>
        {/* {(!confirmSend && <button className="button butSearch" onClick={handleGetById}><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>) || */}
            {(confirmSend && <UserItem user={user} fetchUsers={fetchUsers} />)}
    </div>
}
export default GetUserById