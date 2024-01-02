import axios from "axios";
import TodoItem from "./Todoitem";
import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
const GetTodoById = ({ id, fetchTodos, onGetId }) => {
    const Navigating = useNavigate()
    const [todo, setTodo] = useState({})
    const [confirmSend, setConfirmSend] = useState(false)
    useEffect(() => {
        const handleGetById = async (e) => { 

        try {
            const { data } = await axios.get(`http://localhost:7003/api/todos/${id}`);
            console.log(data);
            setTodo(data)
            setConfirmSend(true)
            fetchTodos()

        } catch (error) {
            console.error("Error setting up the request:", error.message);
          
        }
    };
        handleGetById();
        }, [id]);
    const onReturn = () => {
        console.log("return")
        setTodo({})
        onGetId()
        Navigating("/todos")
    }
    return <div className="search">
        <button className="button confirmSearch" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>
        {/* {(!confirmSend && <button className="button butSearch" onClick={handleGetById}><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>) || */}
            {(confirmSend && <TodoItem todo={todo} fetchTodos={fetchTodos} />)}
    </div>
}
export default GetTodoById