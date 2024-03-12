import React, { useState } from "react";
import DeleteTodo from "./DeleteTodo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
// import UpdateTodo from "./UpdateTodo";
import UpdateCompleted from "./UpdateCompleted"
import { useNavigate } from "react-router-dom";
const Todoitem = ({ todo, fetchTodos }) => {
    const navigate=useNavigate();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    // const [id, setId] = useState("");
    const [confirm, setCompleted] = useState(false)
    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/todos/${id}`)
    
        
    }
    const handleDelete = (id) => {
        console.log(`Deleting todo with id: ${id}`);
        setDeleteConfirmation(false);
    };
    // const handleUpdate = (id) => {
    //     console.log(`Updating todo with id: ${id}`);
    //     setId("")
    // }
    // //sends to update the completed value of a task
    const changeInput = (id) => {
        console.log(`Updating completed todo with id: ${id}`)
        setCompleted(false)
        console.log(confirm)
    }
    return (
        <div className="usersitem">
            <div className="detailsGeneral">
                <div className="firstLet">{todo.title.charAt(0)}</div>
                {new Date(todo.createdAt).toLocaleDateString()}
            </div>
            <h2 className="details">
                {todo.title}
                {/* <br></br> */}
                {/* {todo._id} */}
                <br></br>
                tags: {todo.tags.map(t => t + "|")}
                <br></br>
            </h2>
            <div className="buttons">
                <button className="completedButton" onClick={() => setCompleted(true)}>{todo.completed ? <FontAwesomeIcon icon={faCheck} id="fa" /> : <FontAwesomeIcon icon={faXmark} id="fa" />} completed </button>
                <button className="buttonDel" onClick={() => setDeleteConfirmation(true)}> <FontAwesomeIcon icon={faTrash} id="fa" /></button>
                {/* <button className="buttonUpdate" onClick={() => setId(todo._id)}><FontAwesomeIcon icon={faPen} id="fa" /></button> */}
                <div className='buttonUpdate'> 
      
      <span className="pen-icon" >
      <button onClick={handleEdit} id={todo._id} className='buttonUpdate' > <FontAwesomeIcon icon={faPen} id="fa" />
      </button>
        </span>
      </div>
                {deleteConfirmation && (
                    <DeleteTodo id={todo._id} onDelete={handleDelete} fetchTodos={fetchTodos} />)}
                {/* {id && <UpdateTodo _id={id} fetchTodos={fetchTodos} onUpdate={handleUpdate} />} */}
                {confirm && <UpdateCompleted _id={todo._id} onCompleted={changeInput} fetchTodos={fetchTodos} />}
            </div>
        </div>
    );
};

export default Todoitem