import axios from "axios";
import PhotoItem from "./PhotoItem";
import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
const GetPhotoById = ({ id, fetchPhotos, onGetId }) => {
    const Navigating = useNavigate()
    const [photo, setPhoto] = useState({})
    const [confirmSend, setConfirmSend] = useState(false)
    useEffect(() => {
        const handleGetById = async (e) => {
        try {
            const { data } = await axios.get(`http://localhost:7003/api/photos/${id}`);
            console.log(data);
            setPhoto(data)
            setConfirmSend(true)
            fetchPhotos()
        } catch (error) {
            console.error("Error setting up the request:", error.message);
        }
    };
        handleGetById();
        
        }, [id]);
    const onReturn = () => {
        console.log("return")
        setPhoto({})
        onGetId()
        Navigating("/photos")
    }
    return <div className="search">
        <button className="button confirmSearch" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>
        {/* {(!confirmSend && <button className="button butSearch" onClick={handleGetById}><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>) || */}
            {(confirmSend && <PhotoItem photo={photo} fetchPhotos={fetchPhotos} />)}
    </div>
}
export default GetPhotoById