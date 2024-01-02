import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
const UpdateCompleted = ({ _id, onCompleted, fetchTodos }) => {
    const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate
   // ביצוע פעולות בעת שינוי בערך של הניווט
   useEffect(() => {
    navigate("/todos");
  }, [navigate]);

    useEffect(() => {
    const handleUpdate = async () => {
        if (!_id ) {
            return;
        }
        try {
            const { data } = await axios.put(`http://localhost:7003/api/todos/${_id}`);
            console.log(data);
            onCompleted(_id)
            fetchTodos()
        } catch (error) {
            // Handle errors
            console.error("Error updating todo:", error);
        }
    }
    handleUpdate();
    }, [_id]);
    return (<></>);
};
export default UpdateCompleted